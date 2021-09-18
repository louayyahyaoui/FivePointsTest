import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Message,
  Modal,
  Segment,
} from "semantic-ui-react";
import { Card } from "semantic-ui-react";

import axios from "axios";
import ModalAddTopic from "./ModalAddTopic";

function ListSujets({ history }) {
  const [arraySujets, SetArraySujets] = useState([]);
  const [modalDetail, SetModalDetail] = useState(false);
  const [titre1, SetTitre] = useState("");
  const [description1, SetDescription] = useState("");
  const [cretedBy1, SetCretedBy] = useState("");

 


  useEffect(() => {
    axios
      .get("http://localhost:5000/sujet")
      .then((res) => {
       
        SetArraySujets(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [arraySujets]);

  const logout = (e)=> {
    localStorage.removeItem("user");
    history.push("/");

  }

  const RoundNumber = (number)=> {
    number = String(Math.round(Number(number)));
    return Math.round(number);
  }

  const addOui = (e,sujetId,id1)=> {
   

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
   
    axios
    .get("http://localhost:5000/vote/checkVote/"+userId)
    .then((res) => {
     console.log(res.data);
     if(res.data + 1 < 5)
     {
      axios
      .post("http://localhost:5000/vote",
      {
        votedBy : userId,
        sujet : sujetId,
        choix : 1
      })
      .then((res) => {
       
       console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

     }
     else {
       alert('You cant vote you achieved your 5 tentives')
     }
    })
    .catch((err) => {
      console.log(err.response.data);
    });

    
  }
  const addNon = (e,sujetId,id1)=> {
    
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
   
    axios
    .get("http://localhost:5000/vote/checkVote/"+userId)
    .then((res) => {
     console.log(res.data);
     if(res.data + 1 < 5)
     {
      axios
      .post("http://localhost:5000/vote",
      {
        votedBy : userId,
        sujet : sujetId,
        choix : 0
      })
      .then((res) => {
       
       console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

     }
     else {
       alert('You cant vote you achieved your 5 tentives')
     }
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  }

  return (
    <>
    <Container>
  
    <Button color="red" floated='right' onClick={logout}>
            <Icon name='log out' /> Logout
          </Button>
      <ModalAddTopic />
      <Header as="h2" icon textAlign="left">
        <Header.Content>List of topics </Header.Content>
      </Header>

      <Divider hidden />

      {arraySujets.length === 0 ? (
        <>
          <br />
          <Image
            centered
            size="medium"
            src={process.env.PUBLIC_URL + "/logo512.png"}
          />
          <Header as="h4" textAlign="center">
            <Header.Content>No Topics found </Header.Content>
          </Header>
        </>
      ) : (
       
          arraySujets.map((topic, index) => (
            <Item.Group divided>
            
        
            <Item>
              <Item.Image src={process.env.PUBLIC_URL + "/topic.jpg"} />
        
              <Item.Content>
                <Item.Header as='a'>{topic.titre}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>Created By {topic.createdBy.fullName}</span>
                </Item.Meta>
                <Item.Description>{topic.description}</Item.Description>
                <Item.Extra>
                <Button as='div' labelPosition='right'>
      <Button color='red' onClick={() => addOui(topic._id,topic._id)}>
        <Icon name='thumbs up' />
        Like 
      </Button>
      <Label as='a' basic color='red' pointing='left'>
        {
        topic.choixOui + topic.choixNon == 0 ? 0 : (
         ( RoundNumber((topic.choixOui / (topic.choixOui + topic.choixNon)) * 100) )
        )
        } %
      
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={() => addNon(topic._id,topic._id)}>
      <Button basic color='blue'>
        <Icon name='thumbs down' />
        Dislike
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
      {
        topic.choixOui + topic.choixNon == 0 ? 0 : (
         ( RoundNumber((topic.choixNon / (topic.choixOui + topic.choixNon)) * 100) )
        )
        } %
      </Label>
    </Button>
                  
                </Item.Extra>
              </Item.Content>
            </Item>
        
          
          </Item.Group>
          ))
     
      )}
    </Container>



</>
  );
}

export default ListSujets;

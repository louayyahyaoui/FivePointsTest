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
  Message,
  Segment,
} from "semantic-ui-react";
import { Card } from "semantic-ui-react";

import axios from "axios";
import ModalAddTopic from "./ModalAddTopic";

function ListSujets({ history }) {
  const [arraySujets, SetArraySujets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/sujet")
      .then((res) => {
        console.log(res.data);
        SetArraySujets(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [arraySujets]);

  return (
    <Container>
      <ModalAddTopic />
      <Header as="h2" icon textAlign="center">
        <Icon name="zip" circular />
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
        <Grid container columns={3}>
          {arraySujets.map((topic, index) => (
            <Grid.Column>
              <Card key={index}>
               
                <Card.Content header={topic.titre} />
                <Grid.Row>
                  <Card.Meta>
                    <span className="date">Oui : 50%</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span className="date">Non : 20%</span>
                  </Card.Meta>
                </Grid.Row>
                <Card.Content description={topic.description} />
                <Card.Content extra>
                  <Icon name="user" />
                  added By {topic.createdBy.fullName}
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ListSujets;

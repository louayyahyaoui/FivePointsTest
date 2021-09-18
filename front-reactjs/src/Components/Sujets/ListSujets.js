import React, { useEffect, useState } from "react";
import {
  Button,
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

function ListSujets({ history }) {
  const [arraySujets, SetArraySujets] = useState([]);


 useEffect(() => {
    axios
    .get("http://localhost:5000/sujets"
    )
    .then((res) => {
      console.log(res.data);
      SetArraySujets(res.data)
    })
    .catch((err) => {
      console.log(err.response.data);
    });
 }, [])


  return (
    <>
      <Header as="h2" icon textAlign="center">
        <Icon name="zip" circular />
        <Header.Content>List of topics </Header.Content>
      </Header>

      <Divider hidden />

      <Grid container columns={3}>
        <Grid.Column>
          <Card>
            <Card.Content header="About Amy" />
            <Card.Content
              description="'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.'"
            />
            <Card.Content extra>
              <Icon name="user" />4 Friends
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card>
            <Card.Content header="About Amy" />
            <Card.Content
              description="'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.'"
            />
            <Card.Content extra>
              <Icon name="user" />4 Friends
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card>
            <Card.Content header="About Amy" />
            <Card.Content
              description="'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.'"
            />
            <Card.Content extra>
              <Icon name="user" />4 Friends
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default ListSujets;

import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import axios from "axios";

function LoginForm({ history }) {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const handleEmailChanges = (e) => {
    SetEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChanges = (e) => {
    SetPassword(e.target.value);
    console.log(password);
  };

  const handleClickLogin = () => {
    if(!email || !password) {
      alert('Please enter your email | password')
    }
    else {
      axios
      .post("http://localhost:5000/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          alert("check your password and try again !");
        }
        if (res.data.success === true) {
          localStorage.setItem("user", JSON.stringify(res.data.result));
          history.push("/Sujets");
        }
       
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data)
      });
    }
    
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={process.env.PUBLIC_URL + "/logo512.png"} /> Log-in to your
          account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={handleEmailChanges}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChanges}
            />

            <Button color="teal" fluid size="large" onClick={handleClickLogin}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/register">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;

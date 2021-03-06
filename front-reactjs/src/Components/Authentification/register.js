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

function RegisterForm({ history }) {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [fullName, SetFullName] = useState("");


  const handleEmailChanges = (e) => {
    SetEmail(e.target.value);
    console.log(email);
  };

  const handleFullNameChanges = (e) => {
    SetFullName(e.target.value);
    console.log(fullName);
  };

  const handlePasswordChanges = (e) => {
    SetPassword(e.target.value);
    console.log(password);
  };

  const handleClickRegister = () => {
    if(!email || !password  || !fullName)
    {
      alert('Please enter your email | password | fullName')
    }
    else {
      axios
      .post("http://localhost:5000/user/register", {
        email: email,
        password: password,
        fullName: fullName,
      })
      .then((res) => {
        console.log(res.data);
       
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    }
    
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={process.env.PUBLIC_URL + "/logo512.png"} /> Register your account
        </Header>
        <Form size="large">
          <Segment stacked>
          <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Full name"
              value={fullName}
              onChange={handleFullNameChanges}
            />
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

            <Button color="teal" fluid size="large" onClick={handleClickRegister}>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href="/">Sign In</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default RegisterForm;

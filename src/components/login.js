import React, { Component } from "react";
import axios from "axios";

import Container from "./StyledComponents/ContainerStyled";
import { Form, Label, Input } from "./StyledComponents/FormStyles";
import HeaderOne from "./StyledComponents/H1Styled";

class Login extends Component {
  // greating login form
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      username: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // setting password state with new value
  passwordhandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  // username state and value
  usernamehandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  // sending data to login api
  handleSubmit = (event) => {
    this.setState({
      password: "",
      username: "",
    });
    event.preventDefault();

    axios
      .post(
        "https://ptct-african-marketplace-5.herokuapp.com/api/auth/login",
        this.state
      )
      .then((res) => {
        console.log("happy path!", res.data);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/listings";
      })
      .catch((err) => {
        console.log("sad path:(", err);
      });
  };

  // displaying the login form
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit} className="container">
          <HeaderOne>Login</HeaderOne>
          <Label>Username :</Label>
          <Input
            type="text"
            value={this.state.username}
            onChange={this.usernamehandler}
            placeholder="Username..."
          />
          <br />
          <Label>Password :</Label>
          <Input
            type="password"
            value={this.state.password}
            onChange={this.passwordhandler}
            placeholder="Password..."
          />
          <br />
          <Input type="submit" value="Submit" />
        </Form>
      </Container>
    );
  }
}

export default Login;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const AdminSignIn = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {});
  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    const loginRequest = {
      username: state.username,
      password: state.password,
    };
    await axios
      .post(
        "https://match-making-jobhunter-api.herokuapp.com/api/auth/signin",
        loginRequest
      )
      .then((res) => {
        if (res.data.roles.toString() === "ROLE_ADMIN") {
          alert("Hello Admin");
          localStorage.setItem("jwtToken", res.data.accessToken);
          console.log(res.data);
          history.push("/admin/dashboard");
        } else {
          alert("Invalid User");
        }
      })
      .catch((err) => console.log(err.response.data));
  };
  return (
    <div
      style={{
        textAlign: "center",
        background: "#EBF5FB",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form onSubmit={submit}>
        <h1>Admin</h1>
        <Form.Control
          required
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <br />
        <Form.Control
          required
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <Button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default AdminSignIn;

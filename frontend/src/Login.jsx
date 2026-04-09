import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "./config";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      // Connect to the Node backend
      const response = await axios.post(`${API_URL}/auth/login`, body);

      // Save token to local storage so the user stays logged in
      const parseRes = response.data;

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true); // Update app state
        console.log("Logged in successfully");
      } else {
        setAuth(false);
        console.log("Login failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;

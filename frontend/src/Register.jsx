import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await axios.post("http://localhost:5000/auth/register", body);

      const parseRes = response.data;

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        navigate("/dashboard");
        console.log("Registered successfully");
      } else {
        setAuth(false);
        console.log("Registration failed");
      }
    } catch (err) {
      console.error(err.message);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
          required
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;

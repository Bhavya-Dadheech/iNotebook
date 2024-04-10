import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ showAlert }) {
  const host = "http://localhost:5000/api/auth";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      showAlert("Login Successfull", "primary");
      navigate("/home");
    } else {
      return showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <>
      <h1>Login to iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email "
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            autoComplete="on"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="on"
            onChange={onChange}
            value={credentials.password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
}

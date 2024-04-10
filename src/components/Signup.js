import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ showAlert }) {
  const host = "http://localhost:5000/api/auth";
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirm_password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirm_password) {
      return showAlert("password and confirm password must match", "danger");
    }
    const response = await fetch(`${host}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (json.success) {
      navigate("/login");
    } else {
      return showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <>
      <h1>Signup to iNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name "
            name="name"
            value={credentials.name}
            autoComplete="on"
            onChange={onChange}
            required
            minLength={3}
          />
        </div>
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
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            name="confirm_password"
            autoComplete="on"
            onChange={onChange}
            value={credentials.confirm_password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </>
  );
}

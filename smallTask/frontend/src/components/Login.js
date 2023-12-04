import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth, AuthProvider } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import logo from "../Assets/logoPrelude.png";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  //   const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const userLogin = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      setDisplayName(userLogin.displayName);
      console.log("After", displayName);
      navigate("/");
    } catch (error) {
      console.error("Error creating account:", error.message);
      setError("Log In Failed");
    }

    setLoading(false);
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    color: "#fff",
    minHeight: "80vh",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="My Logo"
          style={{ width: "70%", height: "70%", marginBottom: "10px" }}
        />
      </div>
      <Card
        style={{
          minWidth: "300px",
          height: "auto",
          marginRight: "0px",
          padding: 20,
        }}
      >
        <Card.Body>
          <div
            style={{
              minHieght: "100vh",
              justifyContent: "center",
            }}
          >
            <h2 className="text-center mb-4">Log In</h2>

            {error && <Alert variant="danger">{error} </Alert>}
          </div>
          <Form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                label="Email"
                type="email"
                inputRef={emailRef}
                required
                fullWidth
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                label="Password"
                type="password"
                inputRef={passwordRef}
                required
                fullWidth
              />
            </div>
            <Button
              disabled={loading}
              className="w-100"
              style={{ maxWidth: "400px" }}
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/resetpwd">Forgot Password?</Link>
          </div>
        </Card.Body>

        <div className="w-80 text-center mt-2">
          Need an account? <Link to="/signup"> Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}

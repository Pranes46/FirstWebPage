import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth, AuthProvider } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    color: "#fff",
    minHeight: "60vh",
  };
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email to reset your password");
    } catch (error) {
      console.error("Error resetting password:", error.code, error.message);
      if (error.code === "auth/user-not-found") {
        setError("Email not found. Please enter a valid email address.");
      } else {
        setError("Failed to reset password");
      }
    }

    setLoading(false);
  }

  return (
    <div style={containerStyle}>
      <Card style={{ padding: 20 }}>
        <Card.Body>
          <div
            style={{
              minHieght: "100vh",
              justifyContent: "center",
              marginBottom: "2vh",
            }}
          >
            <h2 className="text-center mb-4">Trouble logging in?</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <div style={{ marginBottom: "10px" }}></div>

            <Button
              disabled={loading}
              className="w-100"
              style={{ maxWidth: "400px" }}
              type="submit"
            >
              Send login link
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>

        <div className="w-80 text-center mt-2">
          Need an account? <Link to="/signup"> Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}

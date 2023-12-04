import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth, AuthProvider } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import logo from "../Assets/logoPrelude.png";
import Login from "./Login";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [role, setRole] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordMessage, setPasswordMessage] = useState("");
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    color: "#fff",
    minHeight: "80vh",
  };

  const handleRoleChange = async (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
  };
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, role);
      console.log(role);
      navigate("/");
    } catch (error) {
      console.error("Error creating account:", error.message);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  //   const strongPasswordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;

  //   const checkPasswordStrength = (password) => {
  //     if (strongPasswordRegex.test(password)) {
  //       setPasswordMessage(""); // Clear message if the password is valid
  //     } else {
  //       setPasswordMessage(
  //         "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character."
  //       );
  //     }
  //   };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: 50,
        }}
      >
        <img
          src={logo}
          alt="My Logo"
          style={{ width: "50%", height: "50%", marginBottom: "10px" }}
        />

        <Card style={{ padding: 20 }}>
          <Card.Body>
            <div
              style={{
                minWidth: "30vh",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <h2 className="text-center mb-4" style={{ maxWidth: "100vh" }}>
                Sign Up
              </h2>

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
                  //   onChange={(e) => checkPasswordStrength(e.target.value)}
                  required
                  fullWidth
                />
                {/* <div style={{ color: "black" }}>{passwordMessage}</div> */}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  inputRef={passwordConfirmRef}
                  required
                  fullWidth
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Select a Role"
                    value={role}
                    defaultValue=""
                    required
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                </FormControl>
              </div>
              <Button
                disabled={loading}
                className="w-100"
                style={{ maxWidth: "400px" }}
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/Login">Log In</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

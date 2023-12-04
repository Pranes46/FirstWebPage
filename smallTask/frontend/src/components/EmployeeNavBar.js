import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

const Navigation = () => {
  const { currentUser } = useAuth();
  return <div>{currentUser ? <Header /> : ""}</div>;
};

const Header = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/Login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        background: "black",
        padding: 30,
        justifyContent: "center",
      }}
    >
      <Link to="/">
        <Button style={{ background: "#fff", color: "#000" }}>Home</Button>
      </Link>
      <Link to="/employee" style={{ background: "#fff", color: "#000" }}>
        <Button style={{ background: "#fff", color: "#000" }}>Employee</Button>
      </Link>
      <div className="ml-auto">
        <IconButton
          variant="link"
          onClick={handleLogout}
          aria-label="logout"
          style={{ background: "#fff", color: "#000" }}
        >
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Navigation;

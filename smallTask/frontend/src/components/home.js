import React from "react";
import logo from "../Assets/logoPrelude.png";
import { Card } from "@mui/material";

const Home = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#fff",
  };

  const headingStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const contentStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    margin: 45,
    padding: 30,
    background: "lightgrey",
    // maxWidth: 500,
  };

  return (
    <div style={containerStyle}>
      <img src={logo} alt="My Logo" width="20%" height="20%" />

      <h1 style={headingStyle}>Welcome to PreludeSys</h1>
      <Card style={contentStyle} elevation={3}>
        ABOUT PRELUDESYS: PreludeSys is a global technology solutions provider
        founded in 1998. We have been certified as a ‘Great Place to Work’ in
        2021, 2022, and 2023 and we are considered a highly trusted technology
        partner serving more than 300 Customers.
      </Card>

      {/* <p style={contentStyle}>
        You can use this space to describe your app's features and benefits.
      </p>
      <p style={contentStyle}>
        Tell your visitors what makes your app unique and why they should use
        it.
      </p>
      <p style={contentStyle}>
        You can add images, links, and other content to make it informative and
        engaging.
      </p> */}
    </div>
  );
};

export default Home;

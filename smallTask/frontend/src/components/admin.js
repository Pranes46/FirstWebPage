import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const StateCity = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState(""); // Initialize city and state as empty strings

  const handleStateChange = (e) => {
    setState(e.target.value); // Update state when input changes
  };

  const handleCityChange = (e) => {
    setCity(e.target.value); // Update city when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.trim() === "" || city.trim() === "") {
      window.alert("Please fill out both state and city fields.");
      return; // Stop further execution if validation fails
    }
    try {
      const stateResponse = await axios.post("http://localhost:4000/addState", {
        StateName: state,
        CityName: city,
      });
      console.log("State data saved successfully:", stateResponse.data);

      //   const cityResponse = await axios.post(
      //     "http://localhost:4000//addCity/:Cityname",
      //     {
      //       city: city,
      //     }
      //   );
      //   console.log("City data saved successfully:", cityResponse.data);

      // Clear the input fields after successful submission
      setState("");
      setCity("");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    setState("");
    setCity("");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    background: "#fff",
    height: "30vw",
  };

  const labelStyle = {
    width: "300px",
    fontSize: "30px",
    fontWeight: "bold",
    alignItems: "center",
    margin: "30px",
    fontFamily: "Google Sans",
  };
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>Admin Access:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", gap: 30 }}>
          <TextField
            id="State"
            label="Type the State Name"
            value={state}
            onChange={(e) => handleStateChange(e)}
            name="State"
            fullWidth
            required={true} // or simply required
            InputProps={{
              style: {
                background: "#fff",
              },
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          <TextField
            id="City"
            label="Type the City Name"
            value={city}
            onChange={(e) => handleCityChange(e)}
            name="City"
            fullWidth
            required={true} // or simply required
            InputProps={{
              style: {
                background: "#fff",
              },
            }}
          />
        </div>
        <div style={buttonContainerStyle}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default StateCity;

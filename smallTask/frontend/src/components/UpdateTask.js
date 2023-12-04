import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  TableCell,
  TableRow,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

// const allUserInfo = require("./SmallTask");

const CreateTasks = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [userData, setUserData] = useState(null);
  //   const [editingUser, setEditingUser] = useState(null);

  //   const handleEditClick = (user) => {
  //     setEditingUser(user);
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`name: ${name}, value: ${value}`);

    switch (name) {
      case "name":
        setName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "salary":
        setSalary(value);
        break;

      //   case "city":
      //     setCity(value);
      //     break;
      //   case "state":
      //     setState(value);
      //     break;
      default:
        break;
    }
  };

  //   const handleChange = (e) => {
  //     switch (e) {
  //       case "id":
  //         let idValue = e.target.value;
  //         setId(idValue);
  //         break;
  //       case "name":
  //         let nameValue = e.target.value;
  //         setName(nameValue);
  //         break;
  //       case "age":
  //         let ageValue = e.target.value;
  //         setAge(ageValue);
  //         break;
  //       case "city":
  //         let cityValue = e.target.value;
  //         setCity(cityValue);
  //         break;
  //       case "state":
  //         let stateValue = e.target.value;
  //         setState(stateValue);
  //         break;
  //       case "default":
  //         break;
  //     }
  //   };

  useEffect(() => {
    axios
      .get("http://localhost:4000/states")
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  const handleStateChange = (event) => {
    // console.log(state);
    const selectedValue = event.target.value;
    const [selectedStateId, selectedStateName] = selectedValue.split(":");
    console.log(selectedStateName);
    setSelectedState(selectedStateName);
    const selectedState = axios
      .get(`http://localhost:4000/cities/${selectedStateId}`)
      .then((response) => {
        setCity(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities for the selected state:", error);
      });
  };
  const handleCityChange = (event) => {
    const selectedValue = event.target.value;
    const [selectedCityId, selectedCityName] = selectedValue.split(":");
    console.log(selectedCityName);
    setSelectedCity(selectedCityName);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/personalInfo")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "16px",
  };

  const rowContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "16px",
  };

  const labelStyle = {
    width: "70px",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "30px",
    margin: "20px 0",
    marginRight: "10px",
  };
  const labelStyle2 = {
    width: "300px",
    fontSize: "30px",
    fontWeight: "bold",
    alignItems: "center",
    margin: "30px",
    fontFamily: "Arial, sans-serif",
    color: "#800000",
  };

  const inputStyle1 = {
    width: "300px",
  };

  const inputStyle2 = {
    width: "200px",
  };

  const createNewTask = async () => {
    // let formData = new FormData();
    // formData.append("Name", name);
    // formData.append("Age", age);
    // formData.append("City", city);
    // formData.append("State", state);
    // if (editingUser) {
    //   try {
    //     const {exisitingData} =
    //   }
    // }
    try {
      const { data } = await axios.post("http://localhost:4000/createUser", {
        Name: name,
        Age: age,
        Salary: salary,
        City: selectedCity,
        State: selectedState,
      });
      setName("");
      setAge("");
      setSalary("");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    axios
      .get("http://localhost:4000/personalInfo")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  //   const updateTask = async(Name, Age, Salary, City, State, id) => {

  //     try{
  //         const { data } = axios.put(`http://localhost:4000/updateUser/${id}`,{Name, Age, Salary, City, State})
  //         console.log("Update User", data)

  //     }
  //   }

  return (
    <div style={containerStyle}>
      <div style={labelStyle2}>Employee Form: </div>
      <div style={rowContainerStyle}>
        <label style={labelStyle}>Name:</label>
        <TextField
          id="name"
          value={name}
          onChange={(e) => handleChange(e)}
          style={inputStyle1}
          name="name"
        />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <label style={labelStyle}>Salary:</label>
        <TextField
          id="salary"
          value={salary}
          onChange={(e) => handleChange(e)}
          style={inputStyle1}
          name="salary"
        />
      </div>

      <div style={rowContainerStyle}>
        <label style={labelStyle}>Age:</label>
        <TextField
          id="age"
          value={age}
          onChange={(e) => handleChange(e)}
          style={inputStyle2}
          name="age"
        />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <label style={labelStyle}>State:</label>
        <select style={inputStyle2} onChange={handleStateChange}>
          <option value="">Select a state</option>
          {state.map((s) => {
            // console.log(s);
            return (
              <option key={s.state_id} value={`${s.state_id}: ${s.state_name}`}>
                {s.state_name}
              </option>
            );
          })}
        </select>
      </div>

      <div style={rowContainerStyle}>
        <label style={labelStyle}>City:</label>
        <select style={inputStyle2} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {city.map((c) => {
            return (
              <option key={c.city_id} value={`${c.city_id}: ${c.city_name}`}>
                {c.city_name}
              </option>
            );
          })}
        </select>
      </div>

      <div style={buttonContainerStyle}>
        <Button onClick={createNewTask}>Create</Button>
        <Link to="/create">
          <Button>Cancel</Button>
        </Link>
      </div>
      <Grid container>
        <Grid item lg={120}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Age
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Salary
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    City
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    State
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData &&
                  userData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ fontSize: "14px" }}>
                        {user.Name}
                      </TableCell>
                      <TableCell style={{ fontSize: "14px" }}>
                        {user.Age}
                      </TableCell>
                      <TableCell style={{ fontSize: "14px" }}>
                        {user.Salary}
                      </TableCell>
                      <TableCell style={{ fontSize: "14px" }}>
                        {user.City}
                      </TableCell>
                      <TableCell style={{ fontSize: "14px" }}>
                        {user.State}
                      </TableCell>
                      <TableCell style={{ fontSize: "14px" }}>
                        <Button onClick={createNewTask}>Edit</Button>
                        <Link to="/create">
                          <Button>Delete</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTasks;

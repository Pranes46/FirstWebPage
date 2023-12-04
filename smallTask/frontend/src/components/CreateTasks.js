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
  Select,
  MenuItem,
  Menu,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CreateTasks = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [userData, setUserData] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentSelectedState, setCurrentSelectedState] = useState();
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [salaryError, setSalaryError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const isFormValid = () => {
    return name.trim() !== "" && age.trim() !== "" && salary.trim() !== "";
  };

  const handleEditClick = async (userId) => {
    // const editConfirmed = window.confirm(
    //   `Are you sure you want to edit this user?`
    // );

    // console.log(editingUserId);

    // if (editConfirmed) {
    setEditingUserId(userId);

    const existingData = await axios
      .get(`http://localhost:4000/personalInfo/${userId}`)
      .then((response) => {
        const user = response.data[0];
        console.log(user);
        setEditingUser(user);
        setName(user.Name);
        setAge(user.Age);
        setSalary(user.Salary);
        setSelectedState(user.State);
        setSelectedCity(user.City);
      })
      .catch((e) => {
        console.log("Error fetching user data: ", e);
      });
    setEditingUserId(userId);
    setIsUpdating(true);
    console.log(editingUserId);
  };

  const handleDeleteClick = (userId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this user?`
    );

    if (isConfirmed) {
      // User confirmed, proceed with the deletion
      deleteAndAlertUser(userId);
    }
  };

  const fetchData = () => {
    axios
      .get("http://localhost:4000/personalInfo")
      .then((response) => {
        setUserData(response.data);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching personal info:", error);
      });
  };

  const deleteAndAlertUser = async (userId) => {
    try {
      // Send a DELETE request to your API
      await axios.delete(`http://localhost:4000/deleteUser/${userId}`);

      // User deleted successfully, show an alert
      alert(`User has been deleted.`);
      fetchData();
    } catch (error) {
      // Handle any errors, e.g., show an error alert
      alert(`Error deleting the user: ${error.message}`);
    }
  };

  const handleCancelClick = () => {
    if (isUpdating) {
      // If updating, reset the form and set isUpdating to false
      setName("");
      setAge("");
      setSalary("");
      setSelectedState("");
      setSelectedCity("");
      setIsUpdating(false);
    } else {
      // If not updating (i.e., creating a new task), simply reset the form
      setName("");
      setAge("");
      setSalary("");
      setSelectedState("");
      setSelectedCity("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`name: ${name}, value: ${value}`);

    switch (name) {
      case "name":
        if (!/^[A-Za-z]+$/.test(value)) {
          setNameError("Enter a valid name (letters only).");
        } else {
          setNameError("");
        }
        setName(value);
        break;
      case "age":
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0) {
          setAgeError("Enter a valid age (positive number).");
        } else {
          setAgeError("");
        }
        setAge(value);
        break;
      case "salary":
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0) {
          setSalaryError("Enter a valid salary (positive number).");
        } else {
          setSalaryError("");
        }
        setSalary(value);
        break;
      default:
        break;
    }
  };

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

  const handleStateChange = async (event) => {
    console.log(event);
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    const citiesForSelectedState = state[selectedState] || [];
    setCity(citiesForSelectedState);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  // const handleStateChange = async (event) => {
  //   console.log(event);

  //   const selectedValue = event.target.value;
  //   const selectedStateIndex = state.findIndex(
  //     (s) => s.state_id === selectedValue
  //   );
  //   console.log("index", selectedStateIndex);
  //   if (selectedStateIndex !== -1) {
  //     const selectedStateName = state[selectedStateIndex].state_name;
  //     setSelectedState(selectedStateName);
  //   }

  //   console.log("State Id", selectedValue);

  //   console.log(selectedState);
  //   const selectedStates = await axios
  //     .get(`http://localhost:4000/cities/${selectedValue}`)
  //     .then((response) => {
  //       console.log(response);
  //       setCity(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cities for the selected state:", error);
  //     });
  // };
  // const handleCityChange = (event) => {
  //   const selectedValue = event.target.value;
  //   console.log(selectedValue);
  //   // console.log(selectedCityName);
  //   setSelectedCity(selectedValue);
  // };

  // console.log("selected", selectedState);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/personalInfo")
  //     .then((response) => {
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    // color: "#fff",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };

  const labelStyle = {
    width: "70px",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "30px",
    margin: "20px 0",
    marginRight: "10px",
    alignItems: "left",
  };
  const labelStyle2 = {
    width: "300px",
    fontSize: "30px",
    fontWeight: "bold",
    alignItems: "center",
    margin: "30px",
    fontFamily: "Google Sans",
  };

  const createNewTask = async () => {
    if (editingUserId) {
      try {
        const { exisitingData } = await axios.put(
          `http://localhost:4000/updateUser/${editingUserId}`,
          {
            Name: name,
            Age: age,
            Salary: salary,
            City: selectedCity,
            State: selectedState,
          }
        );
        setEditingUserId(null);
        setEditingUser(null);
        setName("");
        setAge("");
        setSalary("");
        setSelectedCity([]);
        setSelectedState([]);
        setIsUpdating(false);
        console.log(exisitingData);
      } catch (e) {
        console.log(e);
      }
    } else {
      if (isFormValid()) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/createUser",
            {
              Name: name,
              Age: age,
              Salary: salary,
              State: selectedState,
              City: selectedCity,
            }
          );
          setName("");
          setAge("");
          setSalary("");
          setSelectedCity([]);
          setSelectedState([]);

          console.log("completed");
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Please fill out all required fields.");
      }
      fetchData();
    }
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle2}>Employee Form: </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          justifyContent: "left",
        }}
      >
        <div style={{ display: "flex", gap: 30, justifyContent: "left" }}>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => handleChange(e)}
            name="name"
            fullWidth
            required
            error={Boolean(nameError)}
            helperText={nameError}
            InputProps={{
              style: {
                background: "#fff",
              },
            }}
          />

          <TextField
            id="salary"
            label="Salary"
            value={salary}
            onChange={(e) => handleChange(e)}
            name="salary"
            fullWidth
            required
            type="number"
            error={Boolean(ageError)}
            helperText={ageError}
            InputProps={{
              style: {
                background: "#fff",
              },
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 30,
          }}
        >
          <TextField
            id="age"
            label="Age"
            value={age}
            onChange={(e) => handleChange(e)}
            name="age"
            required
            type="number"
            error={Boolean(ageError)}
            helperText={ageError}
            fullWidth
            InputProps={{
              style: {
                background: "#fff",
              },
            }}
          />

          <TextField
            fullWidth
            required
            select
            label="State"
            value={selectedState}
            onChange={handleStateChange}
            style={{ background: "#fff" }}
          >
            <MenuItem defaultValue="">Select a state</MenuItem>
            {Object.entries(state).map(([stateName, cities]) => (
              <MenuItem key={stateName} value={stateName}>
                {stateName}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            label="City"
            select
            value={selectedCity}
            required
            style={{ maxWidth: "47%", background: "#fff" }}
            onChange={handleCityChange}
            fullWidth
          >
            <MenuItem value="">Select a city</MenuItem>
            {state[selectedState]?.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div style={buttonContainerStyle}>
        {isUpdating ? ( // Conditionally render "Update" button
          <Button onClick={createNewTask}>Update</Button>
        ) : (
          <Button onClick={createNewTask}>Create</Button>
        )}
        <Button onClick={handleCancelClick}>Cancel</Button>
      </div>

      <TableContainer
        component={Paper}
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "60px",
          background: "#0000",
          color: "#000",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#000",
                  color: "#fff",
                  position: "sticky",
                  top: "0",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#000",
                  color: "#fff",
                  position: "sticky",
                  top: "0",
                }}
              >
                Age
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#000",
                  color: "#fff",
                  position: "sticky",
                  top: "0",
                }}
              >
                Salary
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#000",
                  color: "#fff",
                  position: "sticky",
                  top: "0",
                }}
              >
                City
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#000",
                  color: "#fff",
                  position: "sticky",
                  top: "0",
                }}
              >
                State
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#000",
                  color: "#fff",
                  position: "sticky",
                  top: "0",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(userData)}
            {userData &&
              userData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell
                    style={{
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      padding: "8px",
                      color: "#000",
                    }}
                  >
                    {user.Name}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      padding: "8px",
                      color: "#000",
                    }}
                  >
                    {user.Age}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      padding: "8px",
                      color: "#000",
                    }}
                  >
                    {user.Salary}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      padding: "8px",
                      color: "#000",
                    }}
                  >
                    {user.City}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      padding: "8px",
                      color: "#000",
                    }}
                  >
                    {user.State}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      padding: "8px",
                      color: "#000",
                    }}
                  >
                    <IconButton
                      onClick={() => handleEditClick(user.id)}
                      aria-label="edit"
                      size="large"
                      color="#000"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(user.id)}
                      aria-label="delete"
                      size="large"
                      color="#000"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreateTasks;

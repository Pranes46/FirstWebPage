const app = require("../config/api");
const client = require("../config/connection");
const routesConnection = require("../data/getCreate");
const bodyParser = require("body-parser");
const express = require("express");

client.connect();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Welcome to my website" });
});

app.get("/personalInfo", routesConnection.getUsers);
app.get("/personalInfo/:id", routesConnection.getUsersById);
app.put("/updateUser/:id", routesConnection.updateUser);
app.post("/createUser", routesConnection.createUser);
app.get("/states", routesConnection.getStates);
app.post("/states/:stateId", routesConnection.getCitiesForState);
app.get("/cities/:stateId", routesConnection.getCitiesForState);
app.delete("/deleteUser/:id", routesConnection.deleteUser);
app.post("/addState", routesConnection.addState);
// app.post("/addCity", routesConnection.addCity);

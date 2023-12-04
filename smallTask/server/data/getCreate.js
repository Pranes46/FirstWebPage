const pool = require("../config/connection");

//getting all users from DB

const getUsers = async (request, response) => {
  try {
    const result = await pool.query(
      `SELECT * from personal_info ORDER BY "Name"`
    );
    response.send(result.rows);
  } catch (e) {
    console.error(e);
    response.status(500).send("Oops! Something wrong while fetching all users");
  }
};

//getting all users from db by using id

const getUsersById = async (request, response) => {
  try {
    const resultId = request.params.id;
    const getResultId = await pool.query(
      `SELECT * from personal_info WHERE id = $1`,
      [resultId]
    );
    console.log(getResultId.rows);
    response.send(getResultId.rows);
  } catch (e) {
    console.error(e);
    response
      .status(500)
      .send("Oops! Something wrong while fetching user by id");
  }
};

//selecting states for scroll option

const getStates = async (request, response) => {
  try {
    const { rows } = await pool.query(`SELECT * from states_cities`);
    const stateCityMapping1 = {};
    rows.forEach((row) => {
      const state = row.state_name;
      const city = row.city_name;

      if (stateCityMapping1[state]) {
        stateCityMapping1[state].push(city);
      } else {
        stateCityMapping1[state] = [city];
      }
    });
    // const stateCityMapping = rows.map((row) => ({
    //   state: row.state_name,
    //   city: row.city_name,
    // }));
    // const cities = await getCitiesForState(rows.map((row) => row.state_id));
    // const statesWithCities = stateNames.map((stateName, index) => ({
    //   state_name: stateName,
    //   cities: cities[index] || [], // Use an empty array if cities[index] is undefined
    // }));
    // console.log(cities);
    // console.log(stateCityMapping1);

    response.send(stateCityMapping1);
  } catch (e) {
    console.log(e);
    response
      .status(500)
      .send("Oops! something went wrong while selecting states");
  }
};

const getCitiesForState = async (request, response) => {
  const citiesByState = [];
  const stateId = request.params.stateId;
  console.log(stateId);
  try {
    const cityRows = await pool.query(
      "SELECT city_name FROM cities_info WHERE state_id = $1",
      [stateId]
    );

    const cityNames = cityRows.rows.map((row) => row.city_name);
    citiesByState.push(...cityNames);
    console.log(citiesByState);
    response.status(200).send(citiesByState);
  } catch (e) {
    console.log(e); // Log the error for debugging purposes
    citiesByState.push([]); // Handle the error by pushing an empty array
  }

  return citiesByState;
};

const addState = async (request, response) => {
  try {
    const stateName = request.body.StateName;
    const cityName = request.body.CityName;

    const stateCheck = await pool.query(
      "SELECT state_name FROM states_cities WHERE state_name=$1",
      [stateName]
    );
    const cityCheck = await pool.query(
      "SELECT city_name FROM states_cities WHERE city_name=$1",
      [cityName]
    );

    if (stateCheck.rowCount === 0 && cityCheck.rowCount === 0) {
      const newState = await pool.query(
        "INSERT INTO states_cities (state_name, city_name) VALUES ($1,$2) RETURNING state_name",
        [stateName, cityName]
      );

      response.status(200).json({
        success: true,
        message: "State added successfully",
        data: newState.rows[0].state_name,
      });

      // await addCity(cityName, newState.rows[0].state_name);
    } else {
      await pool.query(
        "INSERT INTO states_cities (state_name, city_name) VALUES ($1, $2)",
        [stateName, cityName]
      );

      response.status(200).json({
        success: false,
        message: "Added Successfully",
      });

      // You might want to decide whether to proceed with adding the city or not
      // await addCity(cityName, stateCheck.rows[0].state_name);
    }
  } catch (e) {
    console.error(e);
    response.status(500).json({
      success: false,
      message: "Oops, something went wrong in addState",
      error: e.message,
    });
  }
};

// const addCity = async (cityName, stateName) => {
//   try {
//     const cityCheck = await pool.query(
//       "SELECT city_name FROM states_cities WHERE state_name = $1 AND city_name = $2",
//       [stateName, cityName]
//     );

//     if (cityCheck.rowCount === 0) {
//       await pool.query(
//         "INSERT INTO states_cities (state_name, city_name) VALUES ($1, $2)",
//         [stateName, cityName]
//       );
//     } else {
//       console.log("City already exists");
//     }
//   } catch (e) {
//     console.error(e);
//     throw new Error("Oops! Something went wrong while adding/fetching cities");
//   }
// };

//creating new user

const createUser = async (request, response) => {
  const { Name, Age, Salary, City, State } = request.body;

  try {
    const createdResult = await pool.query(
      'INSERT INTO personal_info ("Name", "Age", "Salary", "City", "State") VALUES ($1, $2, $3, $4, $5)',
      [Name, Age, Salary, City, State]
    );
    console.log(Name, Age, Salary, City, State);
    response.send("User created successfully");
    return;
  } catch (e) {
    console.log(e);
    response
      .status(500)
      .send("Oops! Something went wrong while creating the user");
    return;
  }
};

const updateUser = async (request, response) => {
  const userId = request.params.id;

  console.log(userId);
  const { Name, Age, Salary, City, State } = request.body;

  try {
    const updatedUserResult = await pool.query(
      `UPDATE personal_info SET "Name" = $1, "Age" = $2, "Salary" = $3, "City" = $4, "State" = $5 WHERE id = $6`,
      [Name, Age, Salary, City, State, userId]
    );
    response.send(`User modified with ID: ${updatedUserResult.rows}`);
  } catch (e) {
    console.error(e);
    response
      .status(500)
      .send("Oops! Something wrong while modifying the details");
  }
};

const deleteUser = async (request, response) => {
  const deleteId = request.params.id;
  //const {Name, Age, Salary, City, State} = request.body

  try {
    const userResultAfterDelete = await pool.query(
      `DELETE FROM personal_info where id = $1`,
      [deleteId]
    );
    response.send(`User Deleted With ID: ${userResultAfterDelete.rows}`);
  } catch (e) {
    console.error(e);
    response.status(500).send("Oops! Something wrong while deleting the user");
  }
};

module.exports = {
  getUsers,
  createUser,
  getStates,
  getCitiesForState,
  updateUser,
  getUsersById,
  deleteUser,
  addState,
};

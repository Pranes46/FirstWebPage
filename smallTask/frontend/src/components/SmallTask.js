import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const { data } = await axios.get(`http://localhost:4000/personalInfo`);
        console.log("All users", data);
        setUsers(data);
        console.log(users);
      } catch (e) {
        console.log(e);
      }
    }
    getAllUsers();
  }, []);

  if (users) {
    return (
      <div>
        <h1>All Users</h1>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.Name} {user.Age} {user.Salary} {user.City} {user.State}
            </li>
            // <li key = {user.id}></li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default AllUsers;

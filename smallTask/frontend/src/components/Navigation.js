import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminNavBar from "./AdminNavBar";
import EmployeeNavBar from "./EmployeeNavBar";

const Navigation = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    const displayName = currentUser.displayName;

    if (displayName === "admin") {
      return <AdminNavBar />;
    } else {
      return <EmployeeNavBar />;
    }
  }
};

export default Navigation;

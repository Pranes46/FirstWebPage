import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import "./App.css";
import { Link } from "react-router-dom";
import SmallTask from "./components/SmallTask";
import CreateTasks from "./components/CreateTasks";
import UpdateTasks from "./components/UpdateTask";
// import Employee from "./Employee";
// import Admin from "./header.js";
import Header from "./components/AdminNavBar";
import Home from "./components/home";
import StateCity from "./components/admin";
import Signup from "./components/signup";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
          <Routes>
            {/* <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpwd" element={<ForgotPassword />} />

            <Route
              path="/employee"
              roles={["employee"]}
              element={<PrivateRoute />}
            >
              <Route path="/employee" element={<CreateTasks />} />
            </Route>

            <Route path="/admin" roles={["admin"]} element={<PrivateRoute />}>
              <Route path="/admin" element={<StateCity />} />
            </Route>

            {/* Public Route */}
            {/* <Route path="/" element={<Home />} /> */}

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpwd" element={<ForgotPassword />} />

            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/employee" element={<PrivateRoute />}>
              <Route path="/employee" element={<CreateTasks />} />
            </Route>
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="/admin" element={<StateCity />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;

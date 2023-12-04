import React, { useContext, useState, useEffect } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password, role) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        // role
      );
      await updateProfile(userCredential.user, { displayName: role });
      setCurrentUser(userCredential.user);
      console.log(currentUser);

      // await updateRoleInDatabase(userCredential.user.uid, selectedRole);

      return userCredential;
    } catch (error) {
      console.error("Error logging in: ", error.message);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const displayName = userCredential.user.displayName;
      setCurrentUser(userCredential.user);

      console.log("Display Name:", displayName);
      return { userCredential, displayName };
    } catch (e) {
      console.log("Error while logging in: ", e);
      return;
    }
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
    });
  }, []);

  const value = { currentUser, signup, login, logout, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

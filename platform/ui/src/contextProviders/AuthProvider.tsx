// Reference: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
import React from "react";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (input) => {
    return await fetch("http://127.0.0.1:8000/register/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Username": input.username,
        "Password": input.password,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUser(input.username);
        console.log("Successfully set user to " + user);
        return true;
      }
      return false;
    })
    .catch(error => {
      console.error(error.message);
      return false;
    });
  }

  const loginAction = async (input) => {
    return await fetch("http://127.0.0.1:8000/login/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Username": input.username,
        "Password": input.password,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setUser(input.username);
        console.log("Successfully set user to " + user);
        return true;
      }
      return false
    })
    .catch(error => {
      console.error(error.message);
      return false;
    });
  };

  const logOut = () => {
    setUser(null);
    alert("Logged out successfully.")
  };

  return (
    <AuthContext.Provider value={{ user, register, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
import React from "react";
import { useState } from "react";
import * as Icon from 'react-bootstrap-icons';

const Login = ({setLogin}) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      //dispatch action from hooks
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form id="login" onSubmit={handleSubmitEvent}>
        <button style={{marginTop: "4px", float: 'right'}} onClick={() => setLogin(false)}>
            <Icon.XCircleFill 
                color="white"
                size={36}
            />
        </button>
        <div className="form_control">
            <label htmlFor="user-email">Email:</label>
            <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
            />
            <div id="user-email" className="sr-only">
                Please enter a valid username. It must contain at least 6 characters.
            </div>
        </div>
        <div className="form_control">
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
            />
            <div id="user-password" className="sr-only">
                your password should be more than 6 character
            </div>
        </div>
        <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;
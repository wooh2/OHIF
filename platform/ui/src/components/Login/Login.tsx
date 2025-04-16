// Reference: https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
import React from "react";
import { useState } from "react";
import * as Icon from 'react-bootstrap-icons';
import { useAuth } from "../../contextProviders/AuthProvider";
import Input from "../Input";
import { Button } from "@ohif/ui-next";
import classNames from "classnames";

const Login = ({setLogin}) => {
  const auth = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [register, setRegister] = useState(false);
  
  const handleSubmitEvent = async(e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      console.log("Submitted " + input.username)
      let success;
      if (register) {
        success = await auth.register(input);
      }
      else {
        success = await auth.loginAction(input);
      }
      console.log(success);
      if (success) {
        setLogin(false);
      }
      else {
        alert("Invalid username or password.");
      }
      return;
    }
    alert("Please enter your username and password.");
  };
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div id="login">
      <Button
        variant='ghost'
        size="default"
        className="hover:bg-transparent"
        style={{marginRight: "-25px", float: 'right'}} 
        onClick={() => setLogin(false)}
      >
          <Icon.XCircleFill 
              color="black"
              size={36}
          />
      </Button>
      {auth.user && (
        <Button
        className="bg-primary-main hover:bg-primary-dark"
        onClick={() => auth.logOut()}
      >
        Log out
      </Button>
      )}
      {!auth.user && (<>
        <div
          id="loginSelection"
        >
          <Button
            className={classNames('bg-primary-main', {
                '.ohif-disabled bg-gray-900 hover:bg-gray-900': register,
                'hover:bg-primary-dark': !register,
              }
            )}
            onClick={() => setRegister(true)}
          >
            Register
          </Button>
          <Button
            className={classNames('bg-primary-main', {
                '.ohif-disabled bg-gray-900 hover:bg-gray-900': !register,
                'hover:bg-primary-dark': register,
              }
            )}
            onClick={() => setRegister(false)}
          >
            Login
          </Button>
        </div>
        <form onSubmit={handleSubmitEvent}> 
          <div className="form_control">
            <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            className="bg-white text-black"
            onChange={handleInput}
            />
            <div id="username" className="sr-only">
                Please enter a valid username. It must contain at least 6 characters.
            </div>
            <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            className="bg-white text-black"
            onChange={handleInput}
            />
            <div id="user-password" className="sr-only">
                Your password should be more than 6 character
            </div>
          </div>
          <Button 
            type="submit"
            className="bg-primary-main my-2 hover:bg-primary-dark"
          >
            {register ? "Register" : "Login"}
          </Button>
        </form>
      </>)}
    </div>
  );
};

export default Login;
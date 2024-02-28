import SignUp from "components/SignUp";
import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <SignUp />
      <p>
        Have account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;

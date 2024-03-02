import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { removeUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();
  return isAuth ? (
    <>
      <div>
        <h1>Welcome,{email}</h1>
      </div>
      <button onClick={() => dispatch(removeUser())}>Logout</button>
    </>
  ) : (
    <div>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;

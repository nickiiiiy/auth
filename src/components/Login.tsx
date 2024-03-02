import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
interface LoginProps {}
const Login: FC<LoginProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/");
      })
      .catch(() => alert("Wrong email or password"));
  };
  return (
    <Form
      title="sign in"
      // handleClick={() => handleLogin('email', 'password')}
      handleClick={handleLogin}
    />
  );
};

// export default Login
export { Login };

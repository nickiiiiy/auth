import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../redux/slices/userSlice";
import { Form } from "./Form";
import { useAppDispatch } from "../hooks/reduxHooks";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
      .catch(console.error);
  };
  return <Form title="register" handleClick={handleRegister} />;
};

export default SignUp;

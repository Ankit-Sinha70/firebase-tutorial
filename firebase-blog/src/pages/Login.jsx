import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Login({ isAuth, setIsAuth }) {
  let navigate = useNavigate();
  const logInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <>
      <div className="loginPage">
        <p>SignIn With Google To Continue</p>
        <button className="login-with-google-btn" onClick={logInWithGoogle}>
          SignIn With Google
        </button>
      </div>
    </>
  );
}

export default Login;

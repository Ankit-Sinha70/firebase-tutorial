import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../firebase-config";
import "./Home.css";

function Home() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
      alert("User registered successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogOut = async () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    await signOut(auth);
  };

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="home-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={registerUser} className="primary-btn">
          Register
        </button>
      </div>

      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={loginUser} className="primary-btn">
          Login
        </button>
      </div>

      <div className="auth-info">
        {user ? (
          <>
            <h3>Logged in as: {user.email}</h3>
            <button onClick={handleLogOut} className="secondary-btn">
              Log Out
            </button>
          </>
        ) : (
          <button onClick={signInWithGoogle} className="login-with-google-btn">
            Sign in with Google
          </button>
        )}
        <div className="user-info">
          <h2>{localStorage.getItem("name")}</h2>
          <h2>{localStorage.getItem("email")}</h2>
          <img src={localStorage.getItem("profilePic")} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;

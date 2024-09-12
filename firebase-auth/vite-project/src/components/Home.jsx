import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";

function Home() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("")
      setRegisterPassword("")
      alert("User register successfully")
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogOut = async () => {
    await signOut(auth);
  };

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setIsLoggedIn(true);
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>
        <h2>Register User</h2>
        <input
          type="text"
          placeholder="email..."
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password..."
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={registerUser}>Create User</button>
      </div>
      <div>
        <h2>LogIn</h2>
        <input
          type="text"
          placeholder="email.."
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password.."
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={loginUser}>Login</button>
      </div>
      <div>
      {isLoggedIn && user && (
          <>
            <h3>Logged in as: {user.email}</h3>
            <button onClick={handleLogOut}>Log Out</button>
          </>
        )}
      </div>
    </>
  );
}

export default Home;

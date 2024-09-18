import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import Cookies from "universal-cookie";
import "../styles/Auth.css";
import { useState } from "react";
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleSignIn = async (e) => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      console.log("User signed in with Google:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleLogIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      cookies.set("auth-token", user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log("error occured", error);
    }
  };

  return (
    <div className="auth">
      <div className="logIn-section">
        <label style={{ marginRight: "380px", padding: "20px", color: "gray" }}>
          Email
        </label>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label style={{ marginRight: "360px", padding: "10px", color: "gray" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ margin: "20px", width: "100px" }}
          onClick={handleLogIn}
        >
          LogIn
        </button>
      </div>
      <p style={{ fontWeight: "600", color: "gray", marginTop: "10px" }}>
        SignIn With Google To Continue
      </p>
      <button onClick={handleGoogleSignIn} class="login-with-google-btn">
        SignIn
      </button>
    </div>
  );
};

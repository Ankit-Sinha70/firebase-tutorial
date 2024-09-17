import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import Cookies from "universal-cookie"
const cookies = new Cookies()

export const Auth = ({setIsAuth}) => {
  const handleGoogleSignIn = async (e) => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true)
      console.log("User signed in with Google:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="auth">
      <p>SignIn With Google To Continue</p>
      <button onClick={handleGoogleSignIn}>SignIn</button>
    </div>
  );
};

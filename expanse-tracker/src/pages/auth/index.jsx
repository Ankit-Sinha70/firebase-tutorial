import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
import "./styles.css";



export const Auth = () => {
    const navigate = useNavigate()
    const handleGoogleLogin = async() => {
       const result = await signInWithPopup(auth, provider)
       const authInfo = {
        userId: result.user.uid,
        name:result.user.displayName,
        profile:result.user.photoURL,
        isAuth: true
       }
       localStorage.setItem("auth", JSON.stringify(authInfo))
       navigate("/expense-tracker")
    }
    return(
        <div className="login-page">
                <p>SignIn with Google to continue...</p>
                <button className="login-with-google-btn" onClick={handleGoogleLogin}>
                        SignIn with Google
                </button>
        </div>
    )
}
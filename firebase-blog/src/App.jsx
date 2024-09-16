import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import UploadFiles from "./pages/UploadFiles";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  let navigate = useNavigate();

  const handleLogot = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <>
      <div>
        <>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/uploadFile">Upload File</Link>

            {!isAuth ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
                <Link to="/createPost">Create Post</Link>
                <Link>
                  <div onClick={handleLogot}>Logout</div>
                </Link>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth} />} />
            <Route
              path="/createPost"
              element={<CreatePost isAuth={isAuth} />}
            />
            <Route
              path="/login"
              element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
            <Route path="/uploadFile" element={<UploadFiles />} />
          </Routes>
        </>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);
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

            {!isAuth ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
                <Link to="/createPost">Create Post</Link>
                <button onClick={handleLogot}>Logout</button>
              </>
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/createPost"
              element={<CreatePost isAuth={isAuth} />}
            />
            <Route
              path="/login"
              element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
            />
          </Routes>
        </>
      </div>
    </>
  );
}

export default App;

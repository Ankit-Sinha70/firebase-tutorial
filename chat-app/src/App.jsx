import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef();

  const handleSignOutUser = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Chat-App</h2>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room} setIsAuth={setIsAuth} isAuth={isAuth} setRoom={setRoom} />
      ) : (
        <div className="room">
          <label>Enter Room Name</label>
          <input type="text" ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
      <div>
        <button className="button-92" onClick={handleSignOutUser}>
          SignOut
        </button>
      </div>
        </div>
      )}

    </>
  );
}

export default App;

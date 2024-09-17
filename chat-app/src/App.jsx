import { useState, useRef } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef();

  if (!isAuth) {
    return (
      <>
        <h2>Chat-App</h2>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name</label>
          <input type="text" ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}

      <div className="sign-out">
        <button>SignOut</button>
      </div>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { Auth } from "./Auth";
import Cookies from "universal-cookie";

function Chat({ room, setIsAuth, isAuth, setRoom }) {
  const cookies = new Cookies();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");

  const getMessages = () => {
    try {
      const queryMessageRef = query(
        messageRef,
        where("room", "==", room),
        orderBy("createdAt")
      );
      const dataUsers = onSnapshot(queryMessageRef, (items) => {
        let messages = [];
        items.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });
      return () => dataUsers();
    } catch (error) {
      console.error("Error Occured", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = async (e) => {
    if (newMessage === "") return;

    e.preventDefault();
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

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
    <div className="chat-app">
      <div className="header">
        <h2>Welcome to: {room.toUpperCase()}</h2>
        <button className="button-24" onClick={handleSignOutUser}>
          SignOut
        </button>
      </div>
      <div className="messages">
        {messages?.map((item) => {
          const isCurrentUser = item.user === auth.currentUser?.displayName;
          return (
            <div
              className={`message ${isCurrentUser ? "sent" : "received"}`}
              key={item.id}
            >
              <span className="user">{item.user}</span> {item.text}
            </div>
          );
        })}
      </div>
      <form className="new-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type messages here..."
          className="new-message-input"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="button-92">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;

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
function Chat({ room }) {
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
          console.log(doc);
          console.log(doc.data());
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
    console.log(newMessage);
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h2>Welcome to : {room}</h2>
      </div>
      <div className="messages">
        {messages?.map((item) => {
          return (
            <div className="message" key={item.id}>
              <span className="user">{item.user}</span>: {item.text}
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
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
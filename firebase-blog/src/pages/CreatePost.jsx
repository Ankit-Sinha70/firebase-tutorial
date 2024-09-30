import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const handlePost = async () => {
    const response = await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
    console.log("response: ", response);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            type="text"
            placeholder="title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            cols="30"
            rows="10"
            placeholder="post..."
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
          <button onClick={handlePost}>Submit Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

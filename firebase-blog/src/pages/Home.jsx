import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { IoTrashBinSharp } from "react-icons/io5";
import { RiEditFill } from "react-icons/ri";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");

  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPost();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
      alert("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedText(post.postText);
  };

  const handleUpdatePost = async () => {
    if (editingPost) {
      try {
        const postDoc = doc(db, "posts", editingPost.id);
        await updateDoc(postDoc, { title: editedTitle, postText: editedText });
        setPostList((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPost.id
              ? { ...post, title: editedTitle, postText: editedText }
              : post
          )
        );
        setEditingPost(null);
        alert("Post updated successfully");
      } catch (error) {
        console.error("Error updating post: ", error);
      }
    }
  };

  return (
    <div className="homePage">
      {editingPost ? (
        <div className="cpContainer">
          <h1>Edit Post</h1>
          <div className="inputGp">
            <label>Edit Title:</label>
            <input
              type="text"
              placeholder="Edit title..."
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="inputGp">
            <label>Edit Post:</label>
            <textarea
              placeholder="post..."
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={handleUpdatePost}>Update Post</button>
            <button onClick={() => setEditingPost(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        postList.map((item) => (
          <div className="post" key={item.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{item.title}</h1>
              </div>
              <div className="deletePost">
                {!isAuth ? (
                  ""
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={() => handleDeletePost(item.id)}>
                      <IoTrashBinSharp style={{ color: "gray" }} />
                    </button>
                    <button onClick={() => handleEdit(item)}>
                      <RiEditFill style={{ color: "gray" }} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="postTextContainer">{item.postText}</div>
            <h3>@{item.author.name}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

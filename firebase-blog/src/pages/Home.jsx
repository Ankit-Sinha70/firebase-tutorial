import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { IoTrashBinSharp } from "react-icons/io5";

function Home() {
  const [postList, setPostList] = useState([]);
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
      alert("Data deleted successfully")
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };
  return (
    <div className="homePage">
      {postList.map((item) => {
        return (
          <div className="post" key={item.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{item.title}</h1>
              </div>
              <div className="deletePost">
                <button onClick={() => handleDeletePost(item.id)}>
                  <IoTrashBinSharp style={{ color: "gray" }} />
                </button>
              </div>
            </div>
            <div className="postTextContainer">{item.postText}</div>
            <h3>@{item.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;

import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

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
  return (
    <div className="homePage">
      {postList.map((item) => {
        return (
          <div className="post" key={item.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{item.title}</h1>
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

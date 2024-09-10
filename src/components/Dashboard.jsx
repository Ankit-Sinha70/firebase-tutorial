import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data, "datadata");
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", 
      gap: "20px",
      width: "100%", 
      
    }}
  >
    {users.map((user) => (
      <div
        key={user.id}
        style={{
          border: "1px solid red",
          borderRadius:"20px",
          padding: "20px",
        }}
      >
        <h2>Name: {user.name}</h2>
        <h2>Age: {user.age}</h2>
      </div>
    ))}
  </div>
  
  );
}

export default Dashboard;

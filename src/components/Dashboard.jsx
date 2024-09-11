import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const usersCollectionRef = collection(db, "users");

  // Add new user to Firestore
  const handleCreateUser = async () => {
    if (newName.trim() && newAge) {
      try {
        const createUser = await addDoc(usersCollectionRef, {
          name: newName,
          age: Number(newAge),
        });
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: createUser.id, name: newName, age: newAge },
        ]);
        setNewName("");
        setNewAge("");
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  };

  // Delete user from Firestore
  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    try {
      await deleteDoc(userDoc);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  // Fetch users with pagination (limit 10)
  useEffect(() => {
    const getUsers = async () => {
      try {
        const q = query(collection(db, "users"), limit(10));
        const data = await getDocs(q);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    getUsers();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Age"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid blue",
              borderRadius: "20px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h2>Name: {user.name}</h2>
            <h2>Age: {user.age}</h2>
            <button onClick={() => handleDeleteUser(user.id)}>
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

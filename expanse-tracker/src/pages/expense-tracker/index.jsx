import { useGetTransaction } from "../../hooks/useGetTransactions";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import useAddTransaction from "../../hooks/useAddTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState } from "react";
import "./styles.css";

export const ExpenseTracker = () => {
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const { transactions, transactionTotal, setTransactions } = useGetTransaction();
  const [transactionType, setTransactionType] = useState("expense");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const { balance, income, expense } = transactionTotal;
  const [description, setDescription] = useState("");
  const { addTransaction } = useAddTransaction();
  const { name, profile } = useGetUserInfo();
  console.log("profile: ", profile);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (currentTransactionId) {
      // Update the existing transaction
      await updateTransaction(currentTransactionId, {
        description,
        transactionAmount,
        transactionType,
      });
      setCurrentTransactionId(null);
    } else {
      // Add new transaction
      addTransaction({ description, transactionAmount, transactionType });
    }
    setDescription("");
    setTransactionAmount("");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error(error, "Error while sign-out");
    }
  };

  const handleDelete = async (id) => {
    console.log(id, "id");
    try {
      const postDoc = doc(db, "transactions", id);
      await deleteDoc(postDoc);
      setTransactions((prevPosts) =>
        prevPosts.filter((post) => post.id !== id)
      );
      alert("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleEdit = (transaction) => {
    setCurrentTransactionId(transaction.id);
    setDescription(transaction.description);
    setTransactionAmount(transaction.transactionAmount);
    setTransactionType(transaction.transactionType);
  };

  const updateTransaction = async (id, updatedTransaction) => {
    const transactionDocRef = doc(db, "transactions", id);
    try {
      await updateDoc(transactionDocRef, updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };

  return (
    <div className="expense-tracker">
      <div className="container">
        <h1>{name}'s Expense Tracker</h1>
        {profile && (
          <div className="profile">
            <img
              className="profile-photo"
              src={profile}
              alt={"profilePhoto"}
              height={100}
              width={100}
              style={{ borderRadius: "50%" }}
            />
          </div>
        )}
        <div className="balance">
          <h3>Your Balance</h3>$ {balance}{" "}
          {balance >= 0 ? (
            <span role="img" aria-label="smile">
              😊
            </span>
          ) : (
            <span role="img" aria-label="sad">
              😢
            </span>
          )}
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>$ {income}</p>
          </div>
          <div className="expenses">
            <h4>Expense</h4>
            <p>$ {expense}</p>
          </div>
        </div>
        <form className="add-transaction" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description..."
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <input
            type="number"
            placeholder="Amount..."
            value={transactionAmount}
            required
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <br />
          <div className="radio-group">
            <div>
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
            </div>
            <div>
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>
            </div>
          </div>

          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "20px",
            }}
          >
            <button type="submit">Add Transaction</button>
            <button onClick={handleSignOut}>SignOut</button>
          </div>
        </form>
      </div>

      <div className="transactions">
        <ul>
          {transactions &&
            transactions.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`transaction-card ${
                    item.transactionType === "expense" ? "expense" : "income"
                  }`}
                >
                  <li>
                    <h4>{item.description}</h4>
                    <h4>
                      ${item.transactionAmount} :{" "}
                      <label>{item.transactionType}</label>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          gap: "10px",
                        }}
                      >
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete Expense
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                      </div>
                    </h4>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

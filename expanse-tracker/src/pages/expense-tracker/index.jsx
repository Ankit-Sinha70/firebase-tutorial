import { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransaction();
  const { name, profile } = useGetUserInfo();
  const { balance, income, expense } = transactionTotal;
  console.log("profile: ", profile);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
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

  return (
    <div className="expense-tracker">
      <div className="container">
        <h1>{name}'s Expense Tracker</h1>
        {profile && (
          <div className="profile">
            <img
              className="profile-photo"
              src={profile.toString()}
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

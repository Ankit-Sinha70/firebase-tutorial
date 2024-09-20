import { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransactions";

export const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransaction();
  console.log('transactions: ', transactions);

  const onSubmit = async (event) => {
    event.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount("");
  };

  return (
    <div className="expense-tracker">
      <div className="container">
        <h1>Expense Tracker</h1>
        <div className="balance">
          <h3>Your Balance</h3>
          <h2>$0.00</h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>$0.00</p>
          </div>
          <div className="expenses">
            <h4>Expense</h4>
            <p>$0.00</p>
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
          <input
            type="radio"
            id="expense"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label>Expense</label>
          <input
            type="radio"
            id="income"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => setTransactionType(e.target.value)}
          />
          <label>Income</label>
          <br />
          <br />
          <button type="submit">Add Transaction</button>
        </form>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions?.map((item) => {
            console.log('item: ', item);
            const { description, transactionAmount, transactionType } = item;
            return (
              <div>
                <li>
                  <h4>{description}</h4>
                  <h4>${transactionAmount} : <label style={{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></h4>
                </li>
               </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

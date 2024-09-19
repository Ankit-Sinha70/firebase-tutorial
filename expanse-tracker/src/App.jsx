import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import { ExpenseTracker } from "./pages/expense-tracker";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <h2>Expanse Tracker App</h2>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

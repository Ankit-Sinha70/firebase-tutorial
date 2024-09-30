import { ExpenseTracker } from "./pages/expense-tracker";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

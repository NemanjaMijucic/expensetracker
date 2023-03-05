import "./App.css";
import { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from "uuid";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  //********** state values  ********/
  //* expenses, add expenses

  const [expenses, setExpenses] = useState(initialExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({
    show: false,
  });
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);

  //****************** useEffect ************************/
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("jel radi");
  }, [expenses]);

  //***************** functionality  ********************/
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({
      show: true,
      type,
      text,
    });
    setTimeout(() => {
      setAlert({
        show: false,
      });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id
            ? {
                ...item,
                charge,
                amount,
              }
            : item;
        });

        handleAlert({ type: "success", text: "item edited" });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = {
          id: uuidv4(),
          charge,
          amount,
        };
        handleAlert({ type: "success", text: "new expense added" });
        setExpenses((prev) => [...prev, singleExpense]);

        setCharge("");
        setAmount("");
      }
    } else {
      handleAlert({ type: "danger", text: "smoething went wrong" });
    }
  };

  //clear all items
  const clearItems = () => {
    console.log("cleared all items");
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  //clear single item
  const handleDelete = (id) => {
    console.log(`item deleted : ${id}`);
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
  };
  //edit item
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    console.log(expense);
    console.log(`item edited ${id}`);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          clearItems={clearItems}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;

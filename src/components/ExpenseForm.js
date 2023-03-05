import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="from-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="from-group">
          <label htmlFor="amount">charge</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            placeholder="e.g. 100"
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "edit" : "submit"}
        {<MdSend className="btn-icon" />}
      </button>
    </form>
  );
};

export default ExpenseForm;

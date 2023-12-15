import React from "react";
import "./style.css";
export const AnalyticCart = ({ className, title, percent, amount }) => {
  return (
    <div className="card flex column ">
      <div className="card-top flex">
        <h3 className={className}>{title}</h3>
        <p>{percent}</p>
      </div>
      <p className="cart-amount">{amount}</p>
    </div>
  );
};

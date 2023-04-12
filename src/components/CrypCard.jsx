import React from "react";
import "./crycard.css";
function CrypCard({ name, icon, price, symbol, ic }) {
  return (
    <div className="crycard">
      <h2>Name: {name}</h2>
      <img src={icon} alt="" />
      <h3>
        Price: {price}
        <span> </span>
        {ic ? "₹" : "$"}
      </h3>
      <h3>Symbol:{symbol}</h3>
    </div>
  );
}

export default CrypCard;

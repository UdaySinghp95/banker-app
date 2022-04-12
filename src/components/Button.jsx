import React from "react";
import "../styles/button.css";

function Button({ className, onClick, children }) {
  return (
    <div className={"button_container" + " " + className}>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

export default Button;

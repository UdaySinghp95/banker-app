import "../App.css";
import { useNavigate } from "react-router-dom";

function Theme({ className, children }) {
  const navigation = useNavigate();

  return (
    <div className="container">
      <nav className="navbar">
        <img
          src="../logo.svg"
          alt="Company logo"
          className="logo"
          onClick={() => navigation("/all-banks")}
        />

        <p onClick={() => navigation("/all-banks")}>Banker</p>
      </nav>
      <div className={"container__content" + " " + className}>{children}</div>

      <p className="copyright">© All Rights are Reversed|Uday Singh</p>
    </div>
  );
}

export default Theme;

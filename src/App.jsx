import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Bank from "./components/Bank";
import Home from "./components/Home";
import MainStorage from "./context/MainStorage";
import fetchAllBank from "./backend/db";

function App(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [allBankList, setAllBankList] = useState([]);

  useEffect(() => {
    if (location.pathname == "/") navigate("/all-banks");

    fetchAllBank(setAllBankList);
  }, []);

  return (
    <div>
      <MainStorage.Provider value={allBankList}>
        <Routes>
          <Route path="/all-banks" element={<Home />}></Route>
          <Route path="/bank-details/:ifsc" element={<Bank />}></Route>
        </Routes>
      </MainStorage.Provider>
    </div>
  );
}

export default App;

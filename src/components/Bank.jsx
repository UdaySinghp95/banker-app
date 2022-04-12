import React, { useContext } from "react";
import Theme from "./Theme";
import "../styles/bank.css";
import { useParams } from "react-router-dom";
import _ from "lodash";
import MainStorage from "./../context/MainStorage";
import Loading from "./Loading";

function Bank(props) {
  const { ifsc } = useParams();
  const allBankList = useContext(MainStorage);

  const bank = _.find(allBankList, { ifsc });

  console.log(bank);
  return (
    <Theme className="mini_container">
      {allBankList.length != 0 && (
        <>
          <div className="card_container">
            {bank && (
              <>
                <h1 className="heading">{bank?.bank_name}</h1>
                <div className="ctn">
                  <div className="sub-container">
                    <h2>IFSC :</h2>
                    <p>{bank?.ifsc}</p>
                  </div>
                  <div className="sub-container ">
                    <h2>Bank ID:</h2>
                    <p>{bank?.bank_id}</p>
                  </div>
                </div>
                <div className="ctn">
                  <div className="sub-container">
                    <h2>Branch :</h2>
                    <p>{bank?.branch}</p>
                  </div>
                  <div className="sub-container ">
                    <h2>City:</h2>
                    <p>{bank?.city}</p>
                  </div>
                </div>
                <div className="ctn">
                  <div className="sub-container">
                    <h2> District :</h2>
                    <p>{bank?.district}</p>
                  </div>
                  <div className="sub-container ">
                    <h2>state:</h2>
                    <p>{bank?.state.toLowerCase()}</p>
                  </div>
                </div>

                <h2 className="no_padding">Address:</h2>
                <p className="no_padding">{bank?.address.toLowerCase()}</p>
              </>
            )}
            {bank ? (
              <></>
            ) : (
              <h1 className="error_message">
                Bank Details Not Found , on given IFSC
              </h1>
            )}
            {bank ? <></> : <h1 className="error_message">(︶︿︶)</h1>}
          </div>
        </>
      )}
      {allBankList.length == 0 && <Loading />}
    </Theme>
  );
}

export default Bank;

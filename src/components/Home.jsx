import "../App.css";
import Button from "./Button";
import { useContext, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import Theme from "./Theme";
import MainStorage from "./../context/MainStorage";
import Loading from "./Loading";

const tableHeader = ["Bank", "IFSC", "Branch", "Bank ID", "Address"];

function Home() {
  const allBankList = useContext(MainStorage);

  const [row, setRow] = useState(5);
  const [finalRow, setFinalRow] = useState(5);
  const [favouriteList, setFavoriteList] = useState([]);
  const [markAll, setMarkAll] = useState(false);
  const [page, setPage] = useState(1);
  const ref = useRef();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchBank, setSearchBank] = useState([]);
  const [option, setOption] = useState("all");
  const [bankList, setBankList] = useState(allBankList);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalRow(row);
    console.log(ref.current?.scrollIntoView);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheck = (userId) => {
    setFavoriteList(markItem([...favouriteList], userId));
  };

  const findBank = () => {
    if (!(city && category && search)) return;

    const banks = _.filter(
      bankList,
      (bank) =>
        bank.city == city &&
        (typeof bank[category] == "string"
          ? bank[category].includes(search.toUpperCase())
          : "" + bank[category] == search)
    );

    console.log("banks are", banks);
    setSearchBank(banks);
  };

  useEffect(findBank, [search, category, city]);

  useEffect(() => setBankList(allBankList), []);

  useEffect(() => {
    if (option == "all") setBankList(allBankList);
    else setBankList(favouriteList);
  }, [option, favouriteList, allBankList]);

  return (
    <Theme>
      {allBankList.length != 0 && (
        <>
          <div className="content__nav">
            <div className="left__button">
              <Button
                onClick={() => {
                  setOption("all");
                  setBankList([...allBankList]);
                }}
                className={option == "all" && "active"}
              >
                All Banks
              </Button>
              <Button
                onClick={() => {
                  setOption("favourite");
                  setBankList([...favouriteList]);
                }}
                className={option == "favourite" && "active"}
              >
                Favourite
              </Button>
            </div>

            <div className="right__button">
              <Button className={search && !city && "require"}>
                {city ? city + "  ↓" : "Select City"}
                <div>
                  <p onClick={() => setCity("MUMBAI")}>Mumbai</p>
                  <p onClick={() => setCity("BANGLORE")}>Banglore</p>
                  <p onClick={() => setCity("GOA")}>Goa</p>
                  <p onClick={() => setCity("DELHI")}>Delhi</p>
                  <p onClick={() => setCity("JAIPUR")}>Jaipur</p>
                </div>
              </Button>
              <Button className={search && !category && "require"}>
                {category ? category + "  ↓" : "Select Category"}
                <div>
                  <p onClick={() => setCategory("ifsc")}>IFSC</p>
                  <p onClick={() => setCategory("branch")}>Branch Name</p>
                  <p onClick={() => setCategory("bank_name")}>Bank Name</p>
                  <p onClick={() => setCategory("bank_id")}>Bank ID</p>
                  <p onClick={() => setCategory("address")}>Address</p>
                </div>
              </Button>

              <input
                type="text"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here"
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <td>
                  <div
                    onClick={() => {
                      if (markAll || option == "favourite") {
                        setFavoriteList([]);
                        setMarkAll(false);
                      } else {
                        setFavoriteList(allBankList);
                        setMarkAll(!markAll);
                      }
                    }}
                  >
                    <span
                      className={
                        markAll ||
                        (favouriteList.length != 0 && option == "favourite")
                          ? "mark_favourite"
                          : "favourite"
                      }
                    />
                  </div>
                </td>
                {tableHeader.map((h, index) => (
                  <th key={index}>
                    <div>{h}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {(!(city && category && search) ? bankList : searchBank)
                .slice(finalRow * (page - 1), finalRow * page)
                .map((b, index) => (
                  <tr key={index}>
                    <td>
                      <div onClick={() => handleCheck(b)}>
                        <span
                          className={
                            favouriteList.indexOf(b) != -1
                              ? "mark_favourite"
                              : "favourite"
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <Link to={{ pathname: `/bank-details/${b.ifsc}` }}>
                        <div>{b.bank_name}</div>
                      </Link>
                    </td>
                    <td>
                      <Link to={{ pathname: `/bank-details/${b.ifsc}` }}>
                        <div>{b.ifsc}</div>
                      </Link>
                    </td>
                    <td>
                      <Link to={{ pathname: `/bank-details/${b.ifsc}` }}>
                        <div>{b.branch}</div>
                      </Link>
                    </td>
                    <td>
                      <Link to={{ pathname: `/bank-details/${b.ifsc}` }}>
                        <div>{b.bank_id}</div>
                      </Link>
                    </td>
                    <td>
                      <Link to={{ pathname: `/bank-details/${b.ifsc}` }}>
                        <div>{b.address}</div>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination">
            <p>Row per Row</p>
            <form action="" onSubmit={handleSubmit}>
              <input
                className="Row"
                type="number"
                value={row}
                onChange={(e) => setRow(e.target.value)}
              />
            </form>

            <p>
              {(page - 1) * finalRow} - {page * finalRow} of {bankList.length}
            </p>
            <p
              onClick={() => setPage(Math.max(page - 1, 1))}
              className="page_arrow"
            >
              ←
            </p>
            <p onClick={() => setPage(page + 1)} className="page_arrow">
              →
            </p>
          </div>
        </>
      )}

      {allBankList.length == 0 && <Loading />}
    </Theme>
  );
}

export default Home;

const markItem = (userList, id) => {
  const index = userList.indexOf(id);

  if (userList.indexOf(id) == -1) userList.push(id);
  else {
    const temp = userList[userList.length - 1];
    userList[userList.length - 1] = userList[index];
    userList[index] = temp;
    userList.pop();
  }

  return userList;
};

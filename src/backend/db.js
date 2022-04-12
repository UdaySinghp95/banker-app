import axios from "axios";

async function fetchAllBank(setAllBank) {
  let list = [];

  const cityList = ["Mumbai", "Goa", "Banglore", "Delhi", "Jaipur"];

  for (let c in cityList) {
    const { data } = await axios.get(
      `https://vast-shore-74260.herokuapp.com/banks?city=${cityList[
        c
      ].toUpperCase()}`
    );

    list = [...list, ...data];
    setAllBank(list);
    console.log(data.length, list.length);
  }
}

export default fetchAllBank;

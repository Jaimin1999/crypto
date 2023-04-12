import "./App.css";
import { useState, useEffect } from "react";

import CrypCard from "./components/CrypCard";
import Axios from "axios";

import { Pagination } from "@mui/material";

import ReactPaginate from "react-paginate";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);

  const [searchWord, setSearchWord] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        console.log(response.data);
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const [ic, setIc] = useState(true);

  var t = 1;

  if (ic) {
    t = t * 82.12;
  } else {
    t = 1;
  }

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLocaleLowerCase());
  });

  return (
    <div className="App">
      <div className="crypto-header">
        <h1>Crypto Info</h1>
        <button onClick={() => setIc(!ic)}>
          <p>{ic ? "₹" : "$"}</p>
        </button>
      </div>
      <div className="input">
        <input
          tabIndex={0}
          className="search"
          type="text"
          placeholder="Search Coins"
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        {searchWord.length !== 0 ? (
          <button onClick={() => setSearchWord("")}>
            <p>X</p>
          </button>
        ) : null}
      </div>

      <div className="crypto-display">
        {filteredCoins
          // .slice((page - 1) * 10, (page - 1) * 10 + 10)
          .map((coin, id) => {
            return (
              <CrypCard
                key={id}
                name={coin.name}
                price={(Math.round(coin.price * t * 100) / 100).toFixed(2)}
                symbol={coin.symbol}
                icon={coin.icon}
                ic={ic}
              />
            );
          })}
      </div>
      {/* <Pagination
        color="primary"
        size="larger"
        className="pagination"
        count={(filteredCoins?.length / 10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 10);
        }}
      /> */}
    </div>
  );
}
export default App;

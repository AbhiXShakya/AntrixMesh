import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CryptoBanner.css";
import Coin from "../Coin/Coin";

function CryptoBanner() {
  const [coins, setcoins] = useState([]);

  useEffect(() => {
    const coinlist = [
      "bitcoin",
      "ethereum",
      "dogecoin",
      "cardano",
      "binancecoin",
      "polkadot",
      "cardano",
      "tether",
      "solana",
      "terra",
      "kodi",
      "xrp",
      "uniswap",
      "avalanche",
      "chainlink",
      "cosmos",
      "filecoin",
    ];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinlist.join(
          "%2C%20"
        )}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setcoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="cryptobanner-container"></div>
      <div className="cryptobanner">
        <div className="cryptobanner-coins">
          <div className="crypto-coins">
            {[...Array(100)].map(() =>
              coins.map((coins) => {
                return (
                  <Coin
                    key={coins.id}
                    symbol={coins.symbol}
                    price={coins.current_price}
                    image={coins.image}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CryptoBanner;

import "./Coin.css";

const Coin = ({ symbol, price, image }) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{symbol.toUpperCase()}:</h1>
          <p className="coin-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;

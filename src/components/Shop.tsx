import frogs from "../frogs.json";

const Shop = ({ buyFrog }) => {
  return (
    <div>
      <h2>Frog Shop</h2>
      <ul>
        {Object.entries(frogs).map(([frogName, frogData]) => (
          <li key={frogName}>
            <div>
              <button onClick={() => buyFrog(frogData.Cost)}>
                Buy {frogName}
              </button>{" "}
              Croaks Per Second: {frogs[frogName].CroaksPerSecond}, Cost{" "}
              {frogs[frogName].Cost} Croaks
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;

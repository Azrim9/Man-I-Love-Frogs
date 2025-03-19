import frogs from "../frogs.json";

const Shop = ({ buyFrog }) => {
  return (
    <div>
      <h2>Frog Shop</h2>
      <ul>
        {Object.entries(frogs).map(([frogName, frogData]) => (
          <li key={frogName}>
            <div className="flex gap-2">
              <button onClick={() => buyFrog(frogData.Cost)}>
                Buy {frogName}
              </button>
              <div>Croaks Per Second: {frogs[frogName].CroaksPerSecond}, </div>
              <div>Cost {frogs[frogName].Cost} Croaks, </div>{" "}
              <div>Description: {frogs[frogName].Description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;

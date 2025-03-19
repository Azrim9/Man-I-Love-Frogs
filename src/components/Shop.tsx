import frogs from "../frogs.json";
import { useEffect, useState } from "react";

const Shop = ({ buyFrog }) => {
  const [frogsList, setFrogsList] = useState([]);

  useEffect(() => {
    setFrogsList(Object.entries(frogs));
  }, []);

  const handleBuyFrog = (frogName, cost) => {
    buyFrog(frogName, cost);
    setFrogsList((prev) => prev.filter(([name]) => name !== frogName));
  };

  return (
    <div>
      <h2>Frog Shop</h2>
      <ul>
        {frogsList.map(([frogName, frogData]) => (
          <li key={frogName}>
            <div className="flex gap-2">
              <button onClick={() => handleBuyFrog(frogName, frogData.Cost)}>
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

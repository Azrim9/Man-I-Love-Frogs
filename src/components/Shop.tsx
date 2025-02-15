import frogs from "../frogs.json";

const Shop = () => {
  return (
    <div>
      <h2>Frog Shop</h2>
      <ul>
        {Object.keys(frogs).map((frogName) => (
          <li key={frogName}>
            <div>
              {frogName}, Croaks Per Second: {frogs[frogName].CroaksPerSecond},
              Cost {frogs[frogName].Cost} Croaks
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;

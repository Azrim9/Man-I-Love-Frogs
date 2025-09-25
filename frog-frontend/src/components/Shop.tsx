const Shop = ({ frogsList, buyFrog }) => {
  return (
    <div>
      <h2>Frog Shop</h2>
      <ul>
        {frogsList.map(([frogName, frogData]) => (
          <li key={frogName}>
            <div className="flex gap-2">
              <button onClick={() => buyFrog(frogName, frogData.Cost)}>
                Buy {frogName}
              </button>
              <div>Croaks Per Second: {frogData.CroaksPerSecond}, </div>
              <div>Cost {frogData.Cost} Croaks, </div>{" "}
              <div>Description: {frogData.Description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;

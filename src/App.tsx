import { useState, useEffect } from "react";
import Shop from "./components/Shop";

const useStickyState = (defaultValue, name) => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return defaultValue;
    }

    const persistedValue = window.localStorage.getItem(name);

    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);
  return [value, setValue];
};

function App() {
  const [ribbitCount, setRibbitCount] = useStickyState(0, "count");
  const [ownedFrogs, setOwnedFrogs] = useState([]);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <div className="h-screen bg-green-100">
      <div className="h-screen flex flex-col justify-between p-2">
        <div> Croak Points: {ribbitCount}</div>
        <button
          className="border px-4 py-1 rounded-sm self-center bg-green-500 hover:bg-green-400 active:scale-95"
          onClick={() => {
            setRibbitCount(ribbitCount + 1);
          }}
        >
          Croak
        </button>
        <button onClick={() => setIsShopOpen(!isShopOpen)}>
          {isShopOpen ? "Close Shop" : "Open Shop"}
        </button>
        {isShopOpen && <Shop />}
      </div>
    </div>
  );
}

export default App;

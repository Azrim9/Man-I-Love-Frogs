import { useState, useEffect } from "react";
import Shop from "./components/Shop";
import useStickyState from "./hooks/useStickyState";

function App() {
  const [ribbitCount, setRibbitCount] = useStickyState(0, "count");
  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRibbitCount((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const buyFrog = (name, cost) => {
    if (ribbitCount >= cost) {
      setRibbitCount((prev) => prev - cost);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-green-400 via-green-200 to-blue-600">
      <div className="h-screen flex flex-col justify-between p-2">
        <div> Croak Points: {ribbitCount}</div>
        <button
          className="border px-4 py-1 rounded-sm self-center bg-green-500 hover:bg-green-400 fixed"
          onClick={() => {
            setRibbitCount(ribbitCount + 1);
          }}
        >
          Croak
        </button>

        <button
          className="border px-4 py-1 rounded-sm self-center bg-green-500 hover:bg-green-400 fixed bottom-1 right-2"
          onClick={() => setIsShopOpen(!isShopOpen)}
        >
          {isShopOpen ? "Close Shop" : "Open Shop"}
        </button>
        {isShopOpen && <Shop buyFrog={buyFrog} />}
      </div>
    </div>
  );
}

export default App;

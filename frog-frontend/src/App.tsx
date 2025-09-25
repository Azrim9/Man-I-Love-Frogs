import { useState, useEffect } from "react";
import Shop from "./components/Shop";
import useStickyState from "./hooks/useStickyState";
import frogs from "./frogs.json";
import AnimatedFrog from "./components/AnimatedFrog";

function App() {
  const [userName, setUserName] = useState("Player");
  const [ribbitCount, setRibbitCount] = useStickyState(0, "count");
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [buyableFrogsList, setBuyableFrogsList] = useStickyState(
    Object.entries(frogs),
    "frogs"
  );
  const [ownedFrogs, setOwnedFrogs] = useStickyState([], "ownedFrogs");

  useEffect(() => {
    fetch(`http://localhost:4000/load/${userName}`)
      .then((res) => {
        if (!res.ok) throw new Error("No saved game found");
        return res.json();
      })
      .then((data) => {
        setRibbitCount(data.ribbitCount);
        setOwnedFrogs(data.ownedFrogs);
        const ownedNames = data.ownedFrogs.map((f) => f[0]);
        setBuyableFrogsList((prev) =>
          prev.filter(([name]) => !ownedNames.includes(name))
        );
      })
      .catch((err) => console.log("Loading game failed:", err));
  }, [userName]);

  const saveGame = () => {
    fetch("http://localhost:4000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, ribbitCount, ownedFrogs }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Game saved:", data))
      .catch((err) => console.log("Save failed", err));
  };

  useEffect(() => {
    const interval = setInterval(saveGame, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let totalCPS = 0;

    const recalc = () => {
      let sum = 0;
      for (let i = 0; i < ownedFrogs.length; i++) {
        let frogData = ownedFrogs[i][1];
        sum = sum + frogData.CroaksPerSecond;
      }
      totalCPS = sum;
    };

    recalc();

    const tickInterval = setInterval(() => {
      setRibbitCount((prev) => prev + totalCPS / 10);
    }, 100);

    const recalcInterval = setInterval(recalc, 5000);

    return () => {
      clearInterval(tickInterval);
      clearInterval(recalcInterval);
    };
  }, [ownedFrogs]);

  const buyFrog = (frogName, cost) => {
    const frog = buyableFrogsList.find(([name]) => name === frogName);
    const frogData = frog[1];

    if (ribbitCount >= cost) {
      setRibbitCount((prev) => prev - cost);
      setBuyableFrogsList((prev) => prev.filter(([name]) => name !== frogName));
      setOwnedFrogs((prev) => [
        ...prev,
        [frogName, { CroaksPerSecond: frogData.CroaksPerSecond }],
      ]);
    }
    saveGame();
  };

  return (
    <div className="h-screen bg-gradient-to-b from-green-400 via-green-200 to-blue-600">
      <div className="flex flex-col justify-between">
        <div className="bg-gray-500/10 flex relative w-screen h-60 overflow-hidden">
          {ownedFrogs.map(([frogName]) => (
            <AnimatedFrog key={frogName} frogName={frogName} />
          ))}
        </div>
        <div className="p-2"> Croak Points: {ribbitCount.toFixed(1)}</div>
        <button
          className="border px-4 py-1 rounded-sm self-center bottom-1 bg-green-500 hover:bg-green-400 fixed"
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
        {isShopOpen && <Shop frogsList={buyableFrogsList} buyFrog={buyFrog} />}
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Shop from "./components/Shop";
import useStickyState from "./hooks/useStickyState";
import frogs from "./frogs.json";
import AnimatedFrog from "./components/AnimatedFrog";
import useLoadGame from "./hooks/useLoadGame";
import useAutoSaveGame from "./hooks/useAutoSaveGame";
import useRibbitTickRate from "./hooks/useRibbitTickRate";
import { saveGame } from "./utils/gameAction";

function App() {
  const [userName, setUserName] = useState("Player");
  const [ribbitCount, setRibbitCount] = useStickyState(0, "count");
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [buyableFrogsList, setBuyableFrogsList] = useStickyState(
    Object.entries(frogs),
    "frogs"
  );
  const [ownedFrogs, setOwnedFrogs] = useStickyState([], "ownedFrogs");
  const [floaters, setFloaters] = useState([]);

  const handleBackgroundClick = (e) => {
    setRibbitCount((prev) => prev + 1);

    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;

    setFloaters((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 1000);
  };

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
    saveGame({ userName, ribbitCount, ownedFrogs });
  };

  useLoadGame(userName, setRibbitCount, setOwnedFrogs, setBuyableFrogsList);
  useAutoSaveGame(() => saveGame({ userName, ribbitCount, ownedFrogs }));
  useRibbitTickRate(ownedFrogs, setRibbitCount);

  return (
    <div
      className="h-screen bg-gradient-to-b from-green-400 via-green-200 to-blue-600"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col justify-between">
        <div className="bg-gray-500/10 flex relative w-screen h-60 overflow-hidden">
          {ownedFrogs.map(([frogName]) => (
            <AnimatedFrog key={frogName} frogName={frogName} />
          ))}
        </div>
        <div className="p-2"> Croak Points: {ribbitCount.toFixed(1)}</div>

        {floaters.map((f) => (
          <div
            key={f.id}
            className="absolute pointer-events-none text-black font-bold animate-floater"
            style={{ left: f.x, top: f.y }}
          >
            +1
          </div>
        ))}

        <button
          className="border px-4 py-1 rounded-sm self-center bg-green-500 hover:bg-green-400 fixed bottom-1 right-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsShopOpen(!isShopOpen);
          }}
        >
          {isShopOpen ? "Close Shop" : "Open Shop"}
        </button>
        {isShopOpen && <Shop frogsList={buyableFrogsList} buyFrog={buyFrog} />}
      </div>
    </div>
  );
}

export default App;

import { useEffect } from "react";

function useLoadGame(
  userName,
  setRibbitCount,
  setOwnedFrogs,
  setBuyableFrogsList
) {
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
}

export default useLoadGame;

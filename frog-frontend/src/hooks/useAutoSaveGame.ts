import { useEffect } from "react";

function useAutoSaveGame(saveGame) {
  useEffect(() => {
    const interval = setInterval(saveGame, 45000);
    return () => clearInterval(interval);
  }, []);
}
export default useAutoSaveGame;

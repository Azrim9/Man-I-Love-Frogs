import { useEffect } from "react";

function useRibbitTickRate(ownedFrogs, setRibbitCount) {
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
}

export default useRibbitTickRate;

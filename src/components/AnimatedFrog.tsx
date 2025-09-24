import { useEffect, useState } from "react";
import Tadpole from "../frogArt/tadpole.png";

export default function AnimatedFrog() {
  const [left, setLeft] = useState(-144);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeft((prev) => {
        if (prev > window.innerWidth) return -144;
        else return prev + 2;
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      style={{ imageRendering: "pixelated", position: "absolute", left }}
      src={Tadpole}
      className="size-36"
    />
  );
}

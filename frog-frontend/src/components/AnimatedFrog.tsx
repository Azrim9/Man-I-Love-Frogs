import { useEffect, useState } from "react";
import Tadpole from "../frogArt/tadpole.png";
import Ribbert from "../frogArt/ribbert.png";
import Froguan from "../frogArt/froguan.png";

const frogImages = {
  Tadpole: Tadpole,
  Ribbert: Ribbert,
  Froguan: Froguan,
};

function AnimatedFrog({ frogName }) {
  const [left, setLeft] = useState(-144);
  const [speed, setSpeed] = useState(3 + Math.random() * 3);
  const [top, setTop] = useState(Math.random() * 40);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), Math.random() * 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setLeft((prev) => {
        if (prev > window.innerWidth) return -144;
        else return prev + speed;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [visible, speed]);

  return (
    <img
      style={{ imageRendering: "pixelated", position: "absolute", left, top }}
      src={frogImages[frogName]}
      className="size-36"
    />
  );
}

export default AnimatedFrog;

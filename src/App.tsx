import { useState } from "react";

function App() {
  const [ribbitCount, setRibbitCount] = useState(0);

  return <div className="border">Croak Points: {ribbitCount}</div>;
}

export default App;

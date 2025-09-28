export const saveGame = ({ userName, ribbitCount, ownedFrogs }) => {
  fetch("http://localhost:4000/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, ribbitCount, ownedFrogs }),
  })
    .then((res) => res.json())
    .then((data) => console.log("Game saved:", data))
    .catch((err) => console.log("Save failed", err));
};

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Create or open SQLite DB
const db = new sqlite3.Database("game.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database.");
});

// Create table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS gamestate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT UNIQUE,
    ribbitCount REAL,
    ownedFrogs TEXT
  )`
);

// Save game state endpoint
app.post("/save", (req, res) => {
  const { userName, ribbitCount, ownedFrogs } = req.body;
  const ownedFrogsStr = JSON.stringify(ownedFrogs);

  db.run(
    `INSERT INTO gamestate (userName, ribbitCount, ownedFrogs) 
    VALUES (?, ?, ?)
    ON CONFLICT(userName)
    DO UPDATE SET ribbitCount = excluded.ribbitCount,
                    ownedFrogs = excluded.ownedFrogs`,
    [userName, ribbitCount, ownedFrogsStr],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        success: true,
        userName,
        ribbitCount,
        ownedFrogs,
      });
    }
  );
});

// Load latest game state for user
app.get("/load/:userName", (req, res) => {
  const { userName } = req.params;
  db.get(
    `SELECT * FROM gamestate WHERE userName = ?`,
    [userName],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: "No saved game" });
      row.ownedFrogs = JSON.parse(row.ownedFrogs);
      res.json(row);
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

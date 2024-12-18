const express = require("express");
const cors = require("cors");
const {
  addPlayer,
  getPlayers,
  updatePlayerRating,
  getPlayerById,
} = require("./data");
const { calculateElo } = require("./elo");

const app = express();
app.use(cors());
app.use(express.json());

// Add a new player
app.post("/api/players", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const player = addPlayer(name);
  res.json(player);
});

// Get all players
app.get("/api/players", (req, res) => {
  res.json(getPlayers());
});

// Record a match result
// Expect body: { winnerId, loserId }
app.post("/api/matches", (req, res) => {
  const { winnerId, loserId } = req.body;

  const winner = getPlayerById(winnerId);
  const loser = getPlayerById(loserId);

  if (!winner || !loser) {
    return res.status(400).json({ error: "Invalid player IDs" });
  }

  const { winner: newWinnerRating, loser: newLoserRating } = calculateElo(
    winner.rating,
    loser.rating
  );

  updatePlayerRating(winnerId, newWinnerRating);
  updatePlayerRating(loserId, newLoserRating);

  res.json({
    winner: { ...winner, rating: newWinnerRating },
    loser: { ...loser, rating: newLoserRating },
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

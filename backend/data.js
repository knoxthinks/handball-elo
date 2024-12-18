let players = [
  // Example: { id: 1, name: "John", rating: 1200 }
];

let nextPlayerId = 1;

function addPlayer(name, rating = 1200) {
  const player = { id: nextPlayerId++, name, rating };
  players.push(player);
  return player;
}

function getPlayers() {
  return players;
}

function updatePlayerRating(id, newRating) {
  const player = players.find((p) => p.id === id);
  if (player) {
    player.rating = newRating;
  }
}

function getPlayerById(id) {
  return players.find((p) => p.id === id);
}

module.exports = {
  addPlayer,
  getPlayers,
  updatePlayerRating,
  getPlayerById,
};

function expectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function calculateElo(ratingWinner, ratingLoser, k = 32) {
  const expectedWinner = expectedScore(ratingWinner, ratingLoser);
  const expectedLoser = expectedScore(ratingLoser, ratingWinner);

  const newWinnerRating = ratingWinner + k * (1 - expectedWinner);
  const newLoserRating = ratingLoser + k * (0 - expectedLoser);

  return {
    winner: Math.round(newWinnerRating),
    loser: Math.round(newLoserRating),
  };
}

module.exports = {
  calculateElo,
};

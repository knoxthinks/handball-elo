import React from "react";

function PlayerList({ players }) {
  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map((p) => (
          <li key={p.id}>
            {p.name} - Rating: {p.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;

import React, { useState } from "react";

function RecordMatchForm({ players, onRecordMatch }) {
  const [winnerId, setWinnerId] = useState("");
  const [loserId, setLoserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (winnerId && loserId && winnerId !== loserId) {
      onRecordMatch(Number(winnerId), Number(loserId));
      setWinnerId("");
      setLoserId("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <h3>Record Match Result</h3>
      <div>
        <label>Winner: </label>
        <select value={winnerId} onChange={(e) => setWinnerId(e.target.value)}>
          <option value="">Select Winner</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Loser: </label>
        <select value={loserId} onChange={(e) => setLoserId(e.target.value)}>
          <option value="">Select Loser</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Record Match</button>
    </form>
  );
}

export default RecordMatchForm;

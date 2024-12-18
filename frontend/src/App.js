import React, { useEffect, useState } from "react";
import PlayerList from "./components/PlayerList";
import AddPlayerForm from "./components/AddPlayerForm";
import RecordMatchForm from "./components/RecordMatchForm";

function App() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const res = await fetch("http://localhost:5000/api/players");
    const data = await res.json();
    setPlayers(data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const addPlayer = async (name) => {
    const res = await fetch("http://localhost:5000/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setPlayers((prev) => [...prev, data]);
  };

  const recordMatch = async (winnerId, loserId) => {
    const res = await fetch("http://localhost:5000/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ winnerId, loserId }),
    });
    await res.json();
    // Refresh the player list to get updated ratings
    fetchPlayers();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Handball ELO System</h1>
      <AddPlayerForm onAddPlayer={addPlayer} />
      <PlayerList players={players} />
      <RecordMatchForm players={players} onRecordMatch={recordMatch} />
    </div>
  );
}

export default App;

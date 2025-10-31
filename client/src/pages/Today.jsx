import { useEffect, useState } from "react";
import api from "../api";

export default function Today() {
  const [mood, setMood] = useState(null);

  useEffect(() => {
    api.get("/moodboards/today").then(res => setMood(res.data));
  }, []);

  if (!mood) return <h2>No mood yet today</h2>;

  return (
    <div>
      <h2>Today's Mood</h2>
      <h1>{mood.emojis.join(" ")}</h1>
      {mood.imageUrl && <img src={mood.imageUrl} width="200"/>}
      <div style={{ background:mood.color, padding:10 }}>{mood.note}</div>
    </div>
  );
}

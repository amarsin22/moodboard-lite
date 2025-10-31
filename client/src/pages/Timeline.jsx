import { useEffect, useState } from "react";
import api from "../api";

export default function Timeline() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/moodboards").then(res => setList(res.data));
  }, []);

  return (
    <div>
      <h2>Mood Timeline</h2>
      {list.map(m => (
        <div key={m._id} style={{ border:"1px solid #ddd", padding:10, marginBottom:10 }}>
          <strong>{m.date}</strong>
          <div style={{ fontSize:28 }}>{m.emojis.join(" ")}</div>
          {m.imageUrl && <img src={m.imageUrl} width="150"/>}
          <div style={{ background:m.color, padding:8 }}>{m.note}</div>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import api from "../api";

export default function CreateMood() {
  const [emojis, setEmojis] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [note, setNote] = useState("");

  const toggleEmoji = (emoji) => {
    setEmojis((prev) =>
      prev.includes(emoji)
        ? prev.filter((e) => e !== emoji)
        : [...prev, emoji]
    );
  };

  const submitMood = async () => {
    if (emojis.length === 0) return alert("Please select at least one emoji!");

    try {
      await api.post("/moodboards", { emojis, imageUrl, color, note });
      alert("Mood saved!");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving mood");
    }
  };

  const presetColors = [
    "#ff6b6b",
    "#ffa94d",
    "#feca57",
    "#48dbfb",
    "#1dd1a1",
    "#5f27cd",
    "#576574",
    "#222f3e"
  ];

  return (
    <div className="card">
      <h2>Create Mood</h2>

      {/* Emoji Selector */}
      <div className="emoji-box">
        {["😊","🔥","😐","😢","❤️","🤯","😎","💡"].map((e) => (
          <span
            key={e}
            className={`emoji ${emojis.includes(e) ? "selected" : ""}`}
            onClick={() => toggleEmoji(e)}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Image/GIF URL */}
      <input
        placeholder="Image or GIF URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {/* Color Selection */}
      <h4 style={{ marginBottom:"6px", marginTop:"10px" }}>Select a color</h4>

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px", flexWrap:"wrap" }}>
        {presetColors.map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            style={{
              width:"32px",
              height:"32px",
              borderRadius:"50%",
              background:c,
              cursor:"pointer",
              border: color === c ? "3px solid black" : "2px solid white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
            }}
          />
        ))}
      </div>

      <label style={{ fontSize:"14px" }}>or pick a custom color</label>
      <input 
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width:"100%", height:"45px", cursor:"pointer", marginBottom:"12px" }}
      />

      {/* Color Preview */}
      <div style={{
        height:"35px",
        background:color,
        borderRadius:"8px",
        border:"1px solid #ccc",
        marginBottom:"12px"
      }} />

      {/* Note */}
      <textarea
        placeholder="Write a short note (max 200 chars)"
        maxLength={200}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* Submit Button */}
      <button onClick={submitMood}>Save Mood</button>
    </div>
  );
}

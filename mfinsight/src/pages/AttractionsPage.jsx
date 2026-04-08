import { useState } from "react";
import { attractions } from "../data/mockData.js";

const catColors = {
  "Historical Monument": "#7c3aed",
  "Beach & Nature": "#0891b2",
  "Nature & Water": "#059669",
  "Mountain & Adventure": "#d97706",
  "Heritage & Culture": "#c2410c",
  "Spiritual & Cultural": "#9d174d"
};

export default function AttractionsPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", ...new Set(attractions.map(a => a.category))];

  const filtered = attractions.filter(a => {
    const q = search.toLowerCase();
    return (a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q)) &&
      (filterCat === "All" || a.category === filterCat);
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)", padding: "48px 48px 40px" }}>
        <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 800, margin: "0 0 8px" }}>Explore Tourist Attractions</h1>
        <p style={{ color: "#bfdbfe", margin: "0 0 24px", fontSize: 15 }}>Discover amazing places and create unforgettable memories</p>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search attractions..." style={{ border: "none", outline: "none", flex: 1, fontSize: 15 }} />
          </div>
          <button style={{ background: "#4f46e5", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "12px 20px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>⚙️ Filters</button>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCat(c)} style={{
              background: filterCat === c ? "#fff" : "rgba(255,255,255,0.15)",
              color: filterCat === c ? "#1d4ed8" : "#fff",
              border: "none", padding: "6px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 500
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px 48px" }}>
        <h2 style={{ margin: "0 0 24px", color: "#0f172a", fontSize: 18, fontWeight: 700 }}>
          {filtered.length} Attractions Found
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {filtered.map(a => <AttractionCard key={a.id} item={a} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
            <p>No attractions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AttractionCard({ item }) {
  const color = catColors[item.category] || "#475569";
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 210, objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: color, color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{item.category}</div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>⭐ {item.rating}</div>
      </div>
      <div style={{ padding: 18 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{item.name}</h3>
        <p style={{ margin: "0 0 10px", color: "#64748b", fontSize: 13 }}>📍 {item.location}</p>
        <p style={{ margin: "0 0 14px", color: "#475569", fontSize: 13, lineHeight: 1.6 }}>{item.description}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { icon: "🕐", label: "Duration", value: item.duration },
            { icon: "💰", label: "Entry Fee", value: item.entryFee === 0 ? "Free" : `₹${item.entryFee}` },
            { icon: "📅", label: "Best Time", value: item.bestTime },
          ].map(d => (
            <div key={d.label} style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.icon} {d.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{d.value}</div>
            </div>
          ))}
          <button style={{ background: color, color: "#fff", border: "none", borderRadius: 8, padding: "8px 10px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { guides } from "../data/mockData.js";

export default function GuidesPage() {
  const [search, setSearch] = useState("");

  const filtered = guides.filter(g => {
    const q = search.toLowerCase();
    return g.name.toLowerCase().includes(q) || g.location.toLowerCase().includes(q) || g.specialty.toLowerCase().includes(q);
  });

  const byLocation = filtered.reduce((acc, g) => {
    const loc = g.location.split(",")[1]?.trim() || g.location;
    if (!acc[loc]) acc[loc] = [];
    acc[loc].push(g);
    return acc;
  }, {});

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "48px 48px 40px" }}>
        <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 800, margin: "0 0 8px" }}>Expert Local Guides</h1>
        <p style={{ color: "#c4b5fd", margin: "0 0 24px", fontSize: 15 }}>Connect with experienced guides for personalized travel experiences</p>
        <div style={{ background: "#fff", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", maxWidth: 500 }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search guides by name, location or specialty..." style={{ border: "none", outline: "none", flex: 1, fontSize: 15 }} />
        </div>
      </div>

      <div style={{ padding: "32px 48px" }}>
        {Object.entries(byLocation).map(([loc, guideList]) => (
          <div key={loc} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 18 }}>📍</span>
              <h2 style={{ margin: 0, color: "#0f172a", fontSize: 18, fontWeight: 700 }}>{loc}</h2>
              <span style={{ background: "#f0f0ff", color: "#7c3aed", fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 12 }}>{guideList.length} guide{guideList.length > 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {guideList.map(g => <GuideCard key={g.id} item={g} />)}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👤</div>
            <p>No guides found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function GuideCard({ item }) {
  const [requested, setRequested] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "top" }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{item.location}</div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>⭐ {item.rating}</div>
      </div>
      <div style={{ padding: 18 }}>
        <h3 style={{ margin: "0 0 2px", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{item.name}</h3>
        <p style={{ margin: "0 0 14px", color: "#7c3aed", fontSize: 13, fontWeight: 600 }}>{item.specialty}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#475569" }}>👤 {item.experience} years experience</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#475569" }}>🌐 {item.languages.slice(0, 3).join(", ")}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>₹{item.rate}/hour</span>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {item.services.slice(0, 2).map(s => (
            <span key={s} style={{ background: "#faf5ff", color: "#7c3aed", fontSize: 11, padding: "3px 8px", borderRadius: 12 }}>{s}</span>
          ))}
          {item.services.length > 2 && (
            <span style={{ background: "#faf5ff", color: "#7c3aed", fontSize: 11, padding: "3px 8px", borderRadius: 12 }}>+{item.services.length - 2} more</span>
          )}
        </div>
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#64748b", fontSize: 12 }}>{item.reviews} reviews</span>
          <button onClick={() => setRequested(r => !r)} style={{
            background: requested ? "#7c3aed" : "none",
            border: "1px solid #7c3aed", color: requested ? "#fff" : "#7c3aed",
            padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "all 0.2s"
          }}>
            {requested ? "✓ Requested" : "Book Guide →"}
          </button>
        </div>
      </div>
    </div>
  );
}

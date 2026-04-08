import { useState } from "react";
import { homestays } from "../data/mockData.js";

export default function HomestaysPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const types = ["All", "Cottage", "Villa", "Heritage Home", "Houseboat", "Bungalow", "Glamping"];

  const filtered = homestays
    .filter(h => {
      const q = search.toLowerCase();
      return (h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)) &&
        (filterType === "All" || h.type === filterType);
    })
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : sortBy === "price_asc" ? a.price - b.price : b.price - a.price);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #065f46 0%, #047857 100%)", padding: "48px 48px 40px" }}>
        <h1 style={{ color: "#fff", fontSize: 34, fontWeight: 800, margin: "0 0 8px" }}>Discover Homestays</h1>
        <p style={{ color: "#a7f3d0", margin: "0 0 24px", fontSize: 15 }}>Find the perfect accommodation for your travel experience</p>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or location..."
              style={{ border: "none", outline: "none", flex: 1, fontSize: 15, color: "#0f172a" }}
            />
          </div>
          <button onClick={() => setShowFilters(f => !f)} style={{
            background: showFilters ? "#fff" : "#10b981", color: showFilters ? "#065f46" : "#fff",
            border: "2px solid #fff", padding: "12px 20px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14
          }}>
            ⚙️ Filters
          </button>
        </div>
        {showFilters && (
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 16, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#a7f3d0", fontSize: 12, marginBottom: 8, fontWeight: 600 }}>TYPE</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {types.map(t => (
                  <button key={t} onClick={() => setFilterType(t)} style={{
                    background: filterType === t ? "#fff" : "rgba(255,255,255,0.15)",
                    color: filterType === t ? "#065f46" : "#fff",
                    border: "none", padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 500
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#a7f3d0", fontSize: 12, marginBottom: 8, fontWeight: 600 }}>SORT BY</div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
                padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13
              }}>
                <option value="rating" style={{ color: "#000" }}>Highest Rated</option>
                <option value="price_asc" style={{ color: "#000" }}>Price: Low to High</option>
                <option value="price_desc" style={{ color: "#000" }}>Price: High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "32px 48px" }}>
        <h2 style={{ margin: "0 0 24px", color: "#0f172a", fontSize: 18, fontWeight: 700 }}>
          {filtered.length} Homestay{filtered.length !== 1 ? "s" : ""} Available
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {filtered.map(h => <HomestayCard key={h.id} item={h} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 80, color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
            <p style={{ fontSize: 16 }}>No homestays found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HomestayCard({ item }) {
  const [saved, setSaved] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 210, objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 20 }}>
          {item.availability}
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
          ⭐ {item.rating}
        </div>
        <button onClick={() => setSaved(s => !s)} style={{
          position: "absolute", top: 10, left: 10, background: saved ? "#ef4444" : "rgba(255,255,255,0.9)",
          border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>{saved ? "❤️" : "🤍"}</button>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ background: "#f0f9ff", color: "#0369a1", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, display: "inline-block", marginBottom: 6 }}>{item.type}</div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{item.name}</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>📍 {item.location}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: 18 }}>₹{item.price.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>/night</div>
          </div>
        </div>
        <p style={{ margin: "12px 0", color: "#475569", fontSize: 13, lineHeight: 1.5 }}>{item.description}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {item.amenities.slice(0, 4).map(a => (
            <span key={a} style={{ background: "#f0fdf4", color: "#166534", fontSize: 11, padding: "3px 8px", borderRadius: 12 }}>{a}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>👤 {item.guests} guests · 🛏️ {item.bedrooms} beds</div>
          <button style={{
            background: "linear-gradient(135deg, #065f46, #047857)", color: "#fff",
            border: "none", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600
          }}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

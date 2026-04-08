import { useState } from "react";
import { homestays, bookings } from "../data/mockData.js";

const tabs = ["Overview", "My Listings", "Bookings", "Reviews"];

export default function HostPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #14532d 0%, #166534 100%)", padding: "40px 48px" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Host Dashboard</h1>
        <p style={{ color: "#bbf7d0", margin: 0, fontSize: 15 }}>List homestays, manage bookings, and interact with guests</p>
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none", padding: "16px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            color: activeTab === t ? "#16a34a" : "#64748b",
            borderBottom: activeTab === t ? "2px solid #16a34a" : "2px solid transparent"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 48px" }}>
        {activeTab === "Overview" && <HostOverview />}
        {activeTab === "My Listings" && <HostListings />}
        {activeTab === "Bookings" && <HostBookings />}
        {activeTab === "Reviews" && <HostReviews />}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, badge, color }) {
  const bgMap = { green: "#f0fdf4", blue: "#f0f9ff", purple: "#faf5ff", yellow: "#fefce8", pink: "#fdf2f8", teal: "#f0fdfa" };
  const iconMap = { green: "#16a34a", blue: "#0369a1", purple: "#7c3aed", yellow: "#d97706", pink: "#be185d", teal: "#0d9488" };
  return (
    <div style={{ background: bgMap[color] || "#fff", borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        {badge && <span style={{ fontSize: 12, fontWeight: 600, color: iconMap[color] }}>{badge}</span>}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", margin: "12px 0 4px" }}>{value}</div>
      <div style={{ fontSize: 14, color: "#64748b" }}>{label}</div>
    </div>
  );
}

function HostOverview() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <StatCard icon="🏡" value="3" label="Active Listings" color="blue" />
        <StatCard icon="📅" value="12" label="Active Bookings" badge="This month" color="green" />
        <StatCard icon="💰" value="₹125k" label="Total Revenue" badge="+25% growth" color="purple" />
        <StatCard icon="⭐" value="4.8" label="Average Rating" color="yellow" />
        <StatCard icon="💬" value="87" label="Total Reviews" color="pink" />
        <StatCard icon="👥" value="98%" label="Response Rate" color="teal" />
      </div>

      <div style={{ marginTop: 32, background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Upcoming Guest Check-ins</h3>
        {bookings.filter(b => b.status === "CONFIRMED").slice(0, 3).map(b => (
          <div key={b.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f1f5f9", alignItems: "center" }}>
            <img src={b.image} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{b.customer}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{b.property} · Check-in: {b.checkIn}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, color: "#16a34a" }}>₹{b.total.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{b.guests} guests</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HostListings() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>My Properties</h3>
        <button style={{ background: "#16a34a", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>+ Add New Listing</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {homestays.slice(0, 3).map(h => (
          <div key={h.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ position: "relative" }}>
              <img src={h.image} alt={h.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <span style={{ position: "absolute", top: 10, right: 10, background: "#16a34a", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Active</span>
            </div>
            <div style={{ padding: 16 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>{h.name}</h4>
              <p style={{ margin: "0 0 12px", color: "#64748b", fontSize: 13 }}>📍 {h.location}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>₹{h.price.toLocaleString()}/night</span>
                <span>⭐ {h.rating} ({h.reviews})</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button style={{ flex: 1, background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", padding: "7px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Edit</button>
                <button style={{ flex: 1, background: "#f0f9ff", color: "#0369a1", border: "1px solid #bae6fd", padding: "7px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Calendar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HostBookings() {
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700 }}>All Bookings</h3>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        {bookings.map((b, i) => (
          <div key={b.id} style={{ display: "flex", gap: 16, padding: 20, borderBottom: i < bookings.length - 1 ? "1px solid #f1f5f9" : "none", alignItems: "center" }}>
            <img src={b.image} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{b.property}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>👤 {b.customer} · {b.checkIn} → {b.checkOut}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>ID: {b.id} · {b.guests} guests</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a" }}>₹{b.total.toLocaleString()}</div>
              <StatusBadge status={b.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HostReviews() {
  const reviews = [
    { author: "Sarah Johnson", rating: 5, comment: "Absolutely stunning retreat!", date: "2026-02-15" },
    { author: "James Wilson", rating: 4, comment: "Loved the heritage architecture.", date: "2026-01-25" },
    { author: "Michael Brown", rating: 5, comment: "Most unique experience of my life!", date: "2026-01-15" },
  ];
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700 }}>Guest Reviews</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontWeight: 700 }}>{r.author}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{r.date}</div>
            </div>
            <div style={{ margin: "6px 0", color: "#f59e0b" }}>{"⭐".repeat(r.rating)}</div>
            <p style={{ margin: 0, color: "#475569", fontSize: 14 }}>{r.comment}</p>
            <button style={{ marginTop: 12, background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>Reply →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { CONFIRMED: ["#f0fdf4", "#166534"], PENDING: ["#fffbeb", "#92400e"], COMPLETED: ["#f0f9ff", "#1e40af"], CANCELLED: ["#fef2f2", "#991b1b"] };
  const [bg, color] = map[status] || ["#f8fafc", "#475569"];
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12, display: "inline-block", marginTop: 4 }}>{status}</span>;
}

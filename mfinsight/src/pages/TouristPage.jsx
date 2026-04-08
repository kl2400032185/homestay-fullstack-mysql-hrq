import { useState } from "react";
import { bookings, homestays, attractions } from "../data/mockData.js";

const tabs = ["My Bookings", "Wishlist", "My Reviews", "Trip Planner", "Settings"];

export default function TouristPage() {
  const [activeTab, setActiveTab] = useState("My Bookings");
  const [wishlist, setWishlist] = useState([1, 3]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>My Travel Dashboard</h1>
          <p style={{ color: "#bfdbfe", margin: 0, fontSize: 15 }}>Manage your bookings, trips, and travel preferences</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>455</div>
          <div style={{ color: "#bfdbfe", fontSize: 14 }}>Reward Points</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 48px", display: "flex", gap: 32 }}>
        {[
          { icon: "📅", value: 3, label: "Total Bookings" },
          { icon: "📍", value: 2, label: "Upcoming" },
          { icon: "❤️", value: wishlist.length, label: "Wishlist" },
          { icon: "⭐", value: 2, label: "Reviews" },
          { icon: "💳", value: "₹46K", label: "Total Spent" },
          { icon: "📸", value: 24, label: "Photos" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#0f172a" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            color: activeTab === t ? "#1d4ed8" : "#64748b",
            borderBottom: activeTab === t ? "2px solid #1d4ed8" : "2px solid transparent"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 48px" }}>
        {activeTab === "My Bookings" && <MyBookings />}
        {activeTab === "Wishlist" && <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {activeTab === "My Reviews" && <MyReviews />}
        {activeTab === "Trip Planner" && <TripPlanner />}
        {activeTab === "Settings" && <TouristSettings />}
      </div>
    </div>
  );
}

function MyBookings() {
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>Upcoming Bookings</h3>
      {bookings.filter(b => b.status !== "CANCELLED" && b.status !== "COMPLETED").map(b => (
        <div key={b.id} style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "center" }}>
          <img src={b.image} alt="" style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>{b.property}</h4>
              <span style={{ background: b.status === "CONFIRMED" ? "#f0fdf4" : "#fffbeb", color: b.status === "CONFIRMED" ? "#166534" : "#92400e", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>{b.status}</span>
            </div>
            <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: 13 }}>📍 {b.location}</p>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#475569" }}>
              <span>Check-in: <b>{b.checkIn}</b></span>
              <span>Check-out: <b>{b.checkOut}</b></span>
              <span>Guests: <b>{b.guests}</b></span>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>Total: ₹{b.total.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ background: "#1d4ed8", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>View Details</button>
            <button style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Message Host</button>
            <button style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>↓ Invoice</button>
          </div>
        </div>
      ))}
      <h3 style={{ margin: "28px 0 16px", fontWeight: 700, fontSize: 18 }}>Past Bookings</h3>
      {bookings.filter(b => b.status === "COMPLETED" || b.status === "CANCELLED").map(b => (
        <div key={b.id} style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "center", opacity: 0.8 }}>
          <img src={b.image} alt="" style={{ width: 70, height: 70, borderRadius: 10, objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>{b.property}</h4>
            <p style={{ margin: "0 0 6px", color: "#64748b", fontSize: 13 }}>📍 {b.location}</p>
            <div style={{ fontSize: 13, color: "#475569" }}>{b.checkIn} → {b.checkOut} · <span style={{ fontWeight: 700 }}>₹{b.total.toLocaleString()}</span></div>
          </div>
          <span style={{ background: b.status === "COMPLETED" ? "#f0f9ff" : "#fef2f2", color: b.status === "COMPLETED" ? "#1e40af" : "#991b1b", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>{b.status}</span>
        </div>
      ))}
    </div>
  );
}

function Wishlist({ wishlist, toggleWishlist }) {
  const saved = homestays.filter(h => wishlist.includes(h.id));
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>My Wishlist ({saved.length})</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {saved.map(h => (
          <div key={h.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ position: "relative" }}>
              <img src={h.image} alt={h.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              <button onClick={() => toggleWishlist(h.id)} style={{ position: "absolute", top: 10, right: 10, background: "#ef4444", border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>❤️</button>
            </div>
            <div style={{ padding: 16 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>{h.name}</h4>
              <p style={{ margin: "0 0 10px", color: "#64748b", fontSize: 13 }}>📍 {h.location}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>₹{h.price.toLocaleString()}/night</span>
                <button style={{ background: "#1d4ed8", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
        {saved.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 60, color: "#94a3b8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>❤️</div>
            <p>No saved homestays yet. Explore and save your favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MyReviews() {
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>My Reviews</h3>
      {[
        { property: "Urban Heritage Home", rating: 4, comment: "Loved the heritage architecture and the central location.", date: "2026-01-25" },
        { property: "Cozy Mountain Retreat", rating: 5, comment: "Absolutely breathtaking views!", date: "2026-02-10" },
      ].map((r, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ margin: 0, fontWeight: 700 }}>{r.property}</h4>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{r.date}</span>
          </div>
          <div style={{ color: "#f59e0b", margin: "6px 0" }}>{"⭐".repeat(r.rating)}</div>
          <p style={{ margin: 0, color: "#475569", fontSize: 14 }}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

function TripPlanner() {
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>Trip Planner</h3>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <p style={{ color: "#64748b", marginBottom: 20 }}>Plan your upcoming trips with our smart trip planner!</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {["Destination", "Travel Dates", "Number of Guests", "Budget Range"].map(field => (
            <div key={field}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>{field}</label>
              <input placeholder={`Enter ${field.toLowerCase()}`} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <button style={{ background: "#1d4ed8", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
          Plan My Trip →
        </button>
      </div>
    </div>
  );
}

function TouristSettings() {
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>Account Settings</h3>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 20 }}>
        <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>Personal Information</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["Full Name", "Sarah Johnson"], ["Email", "sarah.j@example.com"], ["Phone", "+91 98765 43210"], ["Location", "Mumbai, Maharashtra"]].map(([label, val]) => (
            <div key={label}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>{label}</label>
              <input defaultValue={val} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <button style={{ marginTop: 16, background: "#1d4ed8", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Save Changes</button>
      </div>
    </div>
  );
}

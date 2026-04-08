import { useState } from "react";
import { bookings } from "../data/mockData.js";

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Total");

  const statusCounts = {
    Total: bookings.length,
    Pending: bookings.filter(b => b.status === "PENDING").length,
    Confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
    Completed: bookings.filter(b => b.status === "COMPLETED").length,
    Cancelled: bookings.filter(b => b.status === "CANCELLED").length,
  };

  const totalRevenue = bookings.filter(b => b.paid).reduce((s, b) => s + b.total, 0);

  const filtered = bookings.filter(b => {
    const matchSearch = b.property.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Total" || b.status === filter.toUpperCase();
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #0f4c3a 0%, #065f46 100%)", padding: "40px 48px" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Booking Management</h1>
        <p style={{ color: "#a7f3d0", margin: 0, fontSize: 15 }}>Manage all platform bookings and reservations</p>
      </div>

      {/* Status Cards */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 48px", display: "flex", gap: 16 }}>
        {[
          { label: "Total", icon: "📅", color: "#0f4c3a", bg: "#ecfdf5" },
          { label: "Pending", icon: "⏳", color: "#92400e", bg: "#fffbeb" },
          { label: "Confirmed", icon: "✅", color: "#166534", bg: "#f0fdf4" },
          { label: "Completed", icon: "🏁", color: "#1e40af", bg: "#eff6ff" },
          { label: "Cancelled", icon: "❌", color: "#991b1b", bg: "#fef2f2" },
          { label: "Revenue", icon: "💰", color: "#6d28d9", bg: "#faf5ff" },
        ].map((s) => {
          const val = s.label === "Revenue" ? `₹${(totalRevenue / 1000).toFixed(0)}K` : statusCounts[s.label] || 0;
          const active = filter === s.label;
          return (
            <button key={s.label} onClick={() => s.label !== "Revenue" && setFilter(s.label)} style={{
              flex: 1, background: active ? s.bg : "#f8fafc", border: `2px solid ${active ? s.color : "#e2e8f0"}`,
              borderRadius: 12, padding: "14px 12px", cursor: s.label === "Revenue" ? "default" : "pointer",
              textAlign: "center", transition: "all 0.15s"
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 22, color: active ? s.color : "#0f172a" }}>{val}</div>
              <div style={{ fontSize: 12, color: active ? s.color : "#64748b" }}>{s.label}</div>
            </button>
          );
        })}
      </div>

      <div style={{ padding: "24px 48px" }}>
        {/* Search & Filter Bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 16px", display: "flex", gap: 10, alignItems: "center", border: "1px solid #e2e8f0" }}>
            <span>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or customer name..." style={{ border: "none", outline: "none", flex: 1, fontSize: 14 }} />
          </div>
          <select style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "10px 16px", borderRadius: 10, fontSize: 14, cursor: "pointer" }}>
            <option>All Types</option>
            <option>Homestay</option>
            <option>Guide</option>
          </select>
          <button style={{ background: "#065f46", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
            ↓ Export Report
          </button>
        </div>

        {/* Bookings Count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>All Bookings</h3>
          <span style={{ color: "#64748b", fontSize: 14 }}>{filtered.length} results</span>
        </div>

        {/* Booking Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(b => <BookingCard key={b.id} booking={b} />)}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
              <p>No bookings found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking: b }) {
  const statusColors = {
    CONFIRMED: { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
    PENDING: { bg: "#fffbeb", color: "#92400e", border: "#fde68a" },
    COMPLETED: { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe" },
    CANCELLED: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
  };
  const s = statusColors[b.status] || {};
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <img src={b.image} alt="" style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{b.property}</h4>
                <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 12 }}>{b.status}</span>
                <span style={{ background: "#f0f9ff", color: "#0369a1", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 12 }}>{b.type}</span>
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Booking ID: {b.id}</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>📍 {b.location}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>₹{b.total.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: b.paid ? "#16a34a" : "#ef4444", fontWeight: 600 }}>{b.paid ? "✓ Paid" : "⚠ Unpaid"}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Customer</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>👤 {b.customer}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{b.email}</div>
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Booking Details</div>
              <div style={{ fontSize: 13 }}>Check-in: <b>{b.checkIn}</b> &nbsp; Check-out: <b>{b.checkOut}</b></div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Guests: <b>{b.guests}</b></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
        <button style={{ background: "#065f46", color: "#fff", border: "none", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>View Details</button>
        <button style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Contact Customer</button>
        {b.status === "CONFIRMED" && (
          <button style={{ background: "none", border: "1px solid #fecaca", color: "#ef4444", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Cancel</button>
        )}
        <button style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, marginLeft: "auto" }}>↓ Invoice</button>
      </div>
    </div>
  );
}

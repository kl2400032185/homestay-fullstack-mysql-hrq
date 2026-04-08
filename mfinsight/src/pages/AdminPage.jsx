import { useState } from "react";
import { homestays, attractions, guides, bookings } from "../data/mockData.js";

const tabs = ["Overview", "Homestays", "Attractions", "Guides"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #581c87 0%, #6d28d9 100%)", padding: "40px 48px" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Admin Dashboard</h1>
        <p style={{ color: "#e9d5ff", margin: 0, fontSize: 15 }}>Manage platform content, user interactions, and homestay listings</p>
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none", padding: "16px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            color: activeTab === t ? "#7c3aed" : "#64748b",
            borderBottom: activeTab === t ? "2px solid #7c3aed" : "2px solid transparent"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 48px" }}>
        {activeTab === "Overview" && <AdminOverview />}
        {activeTab === "Homestays" && <AdminHomestays />}
        {activeTab === "Attractions" && <AdminAttractions />}
        {activeTab === "Guides" && <AdminGuides />}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, badge, badgeColor }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "0 16px 0 80px", background: "rgba(99,102,241,0.05)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 28 }}>{icon}</div>
        {badge && <span style={{ fontSize: 12, fontWeight: 600, color: badgeColor || "#10b981" }}>{badge}</span>}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginTop: 12 }}>{value}</div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function AdminOverview() {
  const totalRevenue = bookings.reduce((s, b) => s + (b.paid ? b.total : 0), 0);
  const activeBookings = bookings.filter(b => b.status === "CONFIRMED").length;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        <StatCard icon="👥" value="1,247" label="Total Users" badge="+12% this month" />
        <StatCard icon="🏡" value={homestays.length} label="Active Homestays" badge={`+${homestays.length}`} />
        <StatCard icon="📍" value={attractions.length} label="Tourist Attractions" badge={`${attractions.length} listed`} badgeColor="#7c3aed" />
        <StatCard icon="👤" value={guides.length} label="Local Guides" badge="Verified" badgeColor="#f59e0b" />
        <StatCard icon="💰" value={`₹${(totalRevenue / 1000).toFixed(0)}k`} label="Total Revenue" badge="+18% growth" />
        <StatCard icon="📅" value={activeBookings} label="Active Bookings" badge="Live now" badgeColor="#ef4444" />
      </div>
      <RecentActivity />
    </div>
  );
}

function RecentActivity() {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Recent Platform Activity</h3>
      {[
        { action: "New booking confirmed", detail: "Sarah Johnson → Cozy Mountain Retreat", time: "2 min ago", type: "✅" },
        { action: "New user registered", detail: "rahul.mehta@example.com", time: "15 min ago", type: "👤" },
        { action: "Review submitted", detail: "Emily Chen rated Heritage Tour 5⭐", time: "1 hour ago", type: "⭐" },
        { action: "Homestay listed", detail: "Desert Safari Camp by Vikram Singh", time: "3 hours ago", type: "🏡" },
        { action: "Booking cancelled", detail: "Anna Smith → Beach Tour", time: "5 hours ago", type: "❌" },
      ].map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none", alignItems: "center" }}>
          <div style={{ width: 36, height: 36, background: "#f8fafc", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{a.type}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{a.action}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{a.detail}</div>
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>{a.time}</div>
        </div>
      ))}
    </div>
  );
}

function AdminHomestays() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>All Homestays</h3>
        <button style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>+ Add Homestay</button>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Property", "Location", "Type", "Price/Night", "Rating", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {homestays.map((h, i) => (
              <tr key={h.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <img src={h.image} alt={h.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{h.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{h.location}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{h.type}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: 14, color: "#0f172a" }}>₹{h.price.toLocaleString()}</td>
                <td style={{ padding: "14px 16px" }}>⭐ {h.rating}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "#f0fdf4", color: "#166534", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>Active</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Edit</button>
                    <button style={{ background: "none", border: "1px solid #fecaca", color: "#ef4444", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminAttractions() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>All Attractions</h3>
        <button style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>+ Add Attraction</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {attractions.map(a => (
          <div key={a.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <img src={a.image} alt={a.name} style={{ width: "100%", height: 120, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{a.name}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>{a.location}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12 }}>⭐ {a.rating}</span>
                <button style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "3px 8px", borderRadius: 6, cursor: "pointer", fontSize: 11 }}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminGuides() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" }}>All Guides</h3>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Guide", "Specialty", "Location", "Rating", "Reviews", "Rate", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guides.map(g => (
              <tr key={g.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <img src={g.image} alt={g.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{g.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#7c3aed" }}>{g.specialty}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{g.location}</td>
                <td style={{ padding: "14px 16px" }}>⭐ {g.rating}</td>
                <td style={{ padding: "14px 16px", fontSize: 13 }}>{g.reviews}</td>
                <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: 13 }}>₹{g.rate}/hr</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "#faf5ff", color: "#7c3aed", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>Verified</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState } from "react";

const tabs = ["Overview", "Bookings", "Schedule", "Earnings", "Reviews"];

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #92400e 0%, #b45309 100%)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Guide Dashboard</h1>
          <p style={{ color: "#fde68a", margin: 0, fontSize: 15 }}>Manage your tours, bookings, and guide services</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>⭐</span>
            <span style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>4.9</span>
          </div>
          <div style={{ color: "#fde68a", fontSize: 13 }}>Average Rating</div>
        </div>
      </div>

      {/* Quick stats row */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 48px", display: "flex", gap: 32 }}>
        {[
          { icon: "📅", value: "156", label: "Total Tours" },
          { icon: "✅", value: "8", label: "Active" },
          { icon: "💰", value: "₹235K", label: "Total Earnings" },
          { icon: "📈", value: "₹45K", label: "This Month" },
          { icon: "⭐", value: "234", label: "Reviews" },
          { icon: "🏆", value: "98%", label: "Complete" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#0f172a" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            color: activeTab === t ? "#b45309" : "#64748b",
            borderBottom: activeTab === t ? "2px solid #b45309" : "2px solid transparent"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 48px" }}>
        {activeTab === "Overview" && <GuideOverview />}
        {activeTab === "Bookings" && <GuideBookings />}
        {activeTab === "Schedule" && <GuideSchedule />}
        {activeTab === "Earnings" && <GuideEarnings />}
        {activeTab === "Reviews" && <GuideReviews />}
      </div>
    </div>
  );
}

function GuideOverview() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
        {[
          { icon: "📅", value: "3", label: "Upcoming Tours", badge: "This Week", bg: "#eff6ff", color: "#1d4ed8" },
          { icon: "💰", value: "₹45K", label: "Monthly Earnings", badge: "+15% vs last month", bg: "#f0fdf4", color: "#16a34a" },
          { icon: "🕐", value: "< 2 hours", label: "Avg Response Time", badge: "Excellent", bg: "#faf5ff", color: "#7c3aed" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: 16, padding: 24, border: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.badge}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "10px 0 4px" }}>{s.value}</div>
            <div style={{ fontSize: 14, color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>My Services</h3>
          {[
            { name: "Heritage Monument Tours", price: "₹500/hr", bookings: 45, rating: 4.9 },
            { name: "Cultural Experiences", price: "₹400/hr", bookings: 38, rating: 4.8 },
            { name: "Food Tours", price: "₹350/hr", bookings: 32, rating: 4.7 },
            { name: "Photography Tours", price: "₹600/hr", bookings: 28, rating: 5.0 },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{s.bookings} bookings</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: "#b45309" }}>{s.price}</div>
                <div style={{ fontSize: 12 }}>⭐ {s.rating}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Upcoming Tours</h3>
          {[
            { client: "Sarah Johnson", tour: "Taj Mahal Heritage Tour", date: "2026-03-18", time: "9:00 AM", guests: 2 },
            { client: "Emily Chen", tour: "Old Delhi Food Walk", date: "2026-03-20", time: "11:00 AM", guests: 4 },
            { client: "James Wilson", tour: "Agra Fort + Taj", date: "2026-03-22", time: "8:00 AM", guests: 3 },
          ].map((t, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.tour}</div>
              <div style={{ fontSize: 13, color: "#475569", marginTop: 2 }}>👤 {t.client} · {t.guests} guests</div>
              <div style={{ fontSize: 12, color: "#b45309", fontWeight: 600, marginTop: 2 }}>📅 {t.date} at {t.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuideBookings() {
  const bookings = [
    { client: "Sarah Johnson", tour: "Heritage Monument Tour", date: "2026-03-18", status: "CONFIRMED", total: 2000 },
    { client: "Emily Chen", tour: "Old Delhi Food Walk", date: "2026-03-20", status: "CONFIRMED", total: 1400 },
    { client: "Rahul Mehta", tour: "Sunset Photography Tour", date: "2026-03-25", status: "PENDING", total: 1800 },
    { client: "James Wilson", tour: "Full Day Agra Tour", date: "2026-02-15", status: "COMPLETED", total: 3000 },
  ];
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>All Tour Bookings</h3>
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["Client", "Tour", "Date", "Total", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 20px", fontWeight: 600, fontSize: 14 }}>{b.client}</td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "#475569" }}>{b.tour}</td>
                <td style={{ padding: "14px 20px", fontSize: 13 }}>{b.date}</td>
                <td style={{ padding: "14px 20px", fontWeight: 700, color: "#b45309" }}>₹{b.total.toLocaleString()}</td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{
                    background: b.status === "CONFIRMED" ? "#f0fdf4" : b.status === "PENDING" ? "#fffbeb" : "#f0f9ff",
                    color: b.status === "CONFIRMED" ? "#166534" : b.status === "PENDING" ? "#92400e" : "#1e40af",
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12
                  }}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GuideSchedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const schedule = { "Mon": ["9:00 AM - Heritage Tour"], "Wed": ["11:00 AM - Food Walk", "3:00 PM - Photography Tour"], "Fri": ["8:00 AM - Full Day Agra"], "Sat": ["9:00 AM - Delhi Tour"], "Sun": [] };
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>Weekly Schedule</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
        {days.map(d => (
          <div key={d} style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", minHeight: 120 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: (schedule[d]?.length > 0) ? "#b45309" : "#94a3b8" }}>{d}</div>
            {(schedule[d] || []).map((t, i) => (
              <div key={i} style={{ background: "#fff7ed", color: "#92400e", fontSize: 11, padding: "4px 8px", borderRadius: 6, marginBottom: 6, borderLeft: "3px solid #f59e0b" }}>{t}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GuideEarnings() {
  const monthly = [
    { month: "Oct", amount: 32000 }, { month: "Nov", amount: 38000 }, { month: "Dec", amount: 52000 },
    { month: "Jan", amount: 41000 }, { month: "Feb", amount: 45000 }, { month: "Mar", amount: 48000 },
  ];
  const max = Math.max(...monthly.map(m => m.amount));
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>Earnings Overview</h3>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 24 }}>
        <h4 style={{ margin: "0 0 20px", fontWeight: 700, color: "#0f172a" }}>Monthly Earnings</h4>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 160 }}>
          {monthly.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 11, color: "#64748b" }}>₹{(m.amount / 1000).toFixed(0)}k</div>
              <div style={{ width: "100%", background: "#fef3c7", borderRadius: "4px 4px 0 0", height: (m.amount / max * 120) + "px", transition: "all 0.3s", position: "relative" }}>
                <div style={{ position: "absolute", bottom: 0, width: "100%", background: "#f59e0b", borderRadius: "4px 4px 0 0", height: "100%" }} />
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{m.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuideReviews() {
  const reviews = [
    { author: "Sarah Johnson", rating: 5, comment: "Ravi is an exceptional guide! His knowledge of history is outstanding.", date: "2026-02-15" },
    { author: "Emily Chen", rating: 5, comment: "Made our Agra trip truly memorable. Highly recommend!", date: "2026-02-08" },
    { author: "James Wilson", rating: 4, comment: "Very knowledgeable and friendly. Great experience overall.", date: "2026-01-25" },
  ];
  return (
    <div>
      <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 18 }}>Reviews from Travelers</h3>
      {reviews.map((r, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{r.author}</div>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{r.date}</span>
          </div>
          <div style={{ color: "#f59e0b", margin: "6px 0" }}>{"⭐".repeat(r.rating)}</div>
          <p style={{ margin: 0, color: "#475569", fontSize: 14, lineHeight: 1.6 }}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

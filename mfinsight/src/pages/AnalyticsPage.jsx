import { useState } from "react";

const tabs = ["Overview", "Traffic", "Revenue", "Users"];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [period, setPeriod] = useState("Month");

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #312e81 0%, #4f46e5 100%)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Analytics Dashboard</h1>
          <p style={{ color: "#c7d2fe", margin: 0, fontSize: 15 }}>Comprehensive platform insights and performance metrics</p>
        </div>
        <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 4 }}>
          {["Week", "Month", "Year"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              background: period === p ? "#fff" : "none", color: period === p ? "#4f46e5" : "#c7d2fe",
              border: "none", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Top KPIs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "24px 48px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {[
          { icon: "👥", value: "1,247", label: "Total Users", change: "+12%", up: true },
          { icon: "💰", value: "₹459K", label: "Total Revenue", change: "+18%", up: true },
          { icon: "👁️", value: "45.7K", label: "Page Views", change: "+8%", up: true },
          { icon: "🎯", value: "3.2%", label: "Conversion Rate", change: "-0.3%", up: false },
        ].map((k, i) => (
          <div key={i} style={{ borderRight: i < 3 ? "1px solid #f1f5f9" : "none", paddingRight: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{k.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: k.up ? "#16a34a" : "#ef4444" }}>↑ {k.change} vs last period</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{k.value}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            color: activeTab === t ? "#4f46e5" : "#64748b",
            borderBottom: activeTab === t ? "2px solid #4f46e5" : "2px solid transparent"
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 48px" }}>
        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Traffic" && <TrafficTab />}
        {activeTab === "Revenue" && <RevenueTab />}
        {activeTab === "Users" && <UsersTab />}
      </div>
    </div>
  );
}

function LineChart({ data, color = "#4f46e5", label }) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min;
  const H = 140, W = 100;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((d.value - min) / range) * (H - 20) - 10;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 24 }}>
      <h4 style={{ margin: "0 0 16px", fontWeight: 700, color: "#0f172a" }}>{label}</h4>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 160 }} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline fill={`url(#grad-${label})`} stroke="none" points={`0,${H} ${pts} ${W},${H}`} />
        <polyline fill="none" stroke={color} strokeWidth="2" points={pts} />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * W;
          const y = H - ((d.value - min) / range) * (H - 20) - 10;
          return <circle key={i} cx={x} cy={y} r="2.5" fill={color} />;
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {data.map((d, i) => <span key={i} style={{ fontSize: 11, color: "#94a3b8" }}>{d.label}</span>)}
      </div>
    </div>
  );
}

function OverviewTab() {
  const revenueData = [
    { label: "Aug", value: 38000 }, { label: "Sep", value: 40000 }, { label: "Oct", value: 44000 },
    { label: "Nov", value: 51000 }, { label: "Dec", value: 53000 }, { label: "Jan", value: 57000 },
    { label: "Feb", value: 63000 },
  ];
  return (
    <div>
      <LineChart data={revenueData} label="Revenue Overview" color="#4f46e5" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>Top Performing Homestays</h4>
          {[
            { name: "Luxury Beach Villa", revenue: 67500, bookings: 15 },
            { name: "Cozy Mountain Retreat", revenue: 52500, bookings: 21 },
            { name: "Desert Safari Camp", revenue: 42000, bookings: 12 },
            { name: "Urban Heritage Home", revenue: 36000, bookings: 20 },
          ].map((h, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{h.bookings} bookings</div>
              </div>
              <div style={{ fontWeight: 700, color: "#4f46e5" }}>₹{(h.revenue / 1000).toFixed(1)}K</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>Bookings by Status</h4>
          {[
            { label: "Confirmed", value: 45, pct: 75, color: "#16a34a" },
            { label: "Pending", value: 8, pct: 13, color: "#f59e0b" },
            { label: "Completed", value: 62, pct: 100, color: "#1d4ed8" },
            { label: "Cancelled", value: 5, pct: 8, color: "#ef4444" },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: 8, height: 8, overflow: "hidden" }}>
                <div style={{ background: s.color, height: "100%", width: s.pct + "%", borderRadius: 8 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrafficTab() {
  const trafficData = [
    { label: "Aug", value: 28000 }, { label: "Sep", value: 32000 }, { label: "Oct", value: 38000 },
    { label: "Nov", value: 42000 }, { label: "Dec", value: 40000 }, { label: "Jan", value: 44000 },
    { label: "Feb", value: 45700 },
  ];
  return (
    <div>
      <LineChart data={trafficData} label="Page Views Over Time" color="#0891b2" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[
          { source: "Direct", visits: 18280, pct: 40, color: "#4f46e5" },
          { source: "Search", visits: 13710, pct: 30, color: "#0891b2" },
          { source: "Social", visits: 9140, pct: 20, color: "#10b981" },
          { source: "Referral", visits: 4570, pct: 10, color: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: `conic-gradient(${s.color} ${s.pct * 3.6}deg, #f1f5f9 0)`, margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 700, fontSize: 18 }}>{s.pct}%</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{s.source}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.visits.toLocaleString()} visits</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueTab() {
  const data = [
    { label: "Aug", value: 38000 }, { label: "Sep", value: 40000 }, { label: "Oct", value: 44000 },
    { label: "Nov", value: 51000 }, { label: "Dec", value: 53000 }, { label: "Jan", value: 57000 },
    { label: "Feb", value: 63000 },
  ];
  return (
    <div>
      <LineChart data={data} label="Revenue Trend" color="#16a34a" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>Revenue by Type</h4>
          {[
            { type: "Homestay Bookings", amount: 321300, pct: 70 },
            { type: "Guide Bookings", amount: 91800, pct: 20 },
            { type: "Platform Fees", amount: 45900, pct: 10 },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{r.type}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>₹{(r.amount / 1000).toFixed(0)}K</span>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: 8, height: 8 }}>
                <div style={{ background: "#16a34a", height: "100%", width: r.pct + "%", borderRadius: 8 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>Financial Summary</h4>
          {[
            { label: "Total Revenue", value: "₹459K", color: "#16a34a" },
            { label: "Platform Commission", value: "₹45.9K", color: "#4f46e5" },
            { label: "Host Payouts", value: "₹321.3K", color: "#0891b2" },
            { label: "Guide Payouts", value: "₹91.8K", color: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
              <span style={{ fontSize: 14, color: "#475569" }}>{s.label}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 24 }}>
        {[
          { label: "Total Users", value: "1,247", icon: "👥" },
          { label: "New This Month", value: "+149", icon: "✨" },
          { label: "Active Users", value: "892", icon: "🟢" },
          { label: "Avg Session", value: "8.4 min", icon: "⏱️" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h4 style={{ margin: "0 0 16px", fontWeight: 700 }}>Users by Role</h4>
        {[
          { role: "Tourists", count: 982, pct: 79, color: "#1d4ed8" },
          { role: "Homestay Hosts", count: 128, pct: 10, color: "#16a34a" },
          { role: "Local Guides", count: 87, pct: 7, color: "#7c3aed" },
          { role: "Admins", count: 50, pct: 4, color: "#b45309" },
        ].map((u, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{u.role}</span>
              <span style={{ fontSize: 13, color: "#64748b" }}>{u.count} users ({u.pct}%)</span>
            </div>
            <div style={{ background: "#f1f5f9", borderRadius: 8, height: 10 }}>
              <div style={{ background: u.color, height: "100%", width: u.pct + "%", borderRadius: 8 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

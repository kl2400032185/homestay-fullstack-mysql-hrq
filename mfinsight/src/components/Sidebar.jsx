import { useState } from "react";

const navItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "homestays", label: "Homestays", icon: "🏡" },
  { id: "attractions", label: "Attractions", icon: "📍" },
  { id: "guides", label: "Guides", icon: "👤" },
];

const dashItems = [
  { id: "admin", label: "Admin", icon: "🛡️" },
  { id: "host", label: "Host", icon: "👤" },
  { id: "tourist", label: "Tourist", icon: "🧭" },
  { id: "guide", label: "Guide", icon: "🎯" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "bookings", label: "Bookings", icon: "📅" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
];

export default function Sidebar({ activePage, setActivePage, userEmail, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: collapsed ? 64 : 240,
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      transition: "width 0.3s ease", flexShrink: 0,
      position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: 12,
        justifyContent: collapsed ? "center" : "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setActivePage("home")}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0
          }}>🏡</div>
          {!collapsed && (
            <div>
              <div style={{ color: "#f8fafc", fontWeight: 700, fontSize: 15 }}>HomestayHub</div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>Explore & Stay</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16, padding: 4 }}>◀</button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16, padding: "8px", margin: "4px auto", display: "block" }}>▶</button>
      )}

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
        <div style={{ padding: collapsed ? "0 8px" : "0 12px" }}>
          {navItems.map(item => <NavItem key={item.id} item={item} activePage={activePage} setActivePage={setActivePage} collapsed={collapsed} />)}
        </div>
        <div style={{ marginTop: 16 }}>
          {!collapsed && (
            <div style={{ padding: "6px 20px", color: "#475569", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>DASHBOARDS</div>
          )}
          <div style={{ padding: collapsed ? "0 8px" : "0 12px" }}>
            {dashItems.map(item => <NavItem key={item.id} item={item} activePage={activePage} setActivePage={setActivePage} collapsed={collapsed} />)}
          </div>
        </div>
      </div>

      {/* User + Logout */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: collapsed ? "12px 8px" : "14px 16px" }}>
        {!collapsed ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                {userEmail ? userEmail[0].toUpperCase() : "U"}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userEmail || "User"}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Logged in</div>
              </div>
            </div>
            <button onClick={onLogout} style={{
              width: "100%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600
            }}>
              🚪 Sign Out
            </button>
          </div>
        ) : (
          <button onClick={onLogout} title="Sign Out" style={{
            width: "100%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171", padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 16
          }}>🚪</button>
        )}
      </div>
    </aside>
  );
}

function NavItem({ item, activePage, setActivePage, collapsed }) {
  const active = activePage === item.id;
  return (
    <button onClick={() => setActivePage(item.id)} title={collapsed ? item.label : ""} style={{
      display: "flex", alignItems: "center", gap: 10,
      width: "100%", padding: collapsed ? "10px" : "10px 12px",
      marginBottom: 2, borderRadius: 8, border: "none",
      background: active ? "rgba(59,130,246,0.15)" : "transparent",
      color: active ? "#60a5fa" : "#94a3b8",
      cursor: "pointer", textAlign: "left", fontSize: 14,
      fontWeight: active ? 600 : 400, transition: "all 0.15s ease",
      justifyContent: collapsed ? "center" : "flex-start",
      borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
    }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
      {!collapsed && item.label}
    </button>
  );
}
import { useState } from "react";
import { reviews } from "../data/mockData.js";

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");

  const stats = {
    total: reviews.length,
    avgRating: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
    approved: reviews.filter(r => r.status === "approved").length,
    pending: reviews.filter(r => r.status === "pending").length,
    flagged: reviews.filter(r => r.status === "flagged").length,
  };

  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: [342, 98, 42, 15, 8][5 - star],
    pct: [68, 19, 8, 3, 2][5 - star],
  }));

  const filtered = filter === "all" ? reviews : reviews.filter(r => r.status === filter);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #92400e 0%, #b45309 100%)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Reviews & Ratings Dashboard</h1>
          <p style={{ color: "#fde68a", margin: 0, fontSize: 15 }}>Manage and monitor all platform reviews</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 32 }}>⭐</span>
          <div>
            <div style={{ color: "#fff", fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{stats.avgRating}</div>
            <div style={{ color: "#fde68a", fontSize: 13 }}>Average Rating</div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 48px", display: "flex", gap: 24 }}>
        {[
          { icon: "💬", value: stats.total, label: "Total Reviews", color: "#1d4ed8" },
          { icon: "⭐", value: stats.avgRating, label: "Avg Rating", color: "#b45309" },
          { icon: "✅", value: stats.approved, label: "Approved", color: "#16a34a" },
          { icon: "⏳", value: stats.pending, label: "Pending", color: "#f59e0b" },
          { icon: "🚩", value: stats.flagged, label: "Flagged", color: "#ef4444" },
          { icon: "📊", value: "58%", label: "Response Rate", color: "#7c3aed" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 28 }}>
          {/* Left: Rating Distribution */}
          <div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 24 }}>
              <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>Rating Distribution</h3>
              {ratingDist.map(({ star, count, pct }) => (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20 }}>{star}</span>
                  <span style={{ fontSize: 16 }}>⭐</span>
                  <div style={{ flex: 1, background: "#f1f5f9", borderRadius: 8, height: 10, overflow: "hidden" }}>
                    <div style={{ background: "#f59e0b", height: "100%", width: pct + "%", borderRadius: 8 }} />
                  </div>
                  <span style={{ fontSize: 13, color: "#64748b", minWidth: 70, textAlign: "right" }}>{count} ({pct}%)</span>
                </div>
              ))}
            </div>

            {/* Filter Buttons */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h4 style={{ margin: "0 0 14px", fontWeight: 700, fontSize: 15 }}>Filter Reviews</h4>
              {[
                { key: "all", label: "All Reviews", count: stats.total },
                { key: "approved", label: "✅ Approved", count: stats.approved },
                { key: "pending", label: "⏳ Pending", count: stats.pending },
                { key: "flagged", label: "🚩 Flagged", count: stats.flagged },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  width: "100%", background: filter === f.key ? "#fff7ed" : "none",
                  border: filter === f.key ? "1px solid #fed7aa" : "1px solid transparent",
                  color: filter === f.key ? "#b45309" : "#475569",
                  padding: "10px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 6, fontWeight: 500, fontSize: 14
                }}>
                  <span>{f.label}</span>
                  <span style={{ background: "#f1f5f9", padding: "1px 8px", borderRadius: 12, fontSize: 12 }}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Review Cards */}
          <div>
            <h3 style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 18 }}>
              {filter === "all" ? "All Reviews" : filter.charAt(0).toUpperCase() + filter.slice(1) + " Reviews"}
            </h3>
            {filtered.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review: r }) {
  const [replied, setReplied] = useState(false);
  const statusColors = {
    approved: { bg: "#f0fdf4", color: "#166534" },
    pending: { bg: "#fffbeb", color: "#92400e" },
    flagged: { bg: "#fef2f2", color: "#991b1b" },
  };
  const s = statusColors[r.status] || {};
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: r.status === "flagged" ? "1px solid #fecaca" : "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <img src={r.avatar} alt={r.author} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{r.author}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{r.property}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12 }}>
                {r.status}
              </span>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>{r.date}</span>
            </div>
          </div>
          <div style={{ color: "#f59e0b", margin: "6px 0", fontSize: 15 }}>{"⭐".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
          <p style={{ margin: "0 0 12px", color: "#475569", fontSize: 14, lineHeight: 1.6 }}>{r.comment}</p>
          <div style={{ display: "flex", gap: 8 }}>
            {!replied && <button onClick={() => setReplied(true)} style={{ background: "none", border: "1px solid #e2e8f0", color: "#475569", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>Reply</button>}
            {replied && <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>✓ Reply sent</span>}
            {r.status === "pending" && (
              <button style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Approve</button>
            )}
            {r.status === "flagged" && (
              <button style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Remove</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

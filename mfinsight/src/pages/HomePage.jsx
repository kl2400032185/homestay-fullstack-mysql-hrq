import { useState, useEffect } from "react";

export default function HomePage({ setActivePage }) {
  const [homestays, setHomestays] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homestaysRes, attractionsRes, guidesRes] = await Promise.all([
          fetch('http://localhost:8080/api/homestays'),
          fetch('http://localhost:8080/api/attractions'),
          fetch('http://localhost:8080/api/guides')
        ]);
        const homestaysData = await homestaysRes.json();
        const attractionsData = await attractionsRes.json();
        const guidesData = await guidesRes.json();
        setHomestays(homestaysData);
        setAttractions(attractionsData);
        setGuides(guidesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  const featuredHomestays = homestays.slice(0, 3);
  const featuredAttractions = attractions.slice(0, 3);

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#f8fafc" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #1a237e 60%, #283593 100%)",
        padding: "60px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: 200, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", color: "#93c5fd", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, marginBottom: 16, letterSpacing: "0.05em" }}>
            🌟 DISCOVER INDIA
          </div>
          <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 800, lineHeight: 1.2, margin: "0 0 16px 0" }}>
            Authentic Homestays & Local Experiences
          </h1>
          <p style={{ color: "#93c5fd", fontSize: 16, lineHeight: 1.6, margin: "0 0 32px 0" }}>
            Connect with local hosts, explore stunning attractions, and get personalized guidance from expert local guides.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setActivePage("homestays")} style={{
              background: "#fff", color: "#1e3a5f", border: "none", padding: "14px 28px",
              borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 15,
              transition: "transform 0.15s", display: "flex", alignItems: "center", gap: 8
            }}>
              Explore Homestays →
            </button>
            <button onClick={() => setActivePage("attractions")} style={{
              background: "#3b82f6", color: "#fff", border: "none", padding: "14px 28px",
              borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 15
            }}>
              Discover Attractions →
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 48px", display: "flex", gap: 48 }}>
        {[
          { value: "1,247+", label: "Happy Travelers" },
          { value: homestays.length.toString(), label: "Active Homestays" },
          { value: attractions.length.toString(), label: "Tourist Attractions" },
          { value: guides.length.toString(), label: "Expert Guides" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1e293b" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "40px 48px" }}>
        {/* Featured Homestays */}
        <Section title="Featured Homestays" subtitle="Handpicked accommodations for your perfect stay" onViewAll={() => setActivePage("homestays")}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {featuredHomestays.map(h => (
              <HomestayCard key={h.id} item={h} />
            ))}
          </div>
        </Section>

        {/* Featured Attractions */}
        <Section title="Top Attractions" subtitle="Discover India's most iconic destinations" onViewAll={() => setActivePage("attractions")}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {featuredAttractions.map(a => (
              <AttractionCard key={a.id} item={a} />
            ))}
          </div>
        </Section>

        {/* Featured Guides */}
        <Section title="Expert Local Guides" subtitle="Knowledgeable guides to enhance your travel experience" onViewAll={() => setActivePage("guides")}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {guides.slice(0, 3).map(g => (
              <GuideCard key={g.id} item={g} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children, onViewAll }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{title}</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{subtitle}</p>
        </div>
        <button onClick={onViewAll} style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
          View All →
        </button>
      </div>
      {children}
    </div>
  );
}

function HomestayCard({ item }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 12, padding: "4px 10px", borderRadius: 20 }}>
          {item.availability}
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700, display: "flex", gap: 4, alignItems: "center" }}>
          ⭐ {item.rating}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{item.name}</h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>📍 {item.location}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: 16 }}>₹{item.price.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>/night</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.amenities.split(',').slice(0, 3).map(a => (
            <span key={a} style={{ background: "#f0f9ff", color: "#0369a1", fontSize: 11, padding: "3px 8px", borderRadius: 12 }}>{a.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttractionCard({ item }) {
  const catColors = { "Historical Monument": "#7c3aed", "Beach & Nature": "#0891b2", "Nature & Water": "#059669", "Mountain & Adventure": "#d97706", "Heritage & Culture": "#c2410c", "Spiritual & Cultural": "#9d174d" };
  const color = catColors[item.category] || "#475569";
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: color, color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>
          {item.category}
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700, display: "flex", gap: 4, alignItems: "center" }}>
          ⭐ {item.rating}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{item.name}</h3>
        <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: 13 }}>📍 {item.location}</p>
        <p style={{ margin: 0, color: "#475569", fontSize: 13, lineHeight: 1.5 }}>{item.description}</p>
        <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>🕐 {item.duration}</span>
          <span style={{ fontSize: 12, color: "#64748b" }}>💰 {item.entryFee === 0 ? "Free Entry" : `₹${item.entryFee}`}</span>
        </div>
      </div>
    </div>
  );
}

function GuideCard({ item }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>
          {item.location}
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "#fff", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
          ⭐ {item.rating}
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{item.name}</h3>
        <p style={{ margin: "0 0 10px", color: "#7c3aed", fontSize: 13, fontWeight: 500 }}>{item.specialty}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: "#475569" }}>👤 {item.experience} years experience</span>
          <span style={{ fontSize: 12, color: "#475569" }}>🌐 {item.languages.join(", ")}</span>
          <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>💵 ₹{item.rate}/hour</span>
        </div>
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#64748b", fontSize: 12 }}>{item.reviews} reviews</span>
          <button style={{ background: "none", border: "1px solid #7c3aed", color: "#7c3aed", padding: "4px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            View Profile →
          </button>
        </div>
      </div>
    </div>
  );
}

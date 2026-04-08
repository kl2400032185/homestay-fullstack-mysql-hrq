import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email) return setError("Please enter your email address.");
    if (!password) return setError("Please enter your password.");
    if (password !== "123") return setError("Incorrect password. Use demo password: 123");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin && onLogin(email);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 50%, #e8effe 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: 20,
    }}>
      {/* Background blobs */}
      <div style={{ position: "fixed", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -80, right: -80, width: 350, height: 350, borderRadius: "50%", background: "rgba(59,130,246,0.07)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 480, animation: "fadeIn 0.4s ease" }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes spin { to { transform: rotate(360deg); } }
          .login-input:focus { outline: none; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.12) !important; }
          .login-btn:hover { background: #2563eb !important; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59,130,246,0.35) !important; }
          .login-btn:active { transform: translateY(0); }
          .social-btn:hover { background: #f8fafc !important; border-color: #cbd5e1 !important; }
          .forgot-link:hover { color: #1d4ed8 !important; text-decoration: underline; }
        `}</style>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: 28,
            boxShadow: "0 8px 24px rgba(99,102,241,0.35)"
          }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Welcome Back</h1>
          <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>Sign in to HomestayHub</p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: "36px 40px",
          boxShadow: "0 4px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid rgba(255,255,255,0.8)"
        }}>

          {/* Error */}
          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b",
              borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 13,
              display: "flex", gap: 8, alignItems: "center"
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94a3b8" }}>✉️</span>
              <input
                type="email"
                className="login-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="you@example.com"
                style={{
                  width: "100%", padding: "12px 14px 12px 42px",
                  border: "1.5px solid #e2e8f0", borderRadius: 10,
                  fontSize: 15, color: "#0f172a", background: "#f8fafc",
                  transition: "all 0.2s", boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#94a3b8" }}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                className="login-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                style={{
                  width: "100%", padding: "12px 42px 12px 42px",
                  border: "1.5px solid #e2e8f0", borderRadius: 10,
                  fontSize: 15, color: "#0f172a", background: "#f8fafc",
                  transition: "all 0.2s", boxSizing: "border-box"
                }}
              />
              <button onClick={() => setShowPassword(s => !s)} style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#94a3b8", padding: 0
              }}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "#94a3b8" }}>
              Demo: Use password "123" to login
            </p>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, marginTop: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#475569" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: "#3b82f6", cursor: "pointer" }}
              />
              Remember me
            </label>
            <button className="forgot-link" style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: 0, transition: "color 0.15s" }}>
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "#93c5fd" : "#3b82f6",
              color: "#fff", border: "none", borderRadius: 12,
              fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s", boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            {loading ? (
              <>
                <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                Signing in...
              </>
            ) : "Sign in"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Or continue with</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Social Buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button className="social-btn" style={{
              padding: "11px", border: "1.5px solid #e2e8f0", borderRadius: 10,
              background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600,
              color: "#374151", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, transition: "all 0.2s"
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="social-btn" style={{
              padding: "11px", border: "1.5px solid #e2e8f0", borderRadius: 10,
              background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600,
              color: "#374151", display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, transition: "all 0.2s"
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="#1877F2">
                <path d="M18 9a9 9 0 10-10.406 8.892v-6.29H5.31V9h2.284V7.019c0-2.255 1.343-3.502 3.4-3.502.984 0 2.014.176 2.014.176v2.214h-1.134c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.602H10.41v6.29A9.003 9.003 0 0018 9z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#64748b" }}>
          Don't have an account?{" "}
          <button style={{ background: "none", border: "none", color: "#3b82f6", fontWeight: 700, cursor: "pointer", fontSize: 14, padding: 0 }}>
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
}

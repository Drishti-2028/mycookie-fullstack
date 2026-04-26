import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.brand}>My<span style={styles.italic}>Cookie</span></h2>
        <p style={styles.subtitle}>{isLogin ? "Welcome back 🍪" : "Create your account"}</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            style={styles.link}
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#1a1208",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Georgia, serif",
  },
  card: {
    backgroundColor: "#f5f0e8",
    padding: "48px 40px",
    borderRadius: "4px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },
  brand: {
    fontSize: "32px",
    fontWeight: "400",
    color: "#1a1208",
    marginBottom: "8px",
  },
  italic: {
    fontStyle: "italic",
    color: "#c9a84c",
  },
  subtitle: {
    color: "#666",
    marginBottom: "24px",
    fontSize: "14px",
    letterSpacing: "1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #d0c9b8",
    borderRadius: "2px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#1a1208",
    outline: "none",
    letterSpacing: "0.5px",
  },
  button: {
    padding: "14px",
    backgroundColor: "#1a1208",
    color: "#f5f0e8",
    border: "none",
    borderRadius: "2px",
    fontSize: "13px",
    letterSpacing: "2px",
    cursor: "pointer",
    textTransform: "uppercase",
    marginTop: "8px",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "12px",
  },
  toggle: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#666",
  },
  link: {
    color: "#c9a84c",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
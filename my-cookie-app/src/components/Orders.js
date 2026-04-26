import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }

      try {
        const res = await fetch("http://localhost:5000/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <p style={styles.loading}>Loading your orders...</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>My Orders</h2>

      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p>You haven't placed any orders yet 🍪</p>
          <button style={styles.btn} onClick={() => navigate("/menu")}>
            Browse Menu
          </button>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.orderId}>Order #{order._id.slice(-6).toUpperCase()}</span>
              <span style={{
                ...styles.badge,
                backgroundColor: order.paymentStatus === "paid" ? "#e6f4ea" : "#fff3e0",
                color: order.paymentStatus === "paid" ? "#2e7d32" : "#e65100",
              }}>
                {order.paymentStatus === "paid" ? "✓ Paid" : "Pending"}
              </span>
            </div>

            <p style={styles.meta}>📍 {order.address}</p>
            <p style={styles.meta}>📅 {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "long", year: "numeric"
            })}</p>

            <div style={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} style={styles.item}>
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div style={styles.total}>
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>

            <div style={styles.statusRow}>
              <span style={styles.statusLabel}>Status:</span>
              <span style={styles.status}>{order.status}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "700px",
    margin: "60px auto",
    padding: "0 24px",
    fontFamily: "Georgia, serif",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "400",
    color: "#1a1208",
    marginBottom: "32px",
    letterSpacing: "1px",
  },
  loading: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Georgia, serif",
    color: "#666",
  },
  empty: {
    textAlign: "center",
    padding: "60px 0",
    color: "#666",
  },
  btn: {
    marginTop: "16px",
    padding: "12px 32px",
    backgroundColor: "#1a1208",
    color: "#f5f0e8",
    border: "none",
    borderRadius: "2px",
    fontSize: "13px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#f5f0e8",
    borderRadius: "4px",
    padding: "24px",
    marginBottom: "20px",
    border: "1px solid #e0d8c8",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  orderId: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1208",
    letterSpacing: "1px",
  },
  badge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
  meta: {
    fontSize: "13px",
    color: "#666",
    margin: "4px 0",
  },
  items: {
    marginTop: "16px",
    borderTop: "1px solid #e0d8c8",
    paddingTop: "12px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#1a1208",
    padding: "6px 0",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "500",
    fontSize: "15px",
    borderTop: "1px solid #e0d8c8",
    marginTop: "8px",
    paddingTop: "12px",
    color: "#1a1208",
  },
  statusRow: {
    marginTop: "12px",
    fontSize: "13px",
  },
  statusLabel: {
    color: "#666",
    marginRight: "8px",
  },
  status: {
    color: "#c9a84c",
    textTransform: "capitalize",
    letterSpacing: "1px",
  },
};
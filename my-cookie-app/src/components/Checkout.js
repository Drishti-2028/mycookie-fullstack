import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ cart, setCart }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          .then(res => res.json())
          .then(data => setAddress(data.display_name));
      });
    } else {
      alert("Location not supported by your browser");
    }
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const placeOrder = async () => {
    setError("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!address.trim()) return setError("Please enter your address.");
    if (cart.length === 0) return setError("Your cart is empty.");

    setLoading(true);
    try {
      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Razorpay failed to load.");

      // Step 2: Create Razorpay order on backend
      const payRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const payData = await payRes.json();
      if (!payData.success) throw new Error("Payment initiation failed.");

      // Step 3: Save order to MongoDB
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          items: cart,
          total,
          razorpayOrderId: payData.razorpayOrderId,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error("Order creation failed.");

      // Step 4: Open Razorpay modal
      const options = {
        key:      payData.keyId,
        amount:   payData.amount,
        currency: payData.currency,
        name:     "My Cookie",
        description: "Fresh Cookies Delivered",
        order_id: payData.razorpayOrderId,

        handler: async (response) => {
          // Step 5: Verify payment
          const verifyRes = await fetch(`/api/orders/${orderData.order._id}/verify`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId:   response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setCart([]);
            localStorage.removeItem("cart");
            setOrdered(true);
          } else {
            setError("Payment verification failed. Contact support.");
          }
        },

        prefill: { name },
        theme: { color: "#1A1A18" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✦</div>
          <h3>Order Placed</h3>
          <p>
            Thank you, {name}. Your cookies are being freshly baked
            and will be delivered to you shortly.
          </p>
          <button className="back-btn" onClick={() => window.location.href = "/"}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="checkout-eyebrow">Final Step</div>
        <h2>Checkout</h2>
      </div>

      {cart.length === 0 ? (
        <div className="checkout-empty">
          <p>Nothing to checkout yet.</p>
        </div>
      ) : (
        <div className="checkout-body">
          <div className="checkout-form">
            <p className="form-section-title">Delivery Details</p>

            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Delivery Address</label>
              <textarea
                placeholder="Your full delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button className="location-btn" onClick={getLocation}>
              ◎ Use My Current Location
            </button>

            {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

            <button
              className="order-btn"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <div>
                  <div className="checkout-item-name">{item.name}</div>
                  <div className="checkout-item-qty">{item.qty} × ₹{item.price}</div>
                </div>
                <span className="checkout-item-price">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
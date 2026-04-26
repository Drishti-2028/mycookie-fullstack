import React from "react";
import "./Cart.css";
import { useNavigate, Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((item) =>
      item.id === id ? { ...item, qty } : item
    ));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section className="cart-page">

      {/* HEADER */}
      <div className="cart-header">
        <div className="cart-eyebrow">Your Order</div>
        <h2>Shopping Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse Menu</Link>
        </div>
      ) : (
        <div className="cart-body">

          {/* ITEMS */}
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">

                <img
                  src={`${item.image}?auto=compress&cs=tinysrgb&w=200`}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-unit">₹{item.price} per piece</span>
                </div>

                <div className="cart-qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>

                <span className="cart-item-price">₹{item.price * item.qty}</span>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>

              </li>
            ))}
          </ul>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}

    </section>
  );
};

export default Cart;
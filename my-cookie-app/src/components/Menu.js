import React from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const COOKIE_LIST = [
  {
    id: 1,
    name: "Choco Chip Classic",
    image: "https://images.pexels.com/photos/189537/pexels-photo-189537.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Classic cookie loaded with rich chocolate chips.",
    price: 99,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Nutty Delight",
    image: "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Crunchy cookie packed with roasted nuts.",
    price: 109,
    badge: "Popular",
  },
  {
    id: 3,
    name: "Double Chocolate Brownie",
    image: "https://images.pexels.com/photos/2067436/pexels-photo-2067436.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Rich chocolate cookie with extra cocoa goodness.",
    price: 119,
    badge: "Chef's Pick",
  },
  {
    id: 4,
    name: "Coconut Crunch",
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Crispy coconut flakes on a buttery base.",
    price: 105,
    badge: null,
  },
  {
    id: 5,
    name: "Oatmeal Raisin",
    image: "https://images.pexels.com/photos/1775283/pexels-photo-1775283.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Chewy oats with sweet raisins.",
    price: 95,
    badge: null,
  },
  {
    id: 6,
    name: "Minty Morsel",
    image: "https://images.pexels.com/photos/4110541/pexels-photo-4110541.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Chocolate cookie with refreshing mint.",
    price: 115,
    badge: "New",
  },
];

const Menu = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const addToCart = (cookie) => {
    const existing = cart.find((item) => item.id === cookie.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === cookie.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...cookie, qty: 1 }]);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="menu-page">

      <div className="menu-header">
        <div className="menu-eyebrow">Our Collection</div>
        <h1>Signature Cookies</h1>
        <p>Freshly baked, handcrafted, and delivered with love</p>
        <button className="cart-badge" onClick={() => navigate("/cart")}>
          Cart · {totalItems} item{totalItems !== 1 ? "s" : ""}
        </button>
      </div>

      <div className="cookie-grid">
        {COOKIE_LIST.map((cookie) => (
          <div key={cookie.id} className="cookie-card">

            <div className="cookie-img-wrap">
              <img
                src={cookie.image}
                alt={cookie.name}
                className="cookie-img"
              />
              <div className="cookie-img-overlay" />
              {cookie.badge && (
                <span className="cookie-badge">{cookie.badge}</span>
              )}
            </div>

            <div className="cookie-info">
              <h3>{cookie.name}</h3>
              <p>{cookie.description}</p>
              <div className="card-footer">
                <span className="price">₹{cookie.price}</span>
                <button className="add-btn" onClick={() => addToCart(cookie)}>
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Menu;
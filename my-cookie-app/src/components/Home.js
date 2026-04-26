import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaTruck, FaLeaf, FaCookieBite } from "react-icons/fa";

const Home = () => {
  const [location, setLocation] = useState("your area");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
        },
        () => setLocation("your location")
      );
    }
  }, []);

  return (
    <div className="home-container">

      <div className="floating-cookies">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      {/* LOCATION */}
      <div className="location-banner">
        Delivering fresh cookies to <strong>{location}</strong>
      </div>

      {/* HERO — SPLIT */}
      <section className="hero">

        {/* LEFT — LIGHT */}
        <div className="hero-text">
          <div className="hero-eyebrow">Artisan Cookie Delivery</div>

          <h1>
            Welcome to
            <em>MyCookie</em>
          </h1>

          <p>
            Freshly baked cookies delivered warm to your doorstep.
            Crafted with care, delivered with love.
          </p>

          <a href="/menu" className="menu-button">
            <span>Explore Menu</span>
          </a>

          <div className="scroll-hint">Scroll</div>
        </div>

        {/* RIGHT — DARK IMAGE */}
        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/189537/pexels-photo-189537.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Close up of freshly baked cookies"
          />
          <div className="hero-image-overlay" />
          <span className="hero-image-label">Freshly Baked Daily</span>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon"><FaCookieBite /></div>
          <h3>Fresh Ingredients</h3>
          <p>Only the finest ingredients in every batch, sourced with care.</p>
        </div>
        <div className="feature">
          <div className="feature-icon"><FaLeaf /></div>
          <h3>Handmade Quality</h3>
          <p>Baked daily with consistency and artisan craftsmanship.</p>
        </div>
        <div className="feature">
          <div className="feature-icon"><FaTruck /></div>
          <h3>Fast Delivery</h3>
          <p>Hot cookies at your door, every time, right on time.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <span className="testimonials-sub">Voices we are proud of</span>

        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"Best cookies I've ever had. Fresh and absolutely delicious."</p>
            <h4>Aditi</h4>
            <p className="rating">★★★★★</p>
          </div>
          <div className="testimonial">
            <p>"Super fast delivery and perfectly warm cookies every time."</p>
            <h4>Rahul</h4>
            <p className="rating">★★★★★</p>
          </div>
          <div className="testimonial">
            <p>"Feels like a premium bakery experience at home."</p>
            <h4>Sneha</h4>
            <p className="rating">★★★★★</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
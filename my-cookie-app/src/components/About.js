import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-section">

      {/* HERO */}
      <div className="about-hero">
        <div className="about-hero-text">
          <div className="about-eyebrow">Our Story</div>
          <h1>
            Baked with <em>intention,</em> delivered with care
          </h1>
          <p>
            At MyCookie, we don't just bake cookies — we craft experiences.
            Every batch is made from the finest ingredients, shaped by hand,
            and delivered warm to your door. This is homemade goodness,
            elevated.
          </p>
        </div>

        <div className="about-hero-image">
          <img
            src="https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Freshly baked cookies"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="about-stats">
        <div className="stat">
          <div className="stat-number">12<span>k+</span></div>
          <div className="stat-label">Cookies Delivered</div>
        </div>
        <div className="stat">
          <div className="stat-number">6<span>+</span></div>
          <div className="stat-label">Signature Recipes</div>
        </div>
        <div className="stat">
          <div className="stat-number">4.9<span>★</span></div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>

      {/* VALUES */}
      <div className="about-values">
        <div className="section-header">
          <h2>What We Stand For</h2>
          <p>The principles behind every batch</p>
        </div>

        <div className="cards-grid">
          <div className="card">
            <div className="card-number">01</div>
            <h3>Premium Ingredients</h3>
            <p>
              We use only the finest Belgian chocolate, organic flour, and
              hand-picked vanilla beans in every single batch.
            </p>
          </div>

          <div className="card">
            <div className="card-number">02</div>
            <h3>Baked with Love</h3>
            <p>
              Each cookie is handcrafted in small batches to ensure
              consistent quality, warmth, and that homemade taste.
            </p>
          </div>

          <div className="card">
            <div className="card-number">03</div>
            <h3>Community First</h3>
            <p>
              We believe in giving back — a portion of every sale supports
              local food charities and community kitchens.
            </p>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div className="about-quote">
        <blockquote>
          "A cookie shared is a memory made. We bake so you can
          create those moments."
        </blockquote>
        <cite>— The MyCookie Team</cite>
      </div>

    </div>
  );
};

export default About;
import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <>
      <section className="contact-section">

        {/* LEFT */}
        <div className="contact-left">
          <div className="contact-eyebrow">Get In Touch</div>
          <h2>
            We'd love to
            <em>hear from you</em>
          </h2>
          <p>
            Have a question, a custom order request, or just want to talk
            cookies? Reach out — we're always happy to help.
          </p>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <div className="contact-info">

            <div className="contact-item">
              <span className="contact-item-label">Email</span>
              <span className="contact-item-value">drishtisingh929@gmail.com</span>
            </div>

            <div className="contact-item">
              <span className="contact-item-label">Instagram</span>
              <span className="contact-item-value">@xx.sag.xx</span>
            </div>

            <div className="contact-item">
              <span className="contact-item-label">Phone</span>
              <span className="contact-item-value">+91 7764061635</span>
            </div>

          </div>
        </div>

      </section>

      
    </>
  );
};

export default Contact;
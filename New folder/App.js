
import { BrowserRouter } from 'react-router-dom'; // ✅ CORRECT

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1 style={styles.title}>My Cookie 🍪</h1>
        <nav style={styles.nav}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#about" style={styles.link}>About</a>
          <a href="#menu" style={styles.link}>Menu</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <h2>Welcome to My Cookie!</h2>
        <p>Your one-stop shop for fresh, handmade cookies baked with love. 😋</p>
      </section>

      <section id="menu" style={styles.menu}>
        <h3>Our Top Cookies</h3>
        <ul>
          <li>🍫 Choco Chip Classic</li>
          <li>🌰 Nutty Delight</li>
          <li>🍓 Strawberry Swirl</li>
          <li>🥥 Coconut Crunch</li>
        </ul>
      </section>

      <footer style={styles.footer}>
        <p>© 2025 My Cookie. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#e76f51',
    padding: '1rem',
    color: 'white',
    textAlign: 'center'
  },
  title: {
    margin: 0,
  },
  nav: {
    marginTop: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  hero: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f4a261',
    color: '#fff'
  },
  menu: {
    padding: '2rem',
    textAlign: 'center'
  },
  footer: {
    backgroundColor: '#264653',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    marginTop: '2rem'
  }
};

export default App;

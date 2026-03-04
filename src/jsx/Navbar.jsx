import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'; // Keep this for navigation
import styles from '../moduledotcss/Navbar.module.css';
import leaningTower from '../assets/leaning_tower.svg';
import codeIcon from '../assets/codeIcon.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 50) {
        setShow(true);
        return;
      }
      if (currentScroll <= 150 && currentScroll < lastScrollRef.current) {
        setShow(true);
      } else {
        setShow(false);
      }
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${!show ? styles.navHidden : ''}`}>
      <div className={styles.leftSection}>
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? styles.barOpen : styles.bar}></span>
          <span className={isOpen ? styles.barOpen : styles.bar}></span>
          <span className={isOpen ? styles.barOpen : styles.bar}></span>
        </div>

        <div className={styles.logo}>
          <h1>Portfolio</h1>
          <img src={leaningTower} alt="Leaning Tower Icon" className={styles.logoImg} />
        </div>
      </div>

      <div className={`${styles.navContent} ${isOpen ? styles.active : ''}`}>
        <div className={styles.links}>
          {/* Using Link component ensures the app doesn't reload and routes work */}
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Link>
        </div>

        <div className={styles.social}>
          <a className={styles.devIcon}>
            Learn
            <img src={codeIcon} alt="Code Icon" style={{ marginLeft: '8px', height: '18px' }} />
          </a>
          <a className={styles.githubBtn}>Github</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
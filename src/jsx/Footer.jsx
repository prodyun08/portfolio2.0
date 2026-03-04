import React from 'react'
import styles from '../moduledotcss/Footer.module.css'
import 'remixicon/fonts/remixicon.css'


const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <section id="footer" className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>Copyright &copy; {currentYear} Prodyun Biswas | All rights reserved.</p>
        <div className={styles.footerLinks}>
        <a href="https://www.linkedin.com/in/prodyun-biswas-700052254/" target="_blank" rel="noopener noreferrer"
><i className="ri-linkedin-box-fill"></i></a>
        <a href="https://twitter.com/ProdyunBiswas" target="_blank" rel="noopener noreferrer"
><i className="ri-twitter-x-fill"></i></a>
        <a href="https://github.com/ProdyunBiswas" target="_blank" rel="noopener noreferrer"
><i className="ri-github-fill"></i></a>
        <a href="mailto:prodyunbiswas@gmail.com" target="_blank" rel="noopener noreferrer"
><i className="ri-mail-send-fill"></i></a>
        <a href="https://www.youtube.com/@ProdyunBiswas" target="_blank" rel="noopener noreferrer"
><i className="ri-youtube-fill"></i></a>
        </div>
          </div>

        </section>
  )
}

export default Footer
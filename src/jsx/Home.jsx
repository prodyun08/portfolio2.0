import React from 'react';
import styles from '../moduledotcss/Home.module.css';
import BrickScene from './BrickScene';
import fingerprintSrc from '../assets/iconFingerprint.svg';
import Autodesk from '../assets/autodesk.svg';
import Adobe from '../assets/adobe-.svg';
import Microsoft from '../assets/microsoft-office.svg';
import Staad from '../assets/staad-software.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  return (
    <>
    <section id='home' className={styles.hero}>
      <div className={styles.container}>


<h1 className={styles.title}>
  The future <br />
  of development <br />
 <span className={styles.highlightRow}>
  is 
    <span className={styles.fingerprintcont}>
        <img src={fingerprintSrc} className={styles.fingerGlow} alt="Fingerprint Icon" style={{ width: '90px', height: '90px' }} />
    </span>

  human + 
  
  <span style={{ width: '120px', height: '120px', display: 'inline-flex', alignItems: 'center' }}>
    <BrickScene />
  </span>

  Construction
</span>
</h1>
        
        <p className={styles.subtitle}>
          We help you map the skills you need, track the skills you have, <br />
          and close your gaps to thrive in a GenAI world.
        </p>

        <button className={styles.ctaButton}>
          Join The Community
        </button>
      </div>
    </section>
    <section>
      <div className={styles.aboutSection}>
        <h1>Hi, I'm <span className={styles.intro}>Prodyun</span></h1>
        <p className={styles.Bage}>Civil Engineer • Developer • Creator </p>
        <p className={styles.aboutDesc}>Hello! I'm Prodyun Biswas, a diploma student in Civil Engineering from Babasaheb Ambedkar Govt. Polytechnic, West Bengal, India. I am a hardworking individual who thrives in team environments. My skills include proficiency in Autodesk AutoCAD, Autodesk Revit, ETABS, STAAD Pro, and estimation work using Excel. I am adept at reading building drawings and have strong calculation skills, particularly in RCC column calculations. As a fresher, I am eager to explore job opportunities in various formats, including onsite, offsite, remote, part-time, full-time, and internships. I am excited to start my career and contribute to the field of civil engineering.

</p>
<div className={styles.skillsSection}>
  <div className={styles.skills}>
    <a href="#"><img src={Autodesk} alt="Autodesk Logo" title='Autodesk'/></a>
    <a href="#"><img src={Adobe} alt="Adobe Logo" title='Adobe'/></a>
    <a href="#"><img src={Microsoft} alt="Microsoft Logo" title='Microsoft'/></a>
    <a href="#"><img src={Staad} alt="Staad Logo" title='Staad Pro'/></a>
  </div>
  <Link className={styles.more} to="/about">
    <p>More</p>
    <i className="ri-arrow-right-long-line"></i>
  </Link>
</div>
      </div>
    </section>
    <section>
      <div className={styles.projects}>
    
        
      </div>
    </section>
    </>
  );
};

export default Home;
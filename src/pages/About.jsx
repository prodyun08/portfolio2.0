import React, { useState, useEffect } from 'react';
import styles from '../moduledotcss/About.module.css';

const About = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const currentTime = hour + minutes / 60;

    if (currentTime >= 5 && currentTime < 12) return "Good Morning";
    if (hour === 12 && minutes === 0) return "Good Noon";
    if (currentTime >= 12 && currentTime < 17) return "Good Afternoon";
    if (currentTime >= 17 && currentTime < 21) return "Good Evening";
    return "Good Night";
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <>
    <section className={styles.timeSection}>
    {/* TOP ROW: Greeting & Clock */}
    <div className={styles.container1}>
      <div className={styles.greetingText}>
        <span className={styles.highlight}>{getGreeting()}</span>
      </div>

      <div className={styles.clockSection}>
        <h2 className={styles.digitalClock}>{formatTime(time)}</h2>
      </div>
    </div>

    {/* NEXT SECTION: Add your new content here */}
    <div className={styles.container2}>
      {/* YOUR NEW CONTENT GOES HERE */}
        <h2 className={styles.titlescr}>Hey, I'm <span className={styles.name}> Prodyun</span><img src="https://i.giphy.com/zK5EHMbtwfW1O.webp" className={styles.signaturePose} alt="signature pose" /></h2>
    </div>
  </section>
<section className={styles.nextSection}>
  <div className={styles.container3}>
    {/* GIF centered via margin: auto in CSS */}
    <img 
      src="https://c.tenor.com/2GAdTOy4mgkAAAAC/tenor.gif" 
      alt="Safety First" 
      className={styles.safetyFirst}
    />
    
    {/* These will now align to the left of the 800px container */}
    <h3 className={styles.titleAbout}>About Me</h3>
    
    <p className={styles.aboutDesc}>
      I'm a Junior Civil Engineer with a passion for learning and growth. I thrive on challenges and am always eager to expand my skill set. With a strong foundation in civil engineering principles, I am committed to delivering high-quality work and contributing to meaningful projects. My goal is to continuously improve and make a positive impact in the field of Construction.
    </p>
    <h3 className={styles.titleAbout}>My Journey</h3>
    <p className={styles.aboutDesc}>
      I'm came from rural india, where I developed a strong work ethic and a passion for engineering. I pursued my education in civil engineering, which has equipped me with the knowledge and skills to excel in the field. My journey has been marked by dedication, perseverance, and a commitment to continuous learning, which has shaped me into the professional I am today.
    </p>
    <p className={styles.aboutDesc}>
      In my 18 Birtday, My father or my mother gift me in my first Desktop. Which opened a new world of possibilities for me. I started exploring various software and tools, which sparked my interest in technology and engineering.
    </p>
    <p className={styles.aboutDesc}>
      Everytime i am a below average in my class, but i never give up. I always try to improve myself and learn from my mistakes. I believe that failure is a part of the learning process, and it has helped me grow both personally and professionally. Then i learning Programming Language Like Python, C, C++ and JavaScript. I also learning Web Development, which has allowed me to create my own projects and showcase my skills.
    </p>
    <p className={styles.aboutDesc}>
      Then after 1 year I admission on Governemnt Polytechnic College, where i learning Civil Engineering. My College Teacher is very supportive and helpful. They always encourage me to learn new things and improve my skills. I am grateful for their guidance and support, which has helped me succeed in my studies and pursue my passion for engineering.
    </p>
    <h3 className={styles.titleAbout}>Skills & Technology</h3>
    <p className={styles.skillHead}>Civil Engineering</p>
    <div className={styles.skillsShow}>
      <span className={styles.skillTec}>BBS</span>
      <span className={styles.skillTec}>BOQ</span>
      <span className={styles.skillTec}>Rate Analysis</span>
      <span className={styles.skillTec}>Structural Analysis</span>
      <span className={styles.skillTec}>Site Management</span> 
    </div>
    <p className={styles.skillHead}>Computer Skills</p>
    <div className={styles.skillsShow}>
      <span className={styles.skillTec}>Microsoft Office</span>
      <span className={styles.skillTec}>Adobe Creative Cloud</span>
      <span className={styles.skillTec}>Autodesk</span>
      <span className={styles.skillTec}>Staad Pro</span> 
    </div>
    <p className={styles.skillHead}>Industrial Safety</p>
    <div className={styles.skillsShow}>
      <span className={styles.skillTec}>Construction Management</span>
      <span className={styles.skillTec}>Risk Management</span>
      <span className={styles.skillTec}>Emergency Response</span>
      <span className={styles.skillTec}>Leadership</span> 
    </div>
    <p className={styles.skillHead}>Languages</p>
    <div className={styles.skillsShow}>
      <span className={styles.skillTec}>Python</span>
      <span className={styles.skillTec}>C</span>
      <span className={styles.skillTec}>C++</span>
      <span className={styles.skillTec}>JavaScript</span> 
    </div>
  </div>
</section>
<section className={styles.Education}>

</section>
  </>
  );
};

export default About;
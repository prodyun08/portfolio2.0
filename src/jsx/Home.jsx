import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/Home.module.css';
import projectStyles from '../moduledotcss/Projects.module.css';
import blogStyles from '../moduledotcss/About.module.css'; 
import CalendarIcon from '../assets/calendar.svg';
import BrickScene from './BrickScene';
import fingerprintSrc from '../assets/iconFingerprint.svg';
import Autodesk from '../assets/autodesk.svg';
import Adobe from '../assets/adobe-.svg';
import Microsoft from '../assets/microsoft-office.svg';
import Staad from '../assets/staad-software.svg';
import Folder from '../assets/folder.svg';
import { Link, useNavigate } from 'react-router-dom';
// REMOVED: import { myProjects } from '../pages/Projects'; <--- Delete this line
import Chatbot from '../pages/Chatbot';




const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]); // Added state for dynamic projects
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Latest Blogs
    const fetchLatestBlogs = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setLatestBlogs(data);
    };

    // Fetch Latest Projects from Database
    const fetchLatestProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Shows only the top 3 on home page
      if (data) setLatestProjects(data);
    };

    fetchLatestBlogs();
    fetchLatestProjects();
  }, []);



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

        <button 
  className={styles.ctaButton} 
  onClick={() => window.open("https://t.me/the_well_engineer/", "_blank", "noopener,noreferrer")}
>
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
    <section className={projectStyles.projects}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Latest Projects</h2>
        <div className={projectStyles.projectList}>
          {latestProjects.map((project, index) => (
            <div key={index} className={projectStyles.projectItem}>
              <div className={projectStyles.topIcons}>
                <img src={Folder} alt="Folder" className={projectStyles.folderIcon} />
              </div>
              <div className={projectStyles.details}>
                <h3>{project.title}</h3>
                <p className={projectStyles.description}>{project.description}</p>
              </div>
              <div className={projectStyles.techStack}>
                {project.tech.slice(0, 2).map((skill, i) => (
                  <span key={i} className={projectStyles.techTag}>{skill}</span>
                ))}
              </div>
              
            </div>
            
          ))}
        </div>
        <div className={projectStyles.viewProjectContainer}>
  <Link className={styles.more} to="/projects">
    <p>More</p>
    <i className="ri-arrow-right-long-line"></i>
  </Link>
</div>
      </section>

      {/* 2. ADD LATEST BLOGS SECTION HERE */}
      <section className={blogStyles.Blogs} style={{ marginTop: '60px' }}>
        <h2 className={blogStyles.titleAbout} style={{ textAlign: 'center' }}>Latest Blogs</h2>
        {latestBlogs.map(post => (
          <div key={post.id} className={blogStyles.BlogContent}>
            <h2 
              className={blogStyles.BlogsTitle} 
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              {post.title}
            </h2>
            <p className={blogStyles.BlogDate}>
              <img src={CalendarIcon} alt="calendar" style={{ width: '20px', marginRight: '5px' }} /> 
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className={blogStyles.BlogDescription}>
              {post.description}
              {"\u00A0"}
              <Link to={`/blog/${post.slug}`} className={blogStyles.Readmore}>Read More</Link>
            </p>
          </div>
        ))}
        <div className={projectStyles.viewProjectContainer}>
  <Link className={styles.more} to="/Blogs">
    <p>View all Blogs</p>
    <i className="ri-arrow-right-long-line"></i>
  </Link>
</div>
      </section>
    <Chatbot/>
    </>
  );
};

export default Home;
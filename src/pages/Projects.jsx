import React from 'react';
import styles from '../moduledotcss/Projects.module.css';
import Fileopen from '../assets/clip-open.svg'; 
import Folder from '../assets/folder.svg';
import Gitrepo from '../assets/github-repo.svg';

const Projects = () => {
  const myProjects = [
    {
      title: "Online Exam System",
      description: "Project 1 under Php-CSS-Js-Django-SQLite3 coding.",
      tech: ["Php", "Python", "JavaScript"],
      githubLink: "https://github.com/yourusername/project-repo", // Add GitHub link
      liveLink: "https://your-live-demo.com" // Add External link
    },
    {
      title: "Online Exam System",
      description: "Project 1 under Php-CSS-Js-Django-SQLite3 coding.",
      tech: ["Php", "Python", "JavaScript"],
      githubLink: "https://github.com/yourusername/project-repo", // Add GitHub link
      liveLink: "https://your-live-demo.com" // Add External link
    },
    {
      title: "Online Exam System",
      description: "Project 1 under Php-CSS-Js-Django-SQLite3 coding.",
      tech: ["Php", "Python", "JavaScript"],
      githubLink: "https://github.com/yourusername/project-repo", // Add GitHub link
      liveLink: "https://your-live-demo.com" // Add External link
    },
    // Add more projects here
  ];

  return (
    <section id='Projects' className={styles.projects}>
      <h2>Projects</h2>
      <div className={styles.projectList}>
        {myProjects.map((project, index) => (
          <div key={index} className={styles.projectItem}>
            
            {/* Top Icon Row */}
            <div className={styles.topIcons}>
              <img src={Folder} alt="Folder" className={styles.folderIcon} />
              <div className={styles.actionIcons}>
    {/* GitHub Link */}
    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'transparent' }}>
      <img src={Gitrepo} alt="GitHub" />
    </a>
    
    {/* External/Live Preview Link */}
    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'transparent' }}>
      <img src={Fileopen} alt="External Link" />
    </a>
</div>
            </div>

            {/* Content */}
            <div className={styles.details}>
              <h3>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
            </div>

            {/* Tech Tags */}
            <div className={styles.techStack}>
              {project.tech.map((skill, i) => (
                <span key={i} className={styles.techTag}>{skill}</span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
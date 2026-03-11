import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/Projects.module.css';
import Folder from '../assets/folder.svg';
import Gitrepo from '../assets/github-repo.svg';
import Fileopen from '../assets/clip-open.svg';


const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section id='Projects' className={styles.projects}>
      <h2>Projects</h2>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectItem}>
            <div className={styles.topIcons}>
              <img src={Folder} alt="Folder" className={styles.folderIcon} />
              <div className={styles.actionIcons}>
                <a href={project.github_link} className={styles.iconLink}><img src={Gitrepo} alt="GitHub" /></a>
                <a href={project.live_link} className={styles.iconLink}><img src={Fileopen} alt="External" /></a>
              </div>
            </div>
            <div className={styles.details}>
              <h3>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
            </div>
            <div className={styles.techStack}>
              {project.tech?.map((skill, i) => (
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
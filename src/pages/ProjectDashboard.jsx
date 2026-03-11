import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/Dashboard.module.css';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '', description: '', tech: '', github_link: '', live_link: ''
  });
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const showToast = (message, type = 'success') => {
    setNotification({ message, type, visible: true });
    setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000);
  };

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) showToast("Error loading data", "error");
    else setProjects(data || []);
  };

  // Helper to reset the form to blank
  const resetForm = () => {
    setEditingId(null);
    setNewProject({ title: '', description: '', tech: '', github_link: '', live_link: '' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const projectData = { 
      ...newProject, 
      tech: typeof newProject.tech === 'string' ? newProject.tech.split(',').map(s => s.trim()) : newProject.tech 
    };

    const { error } = editingId 
      ? await supabase.from('projects').update(projectData).eq('id', editingId)
      : await supabase.from('projects').insert([projectData]);

    if (error) {
      showToast(error.message, "error");
    } else {
      showToast(editingId ? "Project Updated" : "Project Created");
      resetForm(); // Clears inputs after saving
      fetchProjects();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) showToast("Delete failed", "error");
      else {
        showToast("Project deleted", "error");
        fetchProjects();
      }
    }
  };

  return (
    <div className={styles.container}>
      {notification.visible && (
        <div className={`${styles.toast} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <h2 className={styles.projectTitle}>{editingId ? "Edit Mode" : "Manage Projects"}</h2>
      
      <form onSubmit={handleSave} className={styles.formContainer}>
        <input className={styles.inputField} type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
        <textarea className={styles.inputField} placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
        <input className={styles.inputField} type="text" placeholder="Tech (React, Node, etc)" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} />
        <input className={styles.inputField} type="text" placeholder="Github URL" value={newProject.github_link} onChange={e => setNewProject({...newProject, github_link: e.target.value})} />
        <input className={styles.inputField} type="text" placeholder="Live Demo URL" value={newProject.live_link} onChange={e => setNewProject({...newProject, live_link: e.target.value})} />
        
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>
            {editingId ? "Save Changes" : "Add Project"}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm} // This now clears everything
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className={styles.projectList}>
        <h3>Recent Projects</h3>
        {projects.map(p => (
          <div key={p.id} className={styles.projectItem}>
            <span>{p.title}</span>
            <div className={styles.projectActions}>
              <button onClick={() => {
                setEditingId(p.id);
                setNewProject({ ...p, tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech });
              }} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={{ color: '#ff4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
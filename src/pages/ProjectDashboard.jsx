import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '', description: '', tech: '', github_link: '', live_link: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
  fetchProjects();
}, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Convert tech string to array
    const projectData = { 
      ...newProject, 
      tech: newProject.tech.split(',').map(s => s.trim()) 
    };

    if (editingId) {
      await supabase.from('projects').update(projectData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('projects').insert([projectData]);
    }
    setNewProject({ title: '', description: '', tech: '', github_link: '', live_link: '' });
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete project?")) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  return (
    <div style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h2>Project Dashboard</h2>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#111', padding: '20px' }}>
        <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
        <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
        <input type="text" placeholder="Tech (comma separated: React, Python)" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} />
        <input type="text" placeholder="Github Link" value={newProject.github_link} onChange={e => setNewProject({...newProject, github_link: e.target.value})} />
        <input type="text" placeholder="Live Link" value={newProject.live_link} onChange={e => setNewProject({...newProject, live_link: e.target.value})} />
        <button type="submit" style={{ background: '#07cf6b', padding: '10px' }}>{editingId ? "Update" : "Add"} Project</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        {projects.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #333' }}>
            <span>{p.title}</span>
            <div>
              <button onClick={() => { setEditingId(p.id); setNewProject({...p, tech: p.tech.join(', ')}); }}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '10px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboard;
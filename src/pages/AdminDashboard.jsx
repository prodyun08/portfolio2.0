import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import BlogDashboard from './BlogDashboard';
import ProjectDashboard from './ProjectDashboard';
import styles from '../moduledotcss/Dashboard.module.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Profile State
  const [profile, setProfile] = useState({
    name: '',
    linkedin: '',
    github: '',
    twitter: '',
    youtube: '',
    photo_url: '' 
  });


  // 1. Fetch existing data from Supabase when the component loads
  useEffect(() => {
  const checkAuthAndFetchData = async () => {
    // Verify real session instead of localStorage.getItem('isLocalAuth')
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login');
      return;
    }

      // Fetch the site settings (id: 1)
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };

    checkAuthAndFetchData();
    }, [navigate]);

  // 2. Handle the Update Logic
  const handleUpdateProfile = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ 
        id: 1,
        name: profile.name,
        linkedin: profile.linkedin,
        github: profile.github,
        twitter: profile.twitter,
        youtube: profile.youtube,
        photo_url: profile.photo_url
      })
      .select(); // Add .select() to get the updated data back

    if (error) throw error;
    
    if (data) {
      setProfile(data[0]); // Immediately update the local state with new links
    }
    
    alert("Profile and Footer updated successfully!");
    // Optional: Force a page reload to update the Footer immediately
    window.location.reload(); 
  } catch (error) {
    console.error('Error updating profile:', error.message);
  }
};

  const handleLogout = async () => {
  // 1. Properly sign out from Supabase
  await supabase.auth.signOut();
  
  // 2. Clear any local flags
  localStorage.removeItem('isLocalAuth');
  
  // 3. Redirect to login
  navigate('/login');
};

  if (loading) return <div style={{ color: 'white', padding: '100px' }}>Loading...</div>;

  return (
    <div className={styles.adminWrapper}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <button 
          className={activeTab === 'profile' ? styles.activeBtn : styles.sideBtn} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={activeTab === 'projects' ? styles.activeBtn : styles.sideBtn} 
          onClick={() => setActiveTab('projects')}
        >
          Project
        </button>
        <button 
          className={activeTab === 'blogs' ? styles.activeBtn : styles.sideBtn} 
          onClick={() => setActiveTab('blogs')}
        >
          Blog
        </button>
        
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={styles.contentArea}>
        {activeTab === 'profile' && (
          <section className={styles.profileGrid}>
            <h2>Edit Profile</h2>
            
            {/* Image Preview Circle */}
            <div className={styles.photoContainer}>
              <div 
                className={styles.circlePreview} 
                style={{ 
                  backgroundImage: `url(${profile.photo_url || 'https://via.placeholder.com/150'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!profile.photo_url && "No Image"}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                value={profile.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})} 
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Photo Link (URL)</label>
              <input 
                type="text" 
                placeholder="Paste image URL here..." 
                value={profile.photo_url} 
                onChange={(e) => setProfile({...profile, photo_url: e.target.value})} 
              />
            </div>
            
            <h3>Social Links</h3>
            <div className={styles.socialInputs}>
              <input type="text" placeholder="LinkedIn" value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} />
              <input type="text" placeholder="Github" value={profile.github} onChange={(e) => setProfile({...profile, github: e.target.value})} />
              <input type="text" placeholder="Twitter" value={profile.twitter} onChange={(e) => setProfile({...profile, twitter: e.target.value})} />
              <input type="text" placeholder="Youtube" value={profile.youtube} onChange={(e) => setProfile({...profile, youtube: e.target.value})} />
            </div>

            <button className={styles.updateBtn} onClick={handleUpdateProfile}>
              Update
            </button>
          </section>
        )}

        {activeTab === 'projects' && <ProjectDashboard isEmbedded={true} />}
        {activeTab === 'blogs' && <BlogDashboard isEmbedded={true} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
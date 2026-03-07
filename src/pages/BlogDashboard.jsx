import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    description: '',
    content: '',
    created_at: new Date().toISOString().slice(0, 16) 
  });
  
  const navigate = useNavigate();

  const createSlug = (text) => {
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')     
      .replace(/[^\w-]+/g, '')  
      .replace(/--+/g, '-');    
  };
  
  useEffect(() => {
    const checkUser = () => {
      const isAuth = localStorage.getItem('isLocalAuth');
      if (isAuth !== 'true') {
        navigate('/login');
      } else {
        setLoading(false);
        fetchPosts();
      }
    };
    checkUser();
  }, [navigate]);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setNewPost({
      title: post.title,
      author: post.author,
      description: post.description,
      content: post.content,
      created_at: new Date(post.created_at).toISOString().slice(0, 16)
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    const postData = { ...newPost, slug: createSlug(newPost.title) };

    if (editingId) {
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', editingId);
      if (error) alert(error.message);
      else {
        alert("Post updated!");
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from('blog_posts').insert([postData]);
      if (error) alert(error.message);
      else alert("Post added!");
    }

    setNewPost({ title: '', author: '', description: '', content: '', created_at: new Date().toISOString().slice(0, 16) });
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this post?")) {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (!error) fetchPosts();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLocalAuth'); // Clear local auth
    navigate('/login'); // Redirect to login
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div style={{ color: 'white', padding: '100px' }}>Loading...</div>;

  return (
    <div style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{editingId ? "Edit Post" : "Blog Dashboard"}</h2>
        {/* LOGOUT BUTTON ADDED HERE */}
        <button 
          onClick={handleLogout} 
          style={{ background: '#ff4444', color: 'white', padding: '8px 15px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          Logout
        </button>
      </div>
      
      <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: '#111', padding: '20px', borderRadius: '10px' }}>
        <input style={{padding: '10px'}} type="text" placeholder="Title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
        <input style={{padding: '10px'}} type="text" placeholder="Author" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} required />
        <input style={{padding: '10px'}} type="datetime-local" value={newPost.created_at} onChange={e => setNewPost({...newPost, created_at: e.target.value})} required />
        <textarea style={{padding: '10px'}} placeholder="Description" value={newPost.description} onChange={e => setNewPost({...newPost, description: e.target.value})} required />
        <textarea style={{padding: '10px', minHeight: '200px'}} placeholder="Content (HTML)" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ flex: 2, background: '#07cf6b', padding: '10px', cursor: 'pointer' }}>
            {editingId ? "Update Post" : "Add Post"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setNewPost({title:'', author:'', description:'', content:'', created_at: new Date().toISOString().slice(0, 16)}); }} style={{ flex: 1, background: '#444' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ marginTop: '50px' }}>
        <h3>Manage Posts</h3>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#222', color: 'white', border: '1px solid #444' }} />
        
        {filteredPosts.map(post => (
          <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#111', marginBottom: '10px', border: '1px solid #333' }}>
            <div>
              <div style={{ color: '#07cf6b', fontWeight: 'bold' }}>{post.title}</div>
              <div style={{ fontSize: '12px' }}>By {post.author}</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => startEdit(post)} style={{ background: '#333', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(post.id)} style={{ background: '#800', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;



// Below code is github login system. 

/*
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not logged in, send them back to the login page
        navigate('/login');
      } else {
        setLoading(false);
        fetchPosts();
      }
    };
    checkUser();
  }, [navigate]);

  if (loading) return <div style={{ color: 'white', padding: '100px' }}>Loading...</div>;

  // ... rest of your existing fetchPosts and handleAddPost logic

  useEffect(() => { fetchPosts(); }, []);

  return (
    <div style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
        <input type="text" placeholder="Author Name" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} />
        
        // Automatic but changeable time 
        <label>Post Time:</label>
        <input type="datetime-local" value={newPost.created_at} onChange={e => setNewPost({...newPost, created_at: e.target.value})} />
        
        <textarea placeholder="Short Description (2 lines)" value={newPost.description} onChange={e => setNewPost({...newPost, description: e.target.value})} />
        
        <textarea 
          placeholder="HTML/CSS/JS Code Content" 
          style={{ minHeight: '200px', fontFamily: 'monospace' }} 
          value={newPost.content} 
          onChange={e => setNewPost({...newPost, content: e.target.value})} 
        />
        
        <button type="submit" style={{ background: '#07cf6b', padding: '10px' }}>Add Post</button>
      </form>
    </div>
  );
};
export default Dashboard;

*/
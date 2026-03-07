import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/About.module.css';
import CalendarIcon from '../assets/calendar.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className={styles.Blogs}>
      <h1 className={styles.titleAbout}>Latest Blogs</h1>
      {posts.map(post => (
        <div key={post.id}  className={styles.BlogContent}>
          <h2 className={styles.BlogsTitle} onClick={() => navigate(`/blog/${post.slug}`)}>{post.title}</h2>
          <p className={styles.BlogDate}>
            <img src={CalendarIcon} alt="calendar" style={{ width: '20px', marginRight: '5px' }} /> {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className={styles.BlogDescription}>
  {post.description}
  {"\u00A0"}
  <Link to={`/blog/${post.slug}`} className={styles.Readmore}>Read More</Link>
</p>

          
        </div>
      ))}
    </section>
  );
};
export default Blogs;
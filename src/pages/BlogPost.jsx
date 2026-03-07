import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/Blogpost.module.css';
import CalendarIcon from '../assets/calendar.svg'; 

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error: sbError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug) 
        .single();
      
      if (sbError || !data) {
        setError(true);
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [slug]);

  if (error) {
    return (
      <div className={styles.PostNotFound}>
        <h1>404 - Post Not Found</h1>
        <p>Sorry, the blog post you are looking for does not exist.</p>
        <Link to="/blogs" style={{ color: '#07cf6b' }}>Return to Blogs</Link>
      </div>
    );
  }

  if (!post) return <div style={{ color: 'white', padding: '100px' }}>Loading...</div>;

  // Function to format the date into a "Full Date" format
  const fullDate = new Date(post.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className={styles.BlogHeader}>
      <div className={styles.BlogPost}>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          <i className={`ri-arrow-left-s-line ${styles.back}`}></i> Go back
        </div>
        <h1 className={styles.BlogTitle}>{post.title}</h1>
        <div className={styles.BlogMeta}>
          <p className={styles.BlogAuthor}>Published by {post.author}</p>
          
          {/* New Date Section added here */}
          <p className={styles.BlogFullDate} >
            <img src={CalendarIcon} alt="calendar" style={{ width: '14px' }} /> 
            {fullDate}
          </p>
        </div>

        <hr />
        <div className={styles.BlogContent} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </section>
  );
};

export default BlogPost;
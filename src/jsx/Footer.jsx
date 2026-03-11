import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import styles from '../moduledotcss/Footer.module.css';
import 'remixicon/fonts/remixicon.css';

const Footer = () => {
    const [links, setLinks] = useState({
        linkedin: "#",
        twitter: "#",
        github: "#",
        youtube: "#",
        email: "prodyunbiswas@gmail.com"
    });

    // Helper to ensure social links are absolute URLs
    const formatLink = (url) => {
        if (!url || url === "#") return "#";
        // If it doesn't start with http, add https:// to prevent internal redirection
        return url.startsWith('http') ? url : `https://${url}`;
    };

    useEffect(() => {
        const fetchLinks = async () => {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .eq('id', 1) 
                .single();
            
            if (data) {
                setLinks({
                    linkedin: data.linkedin || "#",
                    twitter: data.twitter || "#",
                    github: data.github || "#",
                    youtube: data.youtube || "#",
                    // Ensure we only store the raw email address here
                    email: (data.email || "prodyunbiswas@gmail.com").replace('mailto:', '')
                });
            }
        };
        fetchLinks();
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <section id="footer" className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.footerText}>
                    Copyright &copy; {currentYear} Prodyun Biswas | All rights reserved.
                </p>
                <div className={styles.footerLinks}>
                    <a href={formatLink(links.linkedin)} target="_blank" rel="noopener noreferrer">
                        <i className="ri-linkedin-box-fill"></i>
                    </a>
                    <a href={formatLink(links.twitter)} target="_blank" rel="noopener noreferrer">
                        <i className="ri-twitter-x-fill"></i>
                    </a>
                    <a href={formatLink(links.github)} target="_blank" rel="noopener noreferrer">
                        <i className="ri-github-fill"></i>
                    </a>
                    
                    {/* Prefix mailto: exactly once here */}
                    <a href={`mailto:${links.email}`}>
                        <i className="ri-mail-send-fill"></i>
                    </a>
                    
                    <a href={formatLink(links.youtube)} target="_blank" rel="noopener noreferrer">
                        <i className="ri-youtube-fill"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Footer;
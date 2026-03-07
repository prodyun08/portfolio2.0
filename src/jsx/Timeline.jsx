import React, { useState } from 'react';
import styles from '../moduledotcss/Timeline.module.css';


const EducationTimeline = () => {
  const [activeId, setActiveId] = useState(null);

  // Updated Data Structure for Education
  const EDUCATION_DATA = [
    {
      degree: "Advance Diploma in Industrial Safety",
      institute: "Om Institute of Safety and Management",
      address: "Aurangabad, Maharashtra",
      board: "MSBTE",
      percentage: "85%",
      year: "2025-Current",
      icon: "school"
    },
    {
      degree: "Diploma in Civil Engineering",
      institute: "BabaSaheb Ambedkar Government Polytechnic",
      address: "Betai, West Bengal",
      board: "WBSCTVESD",
      percentage: "79%",
      year: "2022 — 2025",
      icon: "school"
    },
    {
      degree: "Higher Secondary (Arts)",
      institute: "Shibpur Jana Kalyan Sangha High School (H.S.)",
      address: "Shibpur, West Bengal",
      board: "WBCHSE",
      percentage: "62%",
      year: "2021",
      icon: "school"
    }
  ];

  const icons = {
    school: <svg width="30" height="30" viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className={styles.school}>
  <path fill="#07cf6b" d="M12.188 7.844l12.188 4.875-12.188 4.844-9.094-3.625c-0.563 0.469-0.969 1.219-1.031 2.063h0.219c0.25 0 0.438 0.188 0.438 0.438v1.156c0 0.25-0.188 0.438-0.438 0.438h-0.156l0.594 6.063c0.031 0.25-0.156 0.469-0.406 0.469h-1.094c-0.25 0-0.438-0.219-0.438-0.469l0.625-6.063h-0.156c-0.25 0-0.469-0.188-0.469-0.438v-1.156c0-0.25 0.219-0.438 0.469-0.438h0.344c0.063-0.906 0.469-1.688 1.031-2.25l-2.625-1.031zM11.844 18.438l0.344 0.125 0.344-0.125 6.688-2.688 0.5 5.531c0.031 0.375-0.219 0.531-0.563 0.375l-2.625-1.344c-0.344-0.188-0.906-0.156-1.219 0.031l-2.531 1.438c-0.313 0.188-0.875 0.188-1.188 0l-2.531-1.438c-0.313-0.188-0.875-0.219-1.188-0.031l-2.656 1.344c-0.344 0.188-0.594 0-0.563-0.375l0.5-5.531z"></path>
</svg>
  };

  return (
    <div id="tl-scope" className={styles.tlWrap}>
      <ol className={styles.tlLine}>
        {EDUCATION_DATA.map((edu, idx) => (
          <li key={idx} className={styles.tlItem}>
            <div className={styles.tlNode} />
            <article className={styles.tlCard}>
              <button 
                className={styles.tlToggle} 
                onClick={() => setActiveId(activeId === idx ? null : idx)}
              >
                <div className={styles.tlIc}>
                   {icons[edu.icon]}
                </div>
                <div style={{ flex: 1 }} className={styles.titleWrap}>
                  <div className={styles.tlWhen}>{edu.year}</div>
                  <div className={styles.tlRole}>{edu.degree}</div>
                  <div className={styles.tlOrg}>{edu.institute}</div>
                </div>
                <div className={styles.tlArrow}>{activeId === idx ? '▲' : '▼'}</div>
              </button>

              {activeId === idx && (
                <div className={styles.tlPanel}>
                  <div className={styles.tlDetailsGrid}>
                    <div className={styles.detailsEdu}><strong className={styles.detailsEdu}>Board:</strong> {edu.board}</div>
                    <div className={styles.detailsEdu}><strong className={styles.detailsEdu}>Percentage/CGPA:</strong> {edu.percentage}</div>
                    <div style={{ gridColumn: 'span 2' }} className={styles.detailsEdu}>
                      <strong className={styles.detailsEdu}>Location:</strong> {edu.address}
                    </div>
                  </div>
                </div>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EducationTimeline;
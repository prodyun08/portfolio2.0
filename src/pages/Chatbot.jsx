import React, { useState, useEffect, useRef } from 'react';
import styles from '../moduledotcss/Chatbot.module.css';
import chatIcon from '../assets/customer.svg'; // Your chat icon

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialMessage = { role: 'bot', text: 'Hi! I’m Prodyun’s assistant. How can I help you today?' };
  const [messages, setMessages] = useState([initialMessage]);
  const chatEndRef = useRef(null);

  const botFlow = {
    start: { options: ["My Skills", "Projects", "Contact Details"] },
    "My Skills": {
      text: "Prodyun is a Junior Civil Engineer skilled in AutoCAD, Staad Pro, and Web Development.",
      options: ["Civil Engineering", "Programming", "Back to Start"]
    },
    "Civil Engineering": {
      text: "He specializes in BBS, BOQ, Rate Analysis, and Site Management.",
      options: ["Back to Start"]
    },
    "Programming": {
      text: "He works with React JS, JavaScript, Python, and Java.",
      options: ["Back to Start"]
    },
    "Projects": {
      text: "He has built an Online Exam System and Structural Analysis tools.",
      options: ["View Projects Page", "Back to Start"]
    },
    "Contact Details": {
  text: `Reach him at <br>
  <a href="mailto:prodyunbiswas@gmail.com">prodyunbiswas@gmail.com</a>
 <br> or via <br>
  <a href="https://www.linkedin.com/in/prodyun" target="_blank" rel="noopener noreferrer">
  LinkedIn</a>`,
  options: ["Back to Start"]
}
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (option) => {
    if (option === "View Projects Page") {
      window.location.href = "/projects";
      return;
    }
    if (option === "Back to Start") {
      setMessages([initialMessage]);
      return;
    }
    const flowData = botFlow[option] || botFlow["start"];
    setMessages(prev => [...prev, { role: 'user', text: option }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: flowData.text,
        options: flowData.options 
      }]);
    }, 400);
  };

  return (
    <div className={styles.chatbotWrapper}>
      {/* Floating Launcher Icon */}
      <button className={styles.launcher} onClick={() => setIsOpen(!isOpen)}>
  {!isOpen ? (
    <img src={chatIcon} alt="Chat" className={styles.icon} />
  ) : (
    <span className={styles.closeText}>✕</span> 
    /* Or use another imported icon: <img src={closeIcon} alt="Close" /> */
  )}
</button>

      {isOpen && (
        <div className={styles.floatingWindow}>
          {/* Professional Header */}
          <div className={styles.header}>
  <div className={styles.headerInfo}>
    <div className={styles.avatar}><img src="../public/profile.ico" alt="Prodyun" /></div>
    <div className={styles.statusContainer}>
      <p className={styles.botName}>Prodyun's Assistant</p>
      <p className={styles.botStatus}>Online</p>
    </div>
  </div>
  {/* <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button> */}
</div>
          
          <div className={styles.chatBox}>
            {messages.map((msg, index) => (
  <div key={index} className={msg.role === 'user' ? styles.userRow : styles.botRow}>
    
    <div className={msg.role === 'user' ? styles.userBubble : styles.botBubble}>
      
      <p
        className={styles.msgText}
        dangerouslySetInnerHTML={{ __html: msg.text }}
      ></p>

      {msg.role === 'bot' &&
        (msg.options || (index === 0 && botFlow.start.options))?.map((opt) => (
          <button
            key={opt}
            className={styles.optionBtn}
            onClick={() => handleOptionClick(opt)}
          >
            {opt}
          </button>
      ))}

    </div>

  </div>
))}
            <div ref={chatEndRef} />
          </div>

          <div className={styles.bottomBar}>
             <div className={styles.dummyInput}>Select an option to continue...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
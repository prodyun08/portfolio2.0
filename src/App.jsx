import React from 'react';
import Navbar from './jsx/Navbar';
import Home from './jsx/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Footer from './jsx/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './jsx/ScrollToTop'; //

const App = () => {
  return (
    <BrowserRouter>
      {/* CRITICAL: You must include the tag here for it to work */}
      <ScrollToTop /> 
      
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './jsx/Navbar';
import Home from './jsx/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Footer from './jsx/Footer';
import ScrollToTop from './jsx/ScrollToTop'; 
import Dashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import BlogPost from './pages/BlogPost'; 
import NotFound from './pages/NotFound'; // You'll create this simple page
import ProjectDashboard from './pages/ProjectDashboard';
import ProtectedRoute from './jsx/ProtectedRoute';


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          
          {/* PROTECT THESE ROUTES */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project-dashboard" 
            element={
              <ProtectedRoute>
                <ProjectDashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
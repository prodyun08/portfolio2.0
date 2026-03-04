import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const BrickScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // --- 1. CLEANUP (Ensures no "ghost" bricks on reload) ---
    const currentRef = mountRef.current;
    while (currentRef.firstChild) {
      currentRef.removeChild(currentRef.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, // Smooths out jagged edges
      alpha: true,     // Transparent background
      powerPreference: "high-performance"
    });

    // --- 2. BROWSER ZOOM FIX (HD RESOLUTION) ---
    const updateResolution = () => {
      const ratio = window.devicePixelRatio || 1;
      // We cap the ratio at 3 to keep performance high, but it's enough for 4K zoom
      renderer.setPixelRatio(Math.min(ratio, 3)); 
      renderer.setSize(120, 120);
    };
    
    updateResolution();
    currentRef.appendChild(renderer.domElement);

    // --- 3. VERTICAL LANDSCAPE TEXTURE (HD 2048px) ---
    const createTexture = (text = "", isVertical = false) => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048; // High resolution for zoom clarity
      canvas.height = 2048;
      const ctx = canvas.getContext('2d');

      // Brick Base
      ctx.fillStyle = '#943a2b';
      ctx.fillRect(0, 0, 2048, 2048);

      // Fine-grain detail
      for (let i = 0; i < 30000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)';
        ctx.fillRect(Math.random() * 2048, Math.random() * 2048, 4, 4);
      }

      if (text) {
        ctx.save();
        ctx.translate(1024, 1024);
        if (isVertical) ctx.rotate(Math.PI / 2); // ROTATE 90 DEGREES
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = 'bold 280px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16; // Maximizes sharpness when brick is tilted
      return texture;
    };

    const geometry = new THREE.BoxGeometry(1, 2.2, 0.6);
    const sideMat = new THREE.MeshStandardMaterial({ map: createTexture(), roughness: 0.8 });
    const frontMat = new THREE.MeshStandardMaterial({ map: createTexture("CIVIL", true), roughness: 0.8 });

    // Index 4 is the front face of the box
    const brick = new THREE.Mesh(geometry, [sideMat, sideMat, sideMat, sideMat, frontMat, sideMat]);
    scene.add(brick);

    // Light for clarity
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 5, 5);
    scene.add(light);

    // --- 4. CONTROLS (Rotation On, Zoom Off) ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Page scrolling is protected
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Re-calculate resolution if browser zoom changes
    window.addEventListener('resize', updateResolution);

    return () => {
      window.removeEventListener('resize', updateResolution);
      renderer.dispose();
      geometry.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '120px', height: '120px' }} />;
};

export default BrickScene;
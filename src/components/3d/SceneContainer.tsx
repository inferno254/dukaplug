'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SceneContainerProps {
  className?: string;
}

export default function SceneContainer({ className = '' }: SceneContainerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // Fallback will show
    }

    // Cap DPR at 2 for mobile battery & performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    // Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x4ca82e, 3.5); // Brand Green Key Light
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffc400, 2.8); // Brand Yellow Rim Light
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // Procedural DukaPlug Floating Delivery Crate / Bag Assembly
    const group = new THREE.Group();

    // 1. Main Delivery Bag / Crate Body
    const bagGeo = new THREE.BoxGeometry(2.1, 2.2, 1.4, 2, 2, 2);
    const bagMat = new THREE.MeshStandardMaterial({
      color: 0x182415,
      roughness: 0.28,
      metalness: 0.15,
    });
    const bagMesh = new THREE.Mesh(bagGeo, bagMat);
    group.add(bagMesh);

    // 2. Yellow Accent Strap
    const strapGeo = new THREE.BoxGeometry(2.14, 0.25, 1.44);
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0xffc400,
      roughness: 0.35,
      metalness: 0.3,
    });
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    strapMesh.position.y = 0.2;
    group.add(strapMesh);

    // 3. Green Brand Emblem Front Plate
    const emblemGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.08, 32);
    emblemGeo.rotateX(Math.PI / 2);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0x4ca82e,
      roughness: 0.2,
      metalness: 0.4,
      emissive: 0x2f7a1f,
      emissiveIntensity: 0.3,
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    emblemMesh.position.set(0, 0.2, 0.72);
    group.add(emblemMesh);

    // 4. Carry Handles (Torus)
    const handleGeo = new THREE.TorusGeometry(0.48, 0.07, 16, 32, Math.PI);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xffc400, roughness: 0.3 });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    handleMesh.position.set(0, 1.1, 0);
    group.add(handleMesh);

    // 5. Floating Healthy Produce Spheres / Fresh Groceries Orbiting (Tomatoes & Greens)
    const tomatoGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xe63946, roughness: 0.2 });
    const tomatoMesh1 = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomatoMesh1.position.set(1.4, 0.6, 0.4);
    group.add(tomatoMesh1);

    const tomatoMesh2 = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomatoMesh2.position.set(-1.5, -0.4, 0.2);
    tomatoMesh2.scale.set(0.8, 0.8, 0.8);
    group.add(tomatoMesh2);

    // Fresh Green Broccoli floret sphere
    const broccoliGeo = new THREE.DodecahedronGeometry(0.28, 1);
    const broccoliMat = new THREE.MeshStandardMaterial({ color: 0x2f7a1f, roughness: 0.7 });
    const broccoliMesh = new THREE.Mesh(broccoliGeo, broccoliMat);
    broccoliMesh.position.set(1.3, -0.7, 0.5);
    group.add(broccoliMesh);

    // Steaming Hot Meal bowl base
    const mealGeo = new THREE.CylinderGeometry(0.35, 0.25, 0.22, 24);
    const mealMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    const mealMesh = new THREE.Mesh(mealGeo, mealMat);
    mealMesh.position.set(-1.3, 0.8, 0.3);
    group.add(mealMesh);

    scene.add(group);

    // Cursor tracking for subtle 3D parallax tilt
    let targetRotX = 0;
    let targetRotY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.35;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Smooth render loop
    let reqId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous organic float
      group.position.y = Math.sin(elapsed * 1.5) * 0.12;
      group.rotation.y += (targetRotY + Math.sin(elapsed * 0.6) * 0.2 - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      // Orbiting groceries gentle spin
      tomatoMesh1.position.y = 0.6 + Math.cos(elapsed * 2) * 0.1;
      tomatoMesh2.position.y = -0.4 + Math.sin(elapsed * 1.8) * 0.08;
      broccoliMesh.rotation.y += 0.015;
      mealMesh.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      aria-label="3D Interactive DukaPlug Delivery Bag with floating produce and meals"
    />
  );
}


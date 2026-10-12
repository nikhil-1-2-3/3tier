import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x0284c7, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 2.5, 50);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // 3. Central 3D Geometry: Torus Knot & Outer Icosahedron
    const group = new THREE.Group();
    scene.add(group);

    // Inner Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: false,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knotMesh);

    // Torus Knot Wireframe Overlay
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(knotGeometry, wireMaterial);
    wireMesh.scale.set(1.01, 1.01, 1.01);
    group.add(wireMesh);

    // Outer Geodesic Sphere
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Floating Data Node Points
    const nodeGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pos = outerGeo.attributes.position;
    for (let i = 0; i < pos.count; i += 3) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      outerMesh.add(node);
    }

    // 4. Background Particle Field
    const particlesCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width - 0.5) * 2;
      mouseY = (y / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate 3D group with mouse influence
      group.rotation.x = elapsedTime * 0.25 + targetY * 0.6;
      group.rotation.y = elapsedTime * 0.35 + targetX * 0.8;

      outerMesh.rotation.y = -elapsedTime * 0.15;
      outerMesh.rotation.z = elapsedTime * 0.1;

      // Particle subtle drift
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[450px] sm:h-[550px] lg:h-[620px] relative pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
}

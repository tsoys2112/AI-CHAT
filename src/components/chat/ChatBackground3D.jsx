import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './ChatBackground3D.module.css';

function readAccentColor() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim() || '#2dbd6e'
  );
}

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

export default function ChatBackground3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const accent = new THREE.Color(readAccentColor());
    const dark = isDarkTheme();
    const meshOpacity = dark ? 0.55 : 0.4;
    const wireOpacity = dark ? 0.35 : 0.28;

    const group = new THREE.Group();
    scene.add(group);

    const icoGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const icoMat = new THREE.MeshStandardMaterial({
      color: accent,
      metalness: 0.35,
      roughness: 0.45,
      transparent: true,
      opacity: meshOpacity,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-1.6, 0.4, 0);
    group.add(ico);

    const icoWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeo),
      new THREE.LineBasicMaterial({
        color: accent,
        transparent: true,
        opacity: wireOpacity,
      }),
    );
    icoWire.position.copy(ico.position);
    group.add(icoWire);

    const torusGeo = new THREE.TorusGeometry(0.85, 0.22, 16, 48);
    const torusMat = new THREE.MeshStandardMaterial({
      color: accent,
      metalness: 0.5,
      roughness: 0.35,
      transparent: true,
      opacity: meshOpacity * 0.85,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(1.5, -0.5, -0.3);
    torus.rotation.x = 0.6;
    group.add(torus);

    const octGeo = new THREE.OctahedronGeometry(0.55, 0);
    const oct = new THREE.Mesh(
      octGeo,
      new THREE.MeshStandardMaterial({
        color: accent,
        metalness: 0.2,
        roughness: 0.6,
        transparent: true,
        opacity: meshOpacity * 0.7,
      }),
    );
    oct.position.set(0.3, 1.2, -0.5);
    group.add(oct);

    const particleCount = 48;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    const particles = new THREE.Points(
      particlesGeo,
      new THREE.PointsMaterial({
        color: accent,
        size: 0.06,
        transparent: true,
        opacity: dark ? 0.5 : 0.35,
        sizeAttenuation: true,
      }),
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.55 : 0.75));
    const keyLight = new THREE.DirectionalLight(0xffffff, dark ? 0.85 : 1);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(accent, 0.35);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      if (!reducedMotion) {
        group.rotation.y = t * 0.22;
        group.rotation.x = Math.sin(t * 0.15) * 0.12;
        ico.rotation.x = t * 0.35;
        torus.rotation.z = t * 0.4;
        oct.rotation.y = t * 0.5;
        particles.rotation.y = t * 0.08;
      }
      renderer.render(scene, camera);
    };

    const animate = () => {
      renderFrame();
      frameId = window.requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      renderFrame();
    } else {
      animate();
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      octGeo.dispose();
      oct.material.dispose();
      particlesGeo.dispose();
      particles.material.dispose();
      icoWire.geometry.dispose();
      icoWire.material.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={containerRef} className={styles.canvasHost} />
      <div className={styles.veil} />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import * as THREE from 'three';

const NODE_INFO = {
  APP: 'Application service',
  EC2: 'Compute layer',
  RDS: 'Managed database',
  AWS: 'Cloud environment',
};

function ThreeArt({ variant, onReady }) {
  const hostRef = useRef(null);
  const activeRef = useRef(null);
  const expandedRef = useRef(false);
  const pausedRef = useRef(false);
  const syncAnimationRef = useRef(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const [ready, setReady] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof WebGL2RenderingContext === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup = () => {};
    let initialized = false;
    const initialize = () => {
      if (initialized) return;
      initialized = true;
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      const context = canvas.getContext('webgl2', { antialias: true, alpha: true });
      if (!context) return;

      let renderer;
      try { renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: true, powerPreference: 'low-power' }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, variant === 'hero' ? 8.5 : 8);
      const group = new THREE.Group();
      scene.add(group);
      scene.add(new THREE.AmbientLight(0xffffff, 2.3));
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
      keyLight.position.set(3, 4, 6);
      scene.add(keyLight);

      const dark = new THREE.MeshStandardMaterial({ color: 0x315844, metalness: 0.12, roughness: 0.72 });
      const light = new THREE.MeshStandardMaterial({ color: 0xeaf1e8, metalness: 0.04, roughness: 0.86 });
      const edge = new THREE.LineBasicMaterial({ color: 0x6f9276, transparent: true, opacity: 0.78 });
      const nodes = [];
      const particles = [];
      const panes = [];
      let ring;
      let resizeObserver;
      let visibilityObserver;
      let isVisible = true;
      let scrollAmount = 0;
      const pointer = new THREE.Vector2();
      const raycaster = new THREE.Raycaster();

      const addWireBox = (width, height, depth, material, parent = group) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
        parent.add(mesh);
        const outline = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edge);
        mesh.add(outline);
        return mesh;
      };
      const addLine = (start, end, color = 0x779a7e) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
        const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }));
        group.add(line);
      };

      if (variant === 'hero') {
        ring = new THREE.Group();
        group.add(ring);
        [1.65, 1.92, 2.2].forEach((radius, index) => {
          const torus = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.009, 5, 110), new THREE.MeshBasicMaterial({ color: index === 1 ? 0x71947b : 0xadc3a9, transparent: true, opacity: index === 1 ? 0.85 : 0.7 }));
          torus.rotation.x = index * 0.42 + 0.28;
          torus.rotation.y = index * 0.35;
          ring.add(torus);
        });
        for (let i = 0; i < 18; i++) {
          const angle = i * Math.PI * 2 / 18;
          const point = new THREE.Mesh(new THREE.SphereGeometry(0.024, 8, 8), dark);
          point.position.set(Math.cos(angle) * 2.16, Math.sin(angle) * 2.16, Math.sin(angle * 3) * 0.35);
          ring.add(point);
        }
      }

      if (variant === 'cloud') {
        const positions = { APP: [0, 1.35, 0], EC2: [-1.8, 0.15, 0.3], RDS: [1.8, 0.15, 0.3], AWS: [0, -1.35, 0] };
        [['APP', 'EC2'], ['APP', 'RDS'], ['EC2', 'AWS'], ['RDS', 'AWS'], ['EC2', 'RDS']].forEach(([a, b]) => addLine(positions[a], positions[b]));
        Object.entries(positions).forEach(([name, position]) => {
          const node = addWireBox(name === 'APP' ? 0.76 : 0.68, 0.53, 0.42, name === 'APP' ? dark : light);
          node.position.set(...position);
          node.userData.name = name;
          nodes.push(node);
        });
      }

      if (variant === 'data') {
        const layerMaterials = [
          new THREE.MeshStandardMaterial({ color: 0xc6a77d, transparent: true, opacity: 0.72, side: THREE.DoubleSide }),
          new THREE.MeshStandardMaterial({ color: 0xc4cfc4, transparent: true, opacity: 0.72, side: THREE.DoubleSide }),
          new THREE.MeshStandardMaterial({ color: 0xe5c77f, transparent: true, opacity: 0.76, side: THREE.DoubleSide }),
        ];
        [-1.05, 0, 1.05].forEach((y, index) => {
          const slab = addWireBox(3.5, 0.14, 1.75, layerMaterials[index]);
          slab.position.y = y;
          slab.rotation.y = -0.25;
          slab.rotation.x = -0.15;
        });
        for (let i = 0; i < 20; i++) {
          const particle = new THREE.Mesh(new THREE.SphereGeometry(0.035, 7, 7), new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xb89452 : 0x52785f }));
          particle.position.x = ((i * 13) % 19 - 9) * 0.13;
          particle.position.z = ((i * 7) % 11 - 5) * 0.1;
          group.add(particle);
          particles.push(particle);
        }
      }

      if (variant === 'tile') {
        for (let i = 0; i < 4; i++) {
          const pane = new THREE.Group();
          const face = addWireBox(1.5, 0.86, 0.09, new THREE.MeshStandardMaterial({ color: 0x263a2d, metalness: 0.08, roughness: 0.72 }), pane);
          face.position.z = 0;
          for (let row = 0; row < 3; row++) {
            const line = new THREE.Mesh(new THREE.BoxGeometry(row === 1 ? 0.9 : 0.48, 0.018, 0.004), new THREE.MeshBasicMaterial({ color: row === 0 ? 0xb4cbb5 : 0x779d7c }));
            line.position.set(row === 1 ? -0.05 : -0.27, 0.23 - row * 0.17, 0.053);
            pane.add(line);
          }
          pane.position.set((i % 2 ? 0.83 : -0.83), (i < 2 ? 0.5 : -0.5), (i % 2 ? -0.16 : 0.16));
          pane.rotation.y = i % 2 ? -0.12 : 0.12;
          group.add(pane);
          panes.push(pane);
        }
      }

      const resize = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      const onPointerMove = (event) => {
        const bounds = host.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        if (variant !== 'cloud') return;
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(nodes, false)[0];
        const name = hit?.object.userData.name || null;
        activeRef.current = name;
        setActiveNode(name);
        host.style.cursor = name ? 'pointer' : 'default';
      };
      const onPointerLeave = () => { pointer.set(0, 0); if (variant === 'cloud') { activeRef.current = null; setActiveNode(null); } };
      const onScroll = () => {
        const rect = host.getBoundingClientRect();
        scrollAmount = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      };
      host.addEventListener('pointermove', onPointerMove);
      host.addEventListener('pointerleave', onPointerLeave);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      const animate = (time) => {
        const seconds = time * 0.001;
        if (variant === 'hero') {
          ring.rotation.y = seconds * 0.08 + pointer.x * 0.18;
          ring.rotation.x = pointer.y * 0.1;
        }
        if (variant === 'cloud') {
          group.rotation.y += (pointer.x * 0.1 - group.rotation.y) * 0.04;
          group.rotation.x += (-pointer.y * 0.06 - group.rotation.x) * 0.04;
          nodes.forEach((node) => {
            const target = activeRef.current === node.userData.name ? 1.16 : 1;
            node.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
          });
        }
        if (variant === 'data') {
          group.rotation.y = -0.19 + pointer.x * 0.08;
          particles.forEach((particle, index) => {
            const phase = (index / particles.length + seconds * 0.11 + scrollAmount * 0.8) % 1;
            particle.position.y = phase * 3.1 - 1.55;
            particle.scale.setScalar(0.7 + phase * 0.65);
          });
        }
        if (variant === 'tile') {
          panes.forEach((pane, index) => {
            const expanded = expandedRef.current;
            const x = (index % 2 ? 1 : -1) * (expanded ? 1.14 : 0.83);
            const y = (index < 2 ? 1 : -1) * (expanded ? 0.67 : 0.5);
            const z = expanded ? (index % 2 ? 0.55 : -0.2) : (index % 2 ? -0.16 : 0.16);
            pane.position.lerp(new THREE.Vector3(x, y, z), 0.08);
            pane.rotation.y += ((expanded ? (index % 2 ? -0.24 : 0.24) : (index % 2 ? -0.12 : 0.12)) - pane.rotation.y) * 0.08;
          });
          group.rotation.y = Math.sin(seconds * 0.3) * 0.04;
        }
        renderer.render(scene, camera);
      };
      renderer.render(scene, camera);
      const syncAnimation = () => renderer.setAnimationLoop(isVisible && !pausedRef.current ? animate : null);
      syncAnimationRef.current = syncAnimation;
      syncAnimation();

      if ('IntersectionObserver' in window) {
        visibilityObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting === isVisible) return;
          isVisible = entry.isIntersecting;
          syncAnimation();
        }, { threshold: 0.02 });
        visibilityObserver.observe(host);
      }

      setReady(true);
      onReadyRef.current?.();
      cleanup = () => {
        renderer.setAnimationLoop(null);
        syncAnimationRef.current = null;
        resizeObserver.disconnect();
        visibilityObserver?.disconnect();
        host.removeEventListener('pointermove', onPointerMove);
        host.removeEventListener('pointerleave', onPointerLeave);
        window.removeEventListener('scroll', onScroll);
        scene.traverse((object) => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material?.dispose();
        });
        [dark, light, edge].forEach((material) => material.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { observer.disconnect(); initialize(); } }, { rootMargin: '180px' });
      observer.observe(host);
      return () => { observer.disconnect(); cleanup(); };
    }
    initialize();
    return () => cleanup();
  }, [variant]);

  const toggleTile = () => { expandedRef.current = !expandedRef.current; setExpanded(expandedRef.current); };
  const togglePause = () => { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); syncAnimationRef.current?.(); };
  return <div className={`three-stage three-${variant} ${ready ? 'ready' : ''}`}>
    <div className="three-canvas-host" ref={hostRef} aria-hidden="true" />
    {ready && <button className="three-motion-toggle" type="button" onClick={togglePause} aria-label={paused ? `Play ${variant} animation` : `Pause ${variant} animation`} title={paused ? 'Play motion' : 'Pause motion'}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}<span>{paused ? 'Play' : 'Pause'}</span></button>}
    {variant === 'cloud' && ready && <div className={activeNode ? 'three-node-control is-active' : 'three-node-control'} aria-label="Explore infrastructure nodes">{Object.keys(NODE_INFO).map((name) => <button key={name} type="button" className={activeNode === name ? 'selected' : ''} onMouseEnter={() => { activeRef.current = name; setActiveNode(name); }} onMouseLeave={() => { activeRef.current = null; setActiveNode(null); }} onFocus={() => { activeRef.current = name; setActiveNode(name); }} onBlur={() => { activeRef.current = null; setActiveNode(null); }} onClick={() => { activeRef.current = name; setActiveNode(name); }}>{name}</button>)}<span>{activeNode ? NODE_INFO[activeNode] : 'Explore the architecture'}</span></div>}
    {variant === 'data' && ready && <div className="three-data-legend" aria-hidden="true"><span>GOLD</span><span>SILVER</span><span>BRONZE</span></div>}
    {variant === 'tile' && ready && <button className="three-tile-toggle" type="button" onClick={toggleTile}>{expanded ? 'Gather panes' : 'Rearrange panes'}</button>}
  </div>;
}

export default ThreeArt;

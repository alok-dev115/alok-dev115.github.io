import * as THREE from 'three';

// --- Configuration ---
const PARTICLE_COUNT = 15000; // Increased for a denser look
let scene, camera, renderer, particles, geometry;
let fingerX = 0, fingerY = 0;
let lerpFingerX = 0, lerpFingerY = 0;

// Zoom control variables
let currentZoom = 5; 
let targetZoom = 5;
const MIN_ZOOM = 2;
const MAX_ZOOM = 15;

const videoElement = document.getElementById('video');
const statusElement = document.getElementById('status');

initThree();
initHandTracking();
animate();

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = currentZoom;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // --- Particle Setup: Planetary Distribution ---
    geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // 1. Math for Dense Core:
        // We use a power function on the radius (Math.pow(random, 3)).
        // This makes values close to 0 much more likely than values close to 1.
        const radius = Math.pow(Math.random(), 3) * 6; 
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = radius * Math.cos(phi);

        // 2. Color: Center is hot (white/cyan), outer is cool (blue/purple)
        const mixedColor = new THREE.Color();
        const hue = 0.5 + (radius / 12); // Shifting from Cyan to Purple
        mixedColor.setHSL(hue, 0.8, 0.5);
        
        // Add a "hot" center by whitening inner particles
        if (radius < 1) mixedColor.lerp(new THREE.Color(0xffffff), 1 - radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
        
        sizes[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add a Central Core Glow
    const coreGeom = new THREE.SphereGeometry(0.4, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);
}

function initHandTracking() {
    const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
    });

    hands.onResults(onResults);

    const cameraInput = new Camera(videoElement, {
        onFrame: async () => { await hands.send({ image: videoElement }); },
        width: 640, height: 480
    });
    cameraInput.start();
}

function onResults(results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0];
        
        // Landmark 8: Index Tip, Landmark 4: Thumb Tip
        const index = hand[8];
        const thumb = hand[4];

        // 1. Calculate Cursor Position (Tracking Index)
        fingerX = (1 - index.x - 0.5) * 15;
        fingerY = -(index.y - 0.5) * 12;

        // 2. Calculate Zoom (Distance between Thumb and Index)
        const dx = index.x - thumb.x;
        const dy = index.y - thumb.y;
        const dz = index.z - thumb.z;
        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

        // Map distance (roughly 0.05 to 0.4) to Zoom range
        // Pinch tight = Zoom In (smaller number), Spread wide = Zoom Out
        targetZoom = THREE.MathUtils.mapLinear(distance, 0.05, 0.3, MIN_ZOOM, MAX_ZOOM);
        
        statusElement.innerText = "Tracking: Pinch to Zoom";
    } else {
        statusElement.innerText = "Show hand to camera";
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth movement and zoom
    lerpFingerX += (fingerX - lerpFingerX) * 0.1;
    lerpFingerY += (fingerY - lerpFingerY) * 0.1;
    currentZoom += (targetZoom - currentZoom) * 0.1;

    // Apply Zoom
    camera.position.z = currentZoom;

    // Interaction: Particles react to finger position
    const positions = geometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Subtle orbit movement
        const x = positions[i3];
        const y = positions[i3+1];
        positions[i3] += Math.cos(y * 0.1) * 0.01;
        positions[i3+1] += Math.sin(x * 0.1) * 0.01;
    }
    geometry.attributes.position.needsUpdate = true;

    // Rotation
    particles.rotation.y += 0.002;
    particles.rotation.z += 0.001;
    
    // Slight tilt based on finger
    particles.rotation.x = lerpFingerY * 0.05;
    particles.rotation.y += lerpFingerX * 0.05;

    renderer.render(scene, camera);
}
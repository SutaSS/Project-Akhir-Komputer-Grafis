import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { planetData } from './planetData.js';

// ========================================
// SCENE SETUP
// ========================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
camera.position.set(0, 80, 140);

// ========================================
// RAYCASTER & TEXTURE LOADER
// ========================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const textureLoader = new THREE.TextureLoader();

// ========================================
// CREATE SUN
// ========================================
const sunMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 }); 
try { 
    sunMat.map = textureLoader.load('./texture/matahari.png'); 
} catch(e) {
    console.warn('Sun texture not loaded');
}

const sun = new THREE.Mesh(new THREE.SphereGeometry(7, 64, 64), sunMat);
scene.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 1200, 400);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.bias = -0.00005;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 200;

sun.add(sunLight);
scene.add(new THREE.AmbientLight(0x404040, 0.2));

// ========================================
// CREATE PLANETS
// ========================================
const planetsMeshList = [];

planetData.forEach((data) => {
    const mat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 });
    
    try { 
        mat.map = textureLoader.load(data.texture); 
        mat.color = new THREE.Color(0xffffff); 
    } catch(e) {
        console.warn(`Texture for ${data.name} not loaded`);
    }
    
    const planet = new THREE.Mesh(new THREE.SphereGeometry(data.size, 32, 32), mat);
    planet.castShadow = true; 
    planet.receiveShadow = true;
    planet.userData = { ...data, angle: Math.random() * Math.PI * 2 };

    // Create orbit ring
    const orbit = new THREE.Mesh(
        new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 128), 
        new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            side: THREE.DoubleSide, 
            opacity: 0.1, 
            transparent: true 
        })
    );
    orbit.rotation.x = -Math.PI / 2;
    scene.add(orbit);

    // Add rings (Saturn)
    if (data.hasRing) {
        const ring = new THREE.Mesh(
            new THREE.RingGeometry(data.size + 1.5, data.size + 4, 64), 
            new THREE.MeshStandardMaterial({ 
                color: 0xAA8866, 
                side: THREE.DoubleSide, 
                transparent: true, 
                opacity: 0.8 
            })
        );
        ring.rotation.x = -Math.PI / 2; 
        ring.rotation.y = -0.2;
        ring.receiveShadow = true; 
        planet.add(ring);
    }

    // Add moon (Earth)
    if (data.hasMoon) {
        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(data.size * 0.3), 
            new THREE.MeshStandardMaterial({ color: 0xdddddd })
        );
        
        try { 
            moon.material.map = textureLoader.load('./texture/bulan.jpg'); 
        } catch(e) {
            console.warn('Moon texture not loaded');
        }
        
        moon.position.set(data.size + 2, 0, 0);
        moon.castShadow = true;
        moon.receiveShadow = true;
        planet.add(moon);
        planet.moon = moon;
    }

    scene.add(planet);
    planetsMeshList.push(planet);
});

// ========================================
// CREATE STARS
// ========================================
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ size: 0.2, color: 0xffffff });
const starsVertices = new Float32Array(3000).map(() => (Math.random() - 0.5) * 800);
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// ========================================
// GAME STATE
// ========================================
let isGameActive = false;
let focusTarget = null;
let isTransitioning = false;

// ========================================
// DOM ELEMENTS
// ========================================
const gameBtn = document.getElementById('game-btn');
const revSpeedInput = document.getElementById('revolutionSpeed');
const rotSpeedInput = document.getElementById('rotationSpeed');
const lightInput = document.getElementById('lightIntensity');
const quizModal = document.getElementById('quiz-modal');
const planetTooltip = document.getElementById('planet-tooltip');

// ========================================
// START GAME FUNCTION
// ========================================
window.startGame = () => {
    const splashScreen = document.getElementById('splash-screen');
    splashScreen.classList.add('hidden');
    
    setTimeout(() => {
        splashScreen.style.display = 'none';
        document.getElementById('controls').style.display = 'flex';
        gameBtn.style.display = 'block';
        isGameActive = true;
        revSpeedInput.value = 0.5;
    }, 800);
};

// ========================================
// END GAME FUNCTION
// ========================================
gameBtn.addEventListener('click', () => {
    isGameActive = false;
    document.getElementById('controls').style.display = 'none';
    gameBtn.style.display = 'none';
    document.getElementById('splash-screen').style.display = 'flex';
    document.getElementById('splash-screen').classList.remove('hidden');
    revSpeedInput.value = 1;
    closeModal();
});

// ========================================
// MOUSE MOVE EVENT (Tooltip)
// ========================================
window.addEventListener('mousemove', (event) => {
    if (!isGameActive) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetsMeshList);
    
    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        planetTooltip.style.display = 'block';
        planetTooltip.style.left = (event.clientX + 20) + 'px';
        planetTooltip.style.top = (event.clientY - 40) + 'px';
    } else {
        document.body.style.cursor = 'default';
        planetTooltip.style.display = 'none';
    }
});

// ========================================
// CLICK EVENT (Show Quiz)
// ========================================
window.addEventListener('click', (event) => {
    if (!isGameActive) return;
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetsMeshList);

    if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        focusTarget = clickedPlanet;
        isTransitioning = true;
        planetTooltip.style.display = 'none';
        showQuiz(clickedPlanet.userData);
    }
});

// ========================================
// SHOW QUIZ FUNCTION
// ========================================
function showQuiz(pData) {
    quizModal.style.display = 'block';
    
    // Random question selection
    const randomQuestion = pData.questions[Math.floor(Math.random() * pData.questions.length)];
    document.getElementById('question-text').textContent = randomQuestion;
    document.getElementById('feedback').style.display = 'none';
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    // Create options
    let options = [pData.name];
    const others = planetsMeshList
        .map(p => p.userData.name)
        .filter(n => n !== pData.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    options = options.concat(others).sort(() => 0.5 - Math.random());

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, pData.name);
        container.appendChild(btn);
    });
}

// ========================================
// CHECK ANSWER FUNCTION
// ========================================
window.checkAnswer = (selected, correct) => {
    const fb = document.getElementById('feedback');
    fb.style.display = 'block';
    
    if (selected === correct) { 
        fb.textContent = "✅ BENAR!"; 
        fb.className = "correct"; 
    } else { 
        fb.textContent = "❌ SALAH!"; 
        fb.className = "wrong"; 
    }
};

// ========================================
// CLOSE MODAL FUNCTION
// ========================================
window.closeModal = () => {
    quizModal.style.display = 'none';
    focusTarget = null;
    isTransitioning = false;
};

// ========================================
// ANIMATION LOOP
// ========================================
function animate() {
    requestAnimationFrame(animate);
    
    const revSpeed = parseFloat(revSpeedInput.value);
    const rotSpeed = parseFloat(rotSpeedInput.value);

    // Rotate sun
    sun.rotation.y += 0.002 * rotSpeed;
    sunLight.intensity = parseFloat(lightInput.value);

    // Animate planets
    planetsMeshList.forEach(planet => {
        planet.rotation.y += 0.01 * rotSpeed;

        // Orbit (stop if focused)
        if (planet !== focusTarget) {
            planet.userData.angle += 0.002 * planet.userData.speed * revSpeed;
            planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
            planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
        }

        // Animate moon
        if (planet.moon) {
            const time = Date.now() * 0.001; 
            planet.moon.position.x = Math.cos(time) * (planet.geometry.parameters.radius + 2);
            planet.moon.position.z = Math.sin(time) * (planet.geometry.parameters.radius + 2);
        }
    });

    // Camera logic (zoom to focused planet)
    if (focusTarget) {
        controls.target.copy(focusTarget.position);

        if (isTransitioning) {
            const offsetDistance = focusTarget.geometry.parameters.radius * 5;
            const targetPos = new THREE.Vector3(
                focusTarget.position.x + offsetDistance, 
                focusTarget.position.y + (offsetDistance * 0.5), 
                focusTarget.position.z + offsetDistance 
            );
            
            camera.position.lerp(targetPos, 0.05);
            
            if (camera.position.distanceTo(targetPos) < 0.5) {
                isTransitioning = false; 
            }
        }
    } else {
        controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

// ========================================
// WINDOW RESIZE EVENT
// ========================================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

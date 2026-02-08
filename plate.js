// THREE.js 3D background – soft floating particles

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 40;

// Create floating particles
const particles = new THREE.BufferGeometry();
const count = 800;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 200;
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x4b7cff,
  size: 0.6,
  transparent: true,
  opacity: 0.7
});

const points = new THREE.Points(particles, material);
scene.add(points);

// Soft colour gradient light
const light = new THREE.PointLight(0xff9b5a, 1, 200);
light.position.set(20, 20, 40);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  points.rotation.x += 0.0006;
  points.rotation.y += 0.0009;

  renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll to intro button
const scrollIntro = document.getElementById("scrollIntro");
const introSection = document.getElementById("intro");

scrollIntro.addEventListener("click", () => {
  introSection.scrollIntoView({ behavior: "smooth" });
});

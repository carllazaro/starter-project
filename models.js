// Import THREE.js core
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// Import GLTF loader
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create the renderer with alpha for transparency
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Set the camera to view from the side
camera.position.set(50, 0, 0); // Move to the side
camera.lookAt(0, 0, 0);        // Look at model center

// Lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Load the GLTF model
const loader = new GLTFLoader();
let object;
const objToRender = "eye"; // Update with your model folder name

loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;

    // Scale the model (adjust as needed)
    object.scale.set(0.5, 0.5, 0.5);

    // Lay the model flat like a log
    object.rotation.x = Math.PI / 2;

    // Add to scene first
    scene.add(object);

    // Center the model in the scene using bounding box
    const box = new THREE.Box3().setFromObject(object);
    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center); // Shift so it's centered at (0, 0, 0)
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Spin the model like a rolling log
  if (object) {
    object.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

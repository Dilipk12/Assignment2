
// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Room (100x100 sqft, assume 1 unit = 1 sqft)
const roomGeometry = new THREE.BoxGeometry(100, 50, 100); // Height is 50 for visual clarity
const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true });
const room = new THREE.Mesh(roomGeometry, roomMaterial);
room.position.set(0, 25, 0);
scene.add(room);

// Object (a simple cube)
const objectGeometry = new THREE.BoxGeometry(5, 5, 5);
const objectMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(objectGeometry, objectMaterial);
cube.position.set(0, 5, 0);
scene.add(cube);

// Camera position
camera.position.set(0, 50, 150);
camera.lookAt(0, 25, 0);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Drag Controls
const dragControls = new THREE.DragControls([cube], camera, renderer.domElement);
dragControls.addEventListener('dragstart', function (event) {
    controls.enabled = false;
});
dragControls.addEventListener('dragend', function (event) {
    controls.enabled = true;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Window resize handling
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

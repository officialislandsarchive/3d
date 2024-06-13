// Import necessary modules from Three.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OBJExporter } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/js/exporters/OBJExporter.js';

let scene, camera, renderer, cube;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Geometry and Material
    const geometry = new THREE.BoxGeometry();
    const loader = new THREE.TextureLoader();
    const materials = [
        new THREE.MeshBasicMaterial({ map: loader.load('https://path-to-your-textures/grass_top.png') }), // top
        new THREE.MeshBasicMaterial({ map: loader.load('https://path-to-your-textures/grass_side.png') }), // side
        new THREE.MeshBasicMaterial({ map: loader.load('https://path-to-your-textures/dirt.png') }), // bottom
        new THREE.MeshBasicMaterial({ map: loader.load('https://path-to-your-textures/grass_side.png') }), // side
        new THREE.MeshBasicMaterial({ map: loader.load('https://path-to-your-textures/grass_side.png') }), // side
        new THREE.MeshBasicMaterial({ map: loader.load('https://path-to-your-textures/grass_side.png') }), // side
    ];

    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 5;

    // Download button
    document.getElementById('download').addEventListener('click', downloadModel);
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function downloadModel() {
    const exporter = new OBJExporter();
    const objData = exporter.parse(cube);

    const blob = new Blob([objData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'grass_block.obj';
    link.click();
}

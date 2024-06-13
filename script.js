// Import necessary modules from Three.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OBJExporter } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/js/exporters/OBJExporter.js';

let scene, camera, renderer, island;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Terrain (Island)
    const islandGeometry = new THREE.CylinderGeometry(5, 5, 1, 32);
    const islandMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.position.y = -1;
    scene.add(island);

    // Simple Tree
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;
    
    const foliageGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 1.5;
    
    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(foliage);
    tree.position.set(1, -0.5, 1);
    scene.add(tree);

    // Simple Structure (House)
    const houseGeometry = new THREE.BoxGeometry(2, 1.5, 2);
    const houseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(-2, -0.25, -2);
    scene.add(house);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);

    // Camera position
    camera.position.z = 10;
    
    // Download button
    const button = document.createElement('button');
    button.textContent = 'Download 3D Model';
    button.style.position = 'absolute';
    button.style.top = '10px';
    button.style.left = '10px';
    button.onclick = downloadModel;
    document.body.appendChild(button);
    
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    island.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function downloadModel() {
    const exporter = new OBJExporter();
    const objData = exporter.parse(scene);

    const blob = new Blob([objData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'starter_island.obj';
    link.click();
}

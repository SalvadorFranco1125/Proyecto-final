import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = false;

//Escena
scene.background = new THREE.Color(0x24252a);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xff0123, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Contenedor para el modelo 3D
const modelContainer = new THREE.Group();
scene.add(modelContainer);

// Cargador de FBX
const fbxLoader = new FBXLoader();

// Cargar el objeto FBX
fbxLoader.load('Graves_Uv.fbx', function(object) {
  // Escalar el objeto si es necesario
  object.scale.set(0.01, 0.01, 0.01);
  
  // Posicionar el objeto dentro del contenedor
  object.position.set(0, 0, 0);
  
  // Agregar el objeto al contenedor en lugar de directo a la escena
  modelContainer.add(object);
  
  console.log('Objeto FBX cargado correctamente');
}, 
// Callback de progreso
function(xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% cargado');
},
// Callback de error
function(error) {
  console.error('Error al cargar el FBX:', error);
});

modelContainer.scale.set(5,5,5);


// Posicionar la cámara
camera.position.z = 10;
controls.target.set(0, 0, 0);
controls.update();

// Manejar redimensionamiento de la ventana
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate( time ) {
  controls.update();
  renderer.render( scene, camera );
}
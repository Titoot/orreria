import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//const renderer = new THREE.WebGLRenderer(); 
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
// container.appendChild( renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set( 0, 0, - 0.2 );
controls.update();
// renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material ); 
// scene.add( cube );
camera.position.z = 5; 

const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(light);

new RGBELoader().load( '/moonless_golf_1k.hdr', function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = texture;
    scene.environment = texture;

   // render();

   const loader = new GLTFLoader(); 

    loader.load('/Moon_1_3474.glb', async function (gltf) {
        console.log('Model loaded successfully');
        await renderer.compileAsync( gltf.scene, camera, scene );
        scene.add(gltf.scene);
        render();
    }, undefined, function (error) {
        console.error('An error occurred loading the model', error);
    });

})



function render() {

    renderer.render( scene, camera );

}

// function animate() { 
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01; 
//     renderer.render( scene, camera ); 
// }

// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();
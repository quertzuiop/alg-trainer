import * as THREE from "../node_modules/three/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, -100, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( 500,500 );
document.body.appendChild( renderer.domElement );

const moveMap = {
	"U": [0, 1],
	"U'": [0, -1],
	"U2": [0, 2],
	"D": [1, 1],
	"D'": [1, -1],
	"D2": [1, 2],
	"F": [2, 1],
	"F'": [2, -1],
	"F2": [2, 2],
	"B": [3, 1],
	"B'": [3, -1],
	"B2": [3, 2],
	"L": [4, 1],
	"L'": [4, -1],
	"L2": [4, 2],
	"R": [5, 1],
	"R'": [5, -1],
	"R2": [5, 2]
}
const testCube = [
	[[1, 2, 3], [4, 5, 6], [7, 8, 9]],
	[[10, 11, 12], [13, 14, 15], [16, 17, 18]],
	[[19, 20, 21], [22, 23, 24], [25, 26, 27]]
];
console.log(split3DArray(testCube, 1, 1));

function rotateCube(move, cube) {
	let [face, direction] = moveMap[move];
	axis = Math.floor(face/2);
	let depth = face > 2 ? 2 : 1;
	let halves = split3DArray(cube, axis, depth);
	let movingHalf = halves[face>2 ? 1 : 0];
	let stationaryHalf = halves[face>2 ? 0 : 1];

};
function split3DArray(array, axis, depth) {
	if (axis === 0) {
	  return [array.slice(depth), array.slice(0, depth)];
	} else if (axis === 1) {
	  return [array.map(row => row.slice(depth)), array.map(row => row.slice(0, depth))];
	} else {
	  return [array.map(row => row.map(cell => cell[depth])), array.map(row => row.map(cell => cell.slice(0, depth)))];		
  }
};
function rotate3DArray(array, axis, direction) {
	if (axis === 0) {
		return array.map(row => row.map(cell => cell));
	} else if (axis === 1) {
		return array.map(row => row.map(cell => cell));
	} else {
		return array.map(row => row.map(cell => cell));
	}
}
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const materials = [new THREE.MeshBasicMaterial( { color: 0xfffffff } ), new THREE.MeshBasicMaterial( { color: 0xfffff00 } ), new THREE.MeshBasicMaterial( { color: 0x00fffff } ), new THREE.MeshBasicMaterial( { color: 0xfff0000 } ), new THREE.MeshBasicMaterial( { color: 0xff00fff } ), new THREE.MeshBasicMaterial( { color: 0x00fff00 } )]
//const cube = new THREE.Mesh( geometry, materials );
let cube = [[[], [], []], [[], [], []], [[], [], []]];
const cubeModel = new THREE.Object3D();
cubeModel.x = -5 
cubeModel.y = 2
cubeModel.z = 2
for (let i=0; i<3; i++) {
	for (let j=0; j<3; j++) {
		for (let k=0; k<3; k++) {
			cube[i][j][k] = new THREE.Mesh( geometry, materials );
			cube[i][j][k].position.set(2*i-1, 2*j-1, 2*k-1);
			cubeModel.add(cube[i][j][k]);
		}
	}
}
scene.add(cubeModel);

function animate() {
	requestAnimationFrame( animate );

	cubeModel.rotation.x += 0.01;
	cubeModel.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();
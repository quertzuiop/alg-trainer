import * as THREE from "../node_modules/three/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, -100, 100);
//rotate camera for isometric view
camera.rotation.y = -Math.PI/4;
camera.rotation.x = Math.PI/4;
camera.rotation.z = Math.PI/2;
//camera.rotation.y = -Math.PI/2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 500,500 );
document.body.appendChild( renderer.domElement );

const moveMap = {
	"U": [0, 1],
	"U'": [0, 3],
	"U2": [0, 2],
	"D": [1, 1],
	"D'": [1, 3],
	"D2": [1, 2],
	"F": [2, 1],
	"F'": [2, 3],
	"F2": [2, 2],
	"B": [3, 1],
	"B'": [3, 3],
	"B2": [3, 2],
	"L": [4, 1],
	"L'": [4, 3],
	"L2": [4, 2],
	"R": [5, 1],
	"R'": [5, 3],
	"R2": [5, 2]
}

function animateModel(cubieGroup, axis, depth, amount) {
	let ax = ["x", "y", "z"][axis];

}
let angle = 0;

function rotateModel(move, cubeModel){
	let [face, numRot] = moveMap[move];
	let axis = Math.floor(face/2);
    let ax = ["x", "y", "z"][axis];
    let paxes = ["y", "z", "x"].filter(pax => pax !== ax);
	let depth = face % 2 == 0 ? 0 : 1;

    let targetAngle = Math.PI/2 * numRot;
    let axisName = ["x", "y", "z"][axis];
    let angle = numRot * Math.PI/2;
    let speed = 0.05;

    function rotate() {
        let cubieGroup = new THREE.Object3D();
        let cubiesFound = 0;
        let pos = new THREE.Vector3();
        let center = getFaceCenter(ax, depth); 
        console.log(center);
        const dummy = new THREE.Object3D();
        dummy.position.set(-center.x, -center.y, - center.z);
        for (let i = 0; i < cubeModel.children.length; i++) {
            //get world position
            let cubie = cubeModel.children[i-cubiesFound]; // when .add is called, it removes the child from the arr for some reason
            cubie.getWorldPosition(pos);
            if (Math.abs(pos[axisName] - depth) < 0.1) {
                cubieGroup.add(cubie);
                cubiesFound++;
            }
        }
       
        scene.add(cubieGroup);
        let offset1 = Math.sin(angle-Math.PI/4);
        let offset2 = Math.cos(angle-Math.PI/4);
        //  cubieGroup.position.add(center);
        //cubieGroup.position.set(center.x, center.y, center.z);
        for (let a = 0; a < 40; a++) {
            setTimeout(() => {
                cubieGroup.rotateOnWorldAxis(new THREE.Vector3(ax=="x"?1:0, ax=="y"?1:0, ax=="z"?1:0), targetAngle/40); 
                cubieGroup.position.set(0, offset1, offset2);
                //cubieGroup.position.set(0, 0, 0);
                
                for (let i = 0; i < cubieGroup.children.length; i++) {
                    cubeModel.add(cubieGroup.children[0]);
                    //update
                    
                }
                //add sphere at group center
                
                scene.add(cubeModel);
                renderer.render(scene, camera);
            }, a*100);
        }
    }
    rotate();
}
function getFaceCenter(ax, depth) {
    let center = new THREE.Vector3();
    if (ax === "x") { 
        center.set(depth * 2.2, 1.1, 1.1);
    } else if (ax === "y") {
        center.set(1.1, depth * 2.2, 1.1);
    } else if (ax === "z") {
        center.set(1.1, 1.1, depth * 2.2);
    }
    return center;
}
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const materials = [new THREE.MeshBasicMaterial( { color: 0xfffffff } ), new THREE.MeshBasicMaterial( { color: 0xfffff00 } ), new THREE.MeshBasicMaterial( { color: 0x00fffff } ), new THREE.MeshBasicMaterial( { color: 0xfff0000 } ), new THREE.MeshBasicMaterial( { color: 0xff00fff } ), new THREE.MeshBasicMaterial( { color: 0x00fff00 } )]
//const cube = new THREE.Mesh( geometry, materials );
let cube = [[[], [], []], [[], [], []], [[], [], []]];
let cubeModel = new THREE.Object3D();

for (let i=0; i<3; i++) {
	for (let j=0; j<3; j++) {
		for (let k=0; k<3; k++) {
			cube[i][j][k] = new THREE.Mesh( geometry, materials );
			cube[i][j][k].position.set(i*1.1, j*1.1, k*1.1);
			cubeModel.add(cube[i][j][k]);
		}
	}
}
scene.add(cubeModel);
function animateF() {
	setTimeout(() => {
		requestAnimationFrame( animateU );
	}, 2000);
	renderer.render( scene, camera );
	rotateModel("F", cubeModel);
}
function animateU() {
	setTimeout(() => {
		requestAnimationFrame( animateF );
	}, 2000);
	renderer.render( scene, camera );
	rotateModel("U", cubeModel);
}
function requestFrame(callback) {
	requestAnimationFrame(callback);
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
sleep(1000).then(() => {
	animateU(cube, cubeModel);
});
import * as THREE from 'three';
const OrbitControls = require("three-orbit-controls")(THREE)
const STLLoader = require("three-stl-loader")(THREE)

const degreeToRadian = deg => (2*Math.PI*deg)/360

function transformIntoStlViewer(el){
	const getAttr = attr => el.getAttribute(attr)
	const modelUrl = getAttr("data-stl-url")
	const color = new THREE.Color(getAttr("data-color") || 0xbbbdbf)
	const initialOffsets = [
		(Number(getAttr("data-angle-offset-x")) || -90),
		(Number(getAttr("data-angle-offset-y")) || 0),
		(Number(getAttr("data-angle-offset-z")) || 0),
	].map(degreeToRadian);
	const { clientWidth, clientHeight } = el;
	const camera = new THREE.PerspectiveCamera(70, clientWidth/clientHeight, 1, 1000)
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(clientWidth, clientHeight);
	renderer.setClearColor( 0x000000, 0 );

	el.appendChild(renderer.domElement)

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.rotateSpeed = 0.05;
	controls.dampingFactor = 0.1;
	controls.enableZoom = true;
	controls.autoRotate = true;
	controls.autoRotateSpeed = .75;

	function animate(){
		requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	}

	const scene = new THREE.Scene();
	scene.add(new THREE.HemisphereLight(0xeeeeee, 0xbbbbbb, 1.5));

	function onLoadStl (geometry) {
		const material = new THREE.MeshPhongMaterial({ 
        color, 
        specular: 100, 
				shininess: 100
		});
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const middle = new THREE.Vector3();
		geometry.computeBoundingBox();
		geometry.boundingBox.getCenter(middle);
		mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(
			-middle.x, -middle.y, -middle.z
		));
		// mesh.rotation.set(-Math.PI/4, 0,  0);
		mesh.rotation.set(...initialOffsets);

		const largestDimension = Math.max(
			geometry.boundingBox.max.x,
			geometry.boundingBox.max.y,
			geometry.boundingBox.max.z,
		);
		camera.position.z = largestDimension * 2;

		animate();
	}
	(new STLLoader()).load(modelUrl, onLoadStl);
}

Array.from(document.querySelectorAll("[data-stl-url]")).forEach(transformIntoStlViewer)
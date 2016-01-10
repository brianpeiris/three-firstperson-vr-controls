require('three-firstperson-vr-controls');

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

// Create VRControls in addition to FirstPersonVRControls.
var vrControls = new THREE.VRControls(camera);
var fpVrControls = new THREE.FirstPersonVRControls(camera, scene);
// Optionally enable vertical movement.
fpVrControls.verticalMovement = true;

var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

var boxWidth = 5;
var texture = THREE.ImageUtils.loadTexture(
  'bower_components/webvr-boilerplate/img/box.png'
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(boxWidth, boxWidth);
var geometry = new THREE.BoxGeometry(boxWidth, boxWidth, boxWidth);
var material = new THREE.MeshBasicMaterial({
  map: texture, color: 0x01BE00, side: THREE.BackSide
});
var skybox = new THREE.Mesh(geometry, material);
scene.add(skybox);

var manager = new WebVRManager(renderer, effect, {hideButton: false});

var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.position.z = -1;
scene.add(cube);

function animate(timestamp) {
  cube.rotation.y += 0.01;

  // Update FirstPersonVRControls after VRControls.
  // FirstPersonVRControls requires a timestamp.
  vrControls.update();
  fpVrControls.update(timestamp);

  manager.render(scene, camera, timestamp);
  requestAnimationFrame(animate);
}

animate();

function onKey(event) {
  if (event.keyCode == 90) { // z
    vrControls.resetSensor();
  }
}

window.addEventListener('keydown', onKey, true);

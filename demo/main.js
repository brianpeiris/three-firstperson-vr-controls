// FirstPersonVRControls is a global if we've been[ loaded by es-module-demo. Otherwise, it already be under THREE.
if (!THREE.FirstPersonVRControls && window.FirstPersonVRControls) {
  console.log('Found FirstPersonVRControls on the window');
  THREE.FirstPersonVRControls = FirstPersonVRControls;
}
var renderer = new THREE.WebGLRenderer({canvas: document.querySelector('canvas') || undefined, antialias: true});
window.renderer = renderer;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.vr.enabled = true;
document.body.appendChild(renderer.domElement);

document.body.appendChild(WEBVR.createButton(renderer));

var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var rig = new THREE.Object3D();
rig.add(camera);
scene.add(rig);

// Optionally provide a rig that is the camera's parent. 
// If a rig is not provided, FirstPersonVRControls will create a rig and
// add the camera to it.
var fpVrControls = new THREE.FirstPersonVRControls(camera, scene, rig);
// Optionally enable vertical movement.
fpVrControls.verticalMovement = true;
// Optionally enable strafing.
fpVrControls.strafing = true;

var boxWidth = 5;
var texture = new THREE.TextureLoader().load('box.png');
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(boxWidth, boxWidth);
var skybox = new THREE.Mesh(
  new THREE.BoxGeometry(boxWidth, boxWidth, boxWidth),
  new THREE.MeshBasicMaterial({
    map: texture, color: 0x01BE00, side: THREE.BackSide
  })
);
skybox.position.y = boxWidth / 2;
scene.add(skybox);

var cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshNormalMaterial()
);
cube.position.set(0, 0.25, -1);
scene.add(cube);

var clock = new THREE.Clock();
function animate() {
  cube.rotation.y += 0.01;

  // FirstPersonVRControls requires a timestamp.
  fpVrControls.update(clock.getDelta());

  renderer.render(scene, camera);
}

renderer.animate(animate);

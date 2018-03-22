# THREE.FirstPersonVRControls

[![npm](https://img.shields.io/npm/v/three-firstperson-vr-controls.svg)](https://www.npmjs.com/package/three-firstperson-vr-controls)

First-person keyboard controls for VR based on three.js with look-based movement and "comfort mode" snap turning.

## Controls

- <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or <kbd>&uarr;</kbd><kbd>&larr;</kbd><kbd>&darr;</kbd><kbd>&rarr;</kbd> 
  for forward/backward movement and strafing (if enabled).
- <kbd>Shift</kbd> to boost movement speed temporarily.
- <kbd>Q</kbd><kbd>E</kbd> for snap turns.
- <kbd>R</kbd><kbd>F</kbd> for vertical movement (if enabled).
- Forward/backward movement is always in the direction that you're looking.

## Usage

    $ npm install three-firstperson-vr-controls
  
```javascript
...  

// Create a rig and add the camera to it. 
// FirstPersonVRControls will move the rig, instead of moving the camera directly. 
// If you don't provide a rig, FirstPersonVRControls will create one for you.
const rig = new THREE.Object3D();
rig.add(camera);
scene.add(rig);

const fpVrControls = new THREE.FirstPersonVRControls(camera, scene, rig);
// Optionally enable vertical movement.
fpVrControls.verticalMovement = true;
// You can also enable strafing, set movementSpeed, snapAngle and boostFactor.
fpVrControls.strafing = true;
...
const clock = new THREE.Clock();
function animate () {
  ...
  // FirstPersonControls requires a time delta.
  fpVrControls.update(clock.getDelta());
  renderer.render(scene, camera);
}
renderer.animate(animate);
```
  
## Demo

http://brian.peiris.io/three-firstperson-vr-controls/demo/browser-demo.html
  
![Animated demo of the controls in action](demo/demo.gif)

## Credits

Based on code from [THREE.FirstPersonControls](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js) and its contributors.

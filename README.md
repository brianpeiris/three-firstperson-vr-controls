# THREE.FirstPersonVRControls

First-person controls for VR based on three.js with look-based movement and "comfort mode" snap turning.

## Controls

- <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or <kbd>&uarr;</kbd><kbd>&larr;</kbd><kbd>&darr;</kbd><kbd>&rarr;</kbd> for forward/backward movement and strafing.
- <kbd>Q</kbd><kbd>E</kbd> for snap turns.
- <kbd>R</kbd><kbd>F</kbd> for vertical movement (if `verticalMovement` is set to `true`).
- Forward/backward movement is always in the direction that you're looking.

## Usage

    $ npm install three-firstperson-vr-controls
  
```javascript
...  
// Create VRControls in addition to FirstPersonVRControls.
var vrControls = new THREE.VRControls(camera);
var fpVrControls = new THREE.FirstPersonVRControls(camera, scene);
// Optionally enable vertical movement.
fpVrControls.verticalMovement = true;
...
function animate (timestamp) {
  ...
  // Update FirstPersonControls after VRControls.
  // FirstPersonControls requires a timestamp.
  vrControls.update();
  fpVrControls.update(timestamp);
  ...
}
```
  
## Demo

http://brian.peiris.io/three-firstperson-vr-controls/demo
  
![Animated demo of the controls in action](http://im.ezgif.com/tmp/ezgif-3151209440.gif)

# THREE.FirstPersonVRControls

First-person controls for VR based on three.js with look-based movement and "comfort mode" snap turning.

## Usage

    $ npm install three-firstperson-vr-controls
  
```javascript
...  
var vrControls = new THREE.VRControls(camera);
var fpsVrControls = new THREE.FirstPersonVRControls(camera, scene);
...
function animate (timestamp) {
  ...
  vrControls.update();
  fpsVrControls.update(timestamp);
  ...
  requestAnimationFrame(animate);
}
```
  
## Demo

http://brian.peiris.io/three-first-person-vr-controls/demo
  
![Animated demo of the controls in action](http://brian.peiris.io/three-first-person-vr-controls/demo/demo.gif)

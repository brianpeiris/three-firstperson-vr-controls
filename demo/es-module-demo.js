// Gotta do some messy loading since I'm trying to reuse main.js for the browser demo as well.

// Lastly, main.js expects THREE to be a global, so we need to expose it.
import 'expose-loader?THREE!three';

// WebVR.js exposes a global variable, which we need to export and then expose so that main.js can use it.
import 'expose-loader?WEBVR!exports-loader?WEBVR!three/examples/js/vr/WebVR';

// three-firstperson-vr-controls exports FirstPersonVRControls which we also need to expose to main.js.
import 'expose-loader?FirstPersonVRControls!three-firstperson-vr-controls';

import './main';

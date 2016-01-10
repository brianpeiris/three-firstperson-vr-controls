/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * @author brianpeiris / http://brian.peiris.io/
	 *
	 * Based on code from THREE.FirstPersonControls
	 * @author mrdoob / http://mrdoob.com/
	 * @author alteredq / http://alteredqualia.com/
	 * @author paulirish / http://paulirish.com/
	 */

	THREE.FirstPersonVRControls = function ( camera, scene ) {
	  var ZAXIS = new THREE.Vector3(0, 0, 1);
	  var YAXIS = new THREE.Vector3(0, 1, 0);  

	  this.object = new THREE.Object3D();

	  this.enabled = true;
	  this.verticalMovement = false;
	  this.movementSpeed = 1.0;
	  this.angle = 0;
	  
	  this.angleQuaternion = new THREE.Quaternion();

	  this.moveForward = false;
	  this.moveBackward = false;
	  this.moveLeft = false;
	  this.moveRight = false;
	  
	  if (navigator.getVRDevices) {
	    navigator.getVRDevices().then(function (devices){
	      // Note: Getting the first device by default.
	      // Ideally we should use whatever THREE.VRControls is using.
	      this.sensor = devices.find(function (device) { 
	        return device instanceof PositionSensorVRDevice; 
	      });
	    }.bind(this));
	  }

	  this.onKeyDown = function ( event ) {

	    switch ( event.keyCode ) {

	      case 38: /*up*/
	      case 87: /*W*/ this.moveForward = true; break;

	      case 37: /*left*/
	      case 65: /*A*/ this.moveLeft = true; break;

	      case 40: /*down*/
	      case 83: /*S*/ this.moveBackward = true; break;

	      case 39: /*right*/
	      case 68: /*D*/ this.moveRight = true; break;

	      case 82: /*R*/ this.moveUp = true; break;
	      case 70: /*F*/ this.moveDown = true; break;

	    }

	  };

	  this.onKeyUp = function ( event ) {

	    switch ( event.keyCode ) {

	      case 38: /*up*/
	      case 87: /*W*/ this.moveForward = false; break;

	      case 37: /*left*/
	      case 65: /*A*/ this.moveLeft = false; break;

	      case 40: /*down*/
	      case 83: /*S*/ this.moveBackward = false; break;

	      case 39: /*right*/
	      case 68: /*D*/ this.moveRight = false; break;
	        
	      case 81: /*Q*/ this.snap('left'); break;
	      case 69: /*E*/ this.snap('right'); break;

	      case 82: /*R*/ this.moveUp = false; break;
	      case 70: /*F*/ this.moveDown = false; break;

	    }

	  };

	  var SNAP_ANGLE = 30 * Math.PI / 180; 
	  this.snap = function (direction) {
	    this.angle += SNAP_ANGLE * (direction === 'left' ? 1 : -1);
	    this.angleQuaternion.setFromAxisAngle(YAXIS, this.angle);
	  };

	  var setFromQuaternionYComponent = function (dest, source) {
	    var direction = ZAXIS.clone();
	    direction.applyQuaternion(source);
	    direction.sub(YAXIS.clone().multiplyScalar(direction.dot(YAXIS)));
	    direction.normalize();
	    dest.setFromUnitVectors(ZAXIS, direction);
	  };

	  var lastTimestamp = 0;  
	  this.update = function( timestamp ) {

	    if ( !this.enabled ) return;

	    camera.quaternion.multiplyQuaternions(this.angleQuaternion, camera.quaternion);    
	    setFromQuaternionYComponent(this.object.quaternion, camera.quaternion);
	    
	    var delta = (timestamp - lastTimestamp) / 1000;
	    lastTimestamp = timestamp;
	    var actualMoveSpeed = delta * this.movementSpeed;
	    
	    if ( this.moveForward ) this.object.translateZ( - actualMoveSpeed );
	    if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

	    if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
	    if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

	    if ( this.verticalMovement && this.moveUp ) this.object.translateY( actualMoveSpeed );
	    if ( this.verticalMovement && this.moveDown ) this.object.translateY( - actualMoveSpeed );

	    var hasPosition = this.sensor && this.sensor.getState().hasPosition;
	    var vrCameraPosition;
	    if (hasPosition) {
	      vrCameraPosition = camera.position.clone();
	      vrCameraPosition.applyQuaternion(this.angleQuaternion);
	    }
	    camera.position.copy(this.object.position);
	    if (hasPosition) {
	      camera.position.add(vrCameraPosition);
	    }
	  };

	  this.dispose = function() {

	    window.removeEventListener( 'keydown', _onKeyDown, false );
	    window.removeEventListener( 'keyup', _onKeyUp, false );

	  };
	  
	  var _onKeyDown = this.onKeyDown.bind(this);
	  var _onKeyUp = this.onKeyUp.bind(this);

	  window.addEventListener( 'keydown', _onKeyDown, false );
	  window.addEventListener( 'keyup', _onKeyUp, false );

	};


/***/ }
/******/ ]);
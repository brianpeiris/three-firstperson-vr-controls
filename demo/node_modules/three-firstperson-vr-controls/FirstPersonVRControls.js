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

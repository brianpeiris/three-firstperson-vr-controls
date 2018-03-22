class Foo {
  bar = 'baz';
}

/**
 * @author brianpeiris / http://brian.peiris.io/
 *
 * Based on code from THREE.FirstPersonControls
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
import * as THREE from 'three';

export default class FirstPersonVRControls {
  static ZAXIS = new THREE.Vector3(0, 0, 1);
  static YAXIS = new THREE.Vector3(0, 1, 0);

  this.object = new THREE.Object3D();

  if (!rig) {
    this.rig = new THREE.Object3D();
    this.rig.add(camera);
    scene.add(this.rig);
  } else {
    this.rig = rig;
  }

  this.enabled = true;
  this.verticalMovement = false;
  this.strafing = false;
  this.movementSpeed = 1.0;
  this.snapAngle = 22.5 * Math.PI / 180;
  this.boost = true;

  this.angle = 0;
  this.angleQuaternion = new THREE.Quaternion();

  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.moveUp = false;
  this.moveDown = false;
  this.boosting = false;

  this.onKeyDown = function (event) {
    if (event.repeat) { return; }

    switch (event.key.toLowerCase()) {
      case 'arrowup': 
      case 'w': this.moveForward = true; break;

      case 'arrowleft': 
      case 'a': this.moveLeft = true; break;

      case 'arrowdown': 
      case 's': this.moveBackward = true; break;

      case 'arrowright':
      case 'd': this.moveRight = true; break;

      case 'r': this.moveUp = true; break;
      case 'f': this.moveDown = true; break;

      case 'shift': this.boosting = true; break;

      case 'q': this.snap('left'); break;
      case 'e': this.snap('right'); break;
    }
  };

  this.onKeyUp = function (event) {
    switch (event.key.toLowerCase()) {
      case 'arrowup': 
      case 'w': this.moveForward = false; break;

      case 'arrowleft': 
      case 'a': this.moveLeft = false; break;

      case 'arrowdown': 
      case 's': this.moveBackward = false; break;

      case 'arrowright':
      case 'd': this.moveRight = false; break;

      case 'r': this.moveUp = false; break;
      case 'f': this.moveDown = false; break;

      case 'shift': this.boosting = false; break;
    }
  };

  const tempMatrix = new THREE.Matrix4();
  const tempTransMatrix = new THREE.Matrix4();
  this.snap = function (direction) {
    const deltaAngle = this.snapAngle * (direction === 'left' ? 1 : -1);
    this.angle += deltaAngle;
    this.angleQuaternion.setFromAxisAngle(YAXIS, this.angle);

    tempMatrix.makeTranslation(camera.position.x, camera.position.y, camera.position.z);
    this.rig.matrix.multiply(tempMatrix);

    tempMatrix.makeRotationY(-deltaAngle);
    this.rig.matrix.multiply(tempMatrix);

    tempMatrix.makeRotationY(deltaAngle * 2);
    this.rig.matrix.multiply(tempMatrix);

    tempMatrix.makeTranslation(-camera.position.x, -camera.position.y, -camera.position.z);
    this.rig.matrix.multiply(tempMatrix);

    this.rig.matrix.decompose(this.rig.position, this.rig.quaternion, this.rig.scale);
  };

  const direction = new THREE.Vector3();
  const collapseYComponent = function (quaternion) {
    direction.set(0, 0, 1);
    direction.applyQuaternion(quaternion);
    direction.y = 0;
    direction.normalize();
    quaternion.setFromUnitVectors(ZAXIS, direction);
  };

  this.update = function (delta) {
    if (!this.enabled) return;

    this.object.position.set(0, 0, 0);
    this.object.quaternion.copy(camera.quaternion);
    this.object.quaternion.multiplyQuaternions(this.angleQuaternion, camera.quaternion);    
    collapseYComponent(this.object.quaternion);
    
    let actualMoveSpeed = delta * this.movementSpeed;
    if (this.boost && this.boosting) actualMoveSpeed = actualMoveSpeed * 2;
    
    if (this.moveForward) this.object.translateZ(- actualMoveSpeed);
    if (this.moveBackward) this.object.translateZ(actualMoveSpeed);

    if (this.strafing && this.moveLeft) this.object.translateX(- actualMoveSpeed);
    if (this.strafing && this.moveRight) this.object.translateX(actualMoveSpeed);

    if (this.verticalMovement && this.moveUp) this.object.translateY(actualMoveSpeed);
    if (this.verticalMovement && this.moveDown) this.object.translateY(- actualMoveSpeed);

    this.rig.position.add(this.object.position);
  };

  this.dispose = function () {
    window.removeEventListener('keydown', _onKeyDown, false);
    window.removeEventListener('keyup', _onKeyUp, false);
  };
  
  const _onKeyDown = this.onKeyDown.bind(this);
  const _onKeyUp = this.onKeyUp.bind(this);

  window.addEventListener('keydown', _onKeyDown, false);
  window.addEventListener('keyup', _onKeyUp, false);
};

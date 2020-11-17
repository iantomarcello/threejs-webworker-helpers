/**
 *  A THREEJS wrapper functions that updates the camera on the Worker from the UI.
 *  @param {Camera} camera, the THREE.Camera that the OrbitControls attaches on.
 *  @param {Object} extraData, addition things you can passed to UI on init.
 */

import { Vector3, Quaternion } from 'three';

const OffscreenOrbitControlsWorker = (camera, extraData = {}) => {

  /**
   *  Initiate link with UI.
   */

  self.postMessage({
    id: 'OffscreenOrbitControls_init',
    camera: camera.toJSON(),
    extraData: JSON.stringify(extraData),
  });


  /**
   *  Updates camera on Worker from UI.
   */

  self.addEventListener('message', ev => {
    if ( ev.data.id === 'OffscreenOrbitControls_values' ) {
      let quaternion = new Quaternion(...ev.data.quaternion);
      camera.setRotationFromQuaternion(quaternion);
      camera.position.x = ev.data.position.x;
      camera.position.y = ev.data.position.y;
      camera.position.z = ev.data.position.z;
    }
  });
}

export default OffscreenOrbitControlsWorker;

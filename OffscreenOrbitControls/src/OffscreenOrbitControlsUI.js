/**
 *  A THREEJS wrapper functions that updates the camera on the Worker from the UI.
 *  @param {HTMLCanvasElement} canvas, the <canvas> which is rendered on.
 *  @param {Worker} worker, the offscreen canvas Web Worker.
 *  @param {Function} callback, a callback function passing OrbitControls and
 *  any extraData you may passed from OffscreenOrbitControlsWorker.
 *  You can edit the options using this. Note some methods or properties
 *  like autoRotate do not work because OrbitControls cannot be instantiate
 *  on a Worker.
 */

import { ObjectLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const OffscreenOrbitControlsUI = (canvas, worker, callback = null) => {
  let controls;
  let cameraFromWorker;
  let mouseIsDown = false;

  /**
   *  Posts duplicate camera's transformation to Worker.
   */

  const postToWorker = (ev) => {
    worker.postMessage({
      id: 'OffscreenOrbitControls_values',
      quaternion: cameraFromWorker.quaternion.toArray(),
      position: cameraFromWorker.position,
    })
  }

  worker.addEventListener('message', ev => {
    if ( ev.data.id === 'OffscreenOrbitControls_init' ) {

      /**
       *  Duplicates the camera on Worker and use it as a reference.
       */

      cameraFromWorker = new ObjectLoader().parse(ev.data.camera);
      controls = new OrbitControls(cameraFromWorker, canvas);

      controls.addEventListener('change', postToWorker);

      /**
       *  Callback.
       */

      callback !== null ? callback(controls, JSON.parse(ev.data.extraData)) : null;
    }
  });
}

export default OffscreenOrbitControlsUI;

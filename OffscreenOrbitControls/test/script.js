import GUIHelperUI from '../../GUIHelper/src/GUIHelperUI.js';
import GUIHelperParams from '../../GUIHelper/src/GUIHelperParams.js';
import OffscreenOrbitControlsUI from '../src/OffscreenOrbitControlsUI.js';

const canvas = document.getElementById('webgl-canvas');
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js',{ type: 'module' });
worker.postMessage({
  id: 'init',
	canvas: offscreen,
	width: canvas.clientWidth,
	height: canvas.clientHeight,
	pixelRatio: window.devicePixelRatio,
}, [ offscreen ]);

worker.onerror = err => console.trace(err);

window.addEventListener("resize", ev => {
  worker.postMessage({
    id: 'resize',
  	width: canvas.clientWidth,
  	height: canvas.clientHeight,
  })
});

import { Vector3 } from 'three';

OffscreenOrbitControlsUI(canvas, worker, (controls, extraData) => {
  controls.autoRotate = true; // does not work.
  controls.target = new Vector3( ...Object.values(extraData.lookAt) );
});

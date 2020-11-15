/**
 *  A THREEJS wrapper function that allows GUI to connect to the web workers.
 *  This file is for the UI.
 *  Sadly, this is only a simple example, not for sofisticated works. :(
 *  @param {Object} guiHelperParams, an object in a structure similar that
 *  of ./GUIHelperParams.js
 *  @param {Worker} worker, the offscreen canvas Web Worker. 
 */

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

const GUIHelperUI = (guiHelperParams, worker) => {
  const gui = new GUI;
  let params = {};

  for ( let [key, value] of Object.entries(guiHelperParams) ) {
    params[key] = value.value;
  }

  const post = (key, value) => {
    worker.postMessage({
      id: 'GUIHelperUIUpdate',
      key,
      value,
    });
  };

  for ( let [key, value] of Object.entries(guiHelperParams) ) {
    switch (value.type) {
      case 'float':
        value.min = value?.min || 0;
        value.max = value?.max || 1;
        value.step = value?.step || 0.01;
        gui.add(params, key, value.min, value.max, value.step).onChange(newValue => {
          post(key, newValue);
        });
        break;

      case 'colour':
      case 'color':
        gui.addColor(params, key).onChange(newValue => {
          post(key, newValue);
        });
        break;

      default:
        gui.add(params, key).onChange(newValue => {
          post(key, newValue);
        });
        break;

    }
  }
};

export default GUIHelperUI;

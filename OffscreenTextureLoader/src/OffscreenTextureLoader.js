/**
 *  A THREEJS wrapper function that loads textures on web workers.
 *  THREE.ImageLoader does not work in workers as it is DOM dependent.
 *  @reference https://github.com/mrdoob/three.js/tree/dev/examples/jsm/offscreen
 */

import { ImageBitmapLoader, CanvasTexture } from 'three';

let defaultOptions = { imageOrientation: 'flipY' };

/**
 *  Loads asynchronously.
 *  @param {String} imagePath the path to the texture image.
 *  @param {Object} options THREE.ImageBitmapLoader options.
 */

const OffscreenTextureLoader = async (imagePath, options = defaultOptions) => {
  let loader = new ImageBitmapLoader();
	loader.setOptions(options);

  let bitmap = await new Promise(resolve => {
    loader.load(imagePath, function(result) {
      resolve(result);
    });
  });
  return new CanvasTexture(bitmap);
};


/**
 *  Loads asynchronously.
 *  @param {String} imagePath the path to the texture image.
 *  @param {Object} callback Callback function witht the texture.
 *  @param {Object} options THREE.ImageBitmapLoader options.
 */

const OffscreenTextureLoaderSync = async (imagePath, callback, options = defaultOptions) => {
  let loader = new ImageBitmapLoader()
	loader.setOptions(options);
  loader.load(imagePath, function(bitmap) {
    let texture = new CanvasTexture(bitmap)
    callback(texture);
  });
};

export { OffscreenTextureLoader, OffscreenTextureLoaderSync };

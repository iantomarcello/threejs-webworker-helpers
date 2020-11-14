/**
 *  Web Worker file to test.
 *  Box wood image is from https://unsplash.com/photos/yvCuAO4hXB0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
 */

import {
  Scene, PerspectiveCamera, WebGLRenderer, GridHelper,
  Mesh, BoxGeometry, MeshLambertMaterial,
  AmbientLight, PointLight
} from 'three';
import { OffscreenTextureLoader, OffscreenTextureLoaderSync } from '../src/OffscreenTextureLoader.js';

let canvas;
let width;
let height;
let pixelRatio;

let scene = new Scene();
let camera;
let renderer;
let ambLight;
let pntLight;

let gridHelper;
let box;

self.addEventListener('message', ev => {
  let data = ev.data;

  switch (data.id) {
    case 'init':
    default:
      (async () => {
        canvas = data.canvas;
        width = data.width;
        height = data.height;
        pixelRatio = data.pixelRatio;

        camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.y = 40;

        renderer = new WebGLRenderer({ antialias: true, canvas: canvas});
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(pixelRatio);

        gridHelper = new GridHelper(1000, 50);
        scene.add(gridHelper);

        ambLight = new AmbientLight('rgb(176, 255, 250)', 0.2);
        scene.add(ambLight);

        pntLight = new PointLight('rgb(252, 229, 218)', 1, 1000);
        scene.add(pntLight);

        animate();
        

        // NOTE: Below tests OffscreenTextureLoader

        let boxTexture = await OffscreenTextureLoader('wood.jpg');

        let boxGeo = new BoxGeometry(60, 60, 60);
        let boxMat = new MeshLambertMaterial({
          color: 0xf5f5f5,
          map: boxTexture,
        });

        box = new Mesh(boxGeo, boxMat);
        box.position.z = -300;
        box.position.y = 40;
        scene.add(box);


        // NOTE: Below tests OffscreenTextureLoaderSync

        // OffscreenTextureLoaderSync('wood.jpg', boxTexture => {
        //   let boxGeo = new BoxGeometry(60, 60, 60);
        //   let boxMat = new MeshLambertMaterial({
        //     color: 0xf5f5f5,
        //     map: boxTexture,
        //   });
        //
        //   box = new Mesh(boxGeo, boxMat);
        //   box.position.z = -300;
        //   box.position.y = 30;
        //   scene.add(box);
        // });

      })();
      break;

    case 'resize':
      width = data.width;
      height = data.height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      break;
  }
});

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if ( box ) {
    box.rotation.y += 0.01;
    box.rotation.x += 0.001;
  }
};

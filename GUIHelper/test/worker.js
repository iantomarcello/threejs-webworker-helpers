/**
 *  Web Worker file to test.
 */

import {
  Scene, PerspectiveCamera, WebGLRenderer, GridHelper,
  Mesh, TorusKnotBufferGeometry, MeshPhysicalMaterial,
  AmbientLight, PointLight
} from 'three';
import GUIHelperWorker from '../src/GUIHelperWorker.js';
import GUIHelperParams from '../src/GUIHelperParams.js';

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
let torusGeo;
let torusMat;
let torus;

self.addEventListener('message', ev => {
  let data = ev.data;

  switch (data.id) {
    case 'init':
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


        torusGeo = new TorusKnotBufferGeometry(18, 8, 150, 20);
        let params = {};
        for ( let [key, value] of Object.entries(GUIHelperParams) ) {
          params[key] = value.value;
        }
        torusMat = new MeshPhysicalMaterial(params);

        torus = new Mesh(torusGeo, torusMat);
        torus.position.z = -180;
        torus.position.y = 40;
        scene.add(torus);

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
  if ( torus ) {
    torus.rotation.y += 0.01;
    torus.rotation.x += 0.001;
  }
};

GUIHelperWorker((key, value) => {
  if ( key === 'color' ) {
    torusMat.color.setHex(value);

  } else if ( key === 'emissive' ) {
    torusMat.emissive.setHex(value);

  } else if ( key === 'transparency' ) {
    torusMat.transparent = true;
    torusMat.transmission = value;

  } else {
    torusMat[key] = value;
  }
});

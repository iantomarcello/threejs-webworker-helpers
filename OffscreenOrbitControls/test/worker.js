/**
 *  Web Worker file to test.
 */

import {
  Scene, PerspectiveCamera, WebGLRenderer, GridHelper,
  Mesh, TorusKnotBufferGeometry, SphereGeometry, MeshBasicMaterial, MeshPhysicalMaterial,
  AmbientLight, PointLight,
  PMREMGenerator,
} from 'three';
import { OffscreenTextureLoader } from '../../OffscreenTextureLoader/src/OffscreenTextureLoader.js';
import OffscreenOrbitControlsWorker from '../src/OffscreenOrbitControlsWorker.js';

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
let envTexture;
let envGlobe;
let torusCubeRenderTarget;
let torusGeo;
let torusMat;
let torus;
let pmremGenerator;
let orbitControls;

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
        camera.position.z = 180;

        renderer = new WebGLRenderer({ antialias: true, canvas: canvas });
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(pixelRatio);

        pmremGenerator = new PMREMGenerator(renderer);
				pmremGenerator.compileEquirectangularShader();

        gridHelper = new GridHelper(1000, 50);
        scene.add(gridHelper);

        ambLight = new AmbientLight('rgb(176, 255, 250)', 0.2);
        scene.add(ambLight);

        pntLight = new PointLight('rgb(252, 229, 218)', 1, 1000);
        scene.add(pntLight);

        animate();

        envTexture = await OffscreenTextureLoader('surrounding.jpg');
        torusCubeRenderTarget = pmremGenerator.fromEquirectangular(envTexture.clone());

        torusGeo = new TorusKnotBufferGeometry(18, 8, 150, 20);
        let params = {};
        torusMat = new MeshPhysicalMaterial({
          color: 0x492a8c,
          roughness: 0.01,
          metalness: 0.8,
          reflectivity: 0.1,
          clearcoat: 0.1,
          clearcoatRoughness: 0.1,
          envMap: torusCubeRenderTarget.texture,
        });

        torus = new Mesh(torusGeo, torusMat);
        torus.position.z = 0;
        torus.position.y = 40;
        scene.add(torus);

        OffscreenOrbitControlsWorker(camera, {
          lookAt: torus.position,
        });

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
		torus.material.needsUpdate = true;
  }
};

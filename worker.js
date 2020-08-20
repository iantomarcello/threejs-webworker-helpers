import { Scene, PerspectiveCamera, WebGLRenderer, GridHelper, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

let canvas;
let width;
let height;
let pixelRatio;

let scene = new Scene();
let camera;
let renderer;

let gridHelper;
let box;

self.addEventListener("message", ev => {
  let data = ev.data;

  switch (data.id) {
    case "init":
    default:
      canvas = data.canvas;
      width = data.width;
      height = data.height;
      pixelRatio = data.pixelRatio;

      camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.y = 30;

      renderer = new WebGLRenderer({ antialias: true, canvas: canvas});
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(pixelRatio);

      gridHelper = new GridHelper(1000, 100);
      scene.add(gridHelper);

      box = new Mesh(
        new BoxGeometry(60, 60, 60),
        new MeshBasicMaterial({ color: 0xf5f5f5, })
      );
      box.position.z = -300;
      box.position.y = 30;
      scene.add(box);

      animate();

      break;

    case "resize":
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
  box.rotation.y += 0.01;
  box.rotation.x += 0.001;
};

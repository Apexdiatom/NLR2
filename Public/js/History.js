// interactiveGlobe.js

// Create Babylon.js scene
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // Create camera and lights
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

  // Create globe
  const globe = BABYLON.MeshBuilder.CreateSphere("globe", { diameter: 4 }, scene);

  // Apply earth texture
  const globeMaterial = new BABYLON.StandardMaterial("globeMat", scene);
globeMaterial.diffuseTexture = new BABYLON.Texture("images/8k_earth_daymap.jpg", scene);
globeMaterial.diffuseTexture.vScale = -1;
globeMaterial.diffuseTexture.uScale = -1;
globeMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Remove shiny highlights
globeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // Make texture fully lit
globe.material = globeMaterial;

  // Highlight layer for selected country
  const highlight = new BABYLON.HighlightLayer("hl1", scene);

  // Action manager for globe interaction
  globe.actionManager = new BABYLON.ActionManager(scene);

  globe.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function(evt) {
      const pickResult = scene.pick(scene.pointerX, scene.pointerY);
      if (pickResult.hit && pickResult.pickedMesh === globe) {
        highlight.removeAllMeshes();
        highlight.addMesh(globe, BABYLON.Color3.Yellow());
        
        // Here you can add logic to identify clicked country coordinates
        alert('Globe clicked! You can integrate country detection logic here.');
      }
    })
  );

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});

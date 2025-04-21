window.addEventListener('DOMContentLoaded', async function () {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    //Skybox and groung
    const environment = scene.createDefaultEnvironment({
        skyboxSize: 500,
        groundSize: 20,
        groundColor: new BABYLON.Color3(0.5, 0.5, 0.5)
    });
    if (environment) {
        environment.setMainColor(new BABYLON.Color3(0.5, 0.8, 1.0));
        environment.ground.setEnabled(false);
    }

    //Camera
    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1.6, -2), scene);
    camera.attachControl(canvas, true);

    //Lights
    const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.8;

    //Custom Floor with Texture
    const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 10, height: 10 }, scene);
    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    floorMat.diffuseTexture = new BABYLON.Texture("./Textures/Floor.jpg", scene);
    floorMat.diffuseTexture.uScale = 4;
    floorMat.diffuseTexture.vScale = 4;
    floor.material = floorMat;

    BABYLON.SceneLoader.ImportMesh(
        "",
        "./model/",
        "Man.glb",
        scene,
        function (meshes) {
          const man = meshes[0];
      
          //Place behind the counter
          man.position.set(0, 0, 2);
          man.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
          man.rotation.y = Math.PI;
          man.getChildMeshes().forEach((mesh) => {
            if (mesh.material) {
              mesh.material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2); // Soft lighting effect
              mesh.material.diffuseColor = mesh.material.diffuseColor || new BABYLON.Color3(0.8, 0.6, 0.5); // fallback skin tone
            }
            mesh.isVisible = true;
          });
        });
      

    //Kitchen Counter with Texture
    const counter = BABYLON.MeshBuilder.CreateBox("counter", { width: 2, height: 0.9, depth: 0.6 }, scene);
    counter.position.set(0, 0.45, 1);
    const counterMat = new BABYLON.StandardMaterial("counterMat", scene);
    counterMat.diffuseTexture = new BABYLON.Texture("./Textures/Wood.jpg", scene);
    counter.material = counterMat;

    //Microwave 
    BABYLON.SceneLoader.ImportMesh(
        "",
        "./model/",
        "KitchenMicrowave.glb",
        scene,
        function (meshes) {
          const microwave = meshes[0];
          microwave.position.set(-0.5, 0.96, 1);
          microwave.rotation = new BABYLON.Vector3(0, 0, 0);
          microwave.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
        });
      
    //Pan (realistic look with a handle)
const panBody = BABYLON.MeshBuilder.CreateCylinder("panBody", { diameter: 0.4, height: 0.05 }, scene);
panBody.position.set(0, 0.95, 1);
const panBodyMat = new BABYLON.StandardMaterial("panBodyMat", scene);
panBodyMat.diffuseTexture = new BABYLON.Texture("./Textures/Metal.jpg", scene);
panBody.material = panBodyMat;

const panHandle = BABYLON.MeshBuilder.CreateBox("panHandle", { width: 0.02, height: 0.02, depth: 0.3 }, scene);
panHandle.position.set(0, 0.97, 1.25);
const handleMat = new BABYLON.StandardMaterial("handleMat", scene);
handleMat.diffuseColor = new BABYLON.Color3(0, 0, 0); // black
panHandle.material = handleMat;

const pan = BABYLON.Mesh.MergeMeshes([panBody, panHandle], true);

//Spoon (like a ladle using cylinder + sphere)
const spoonHandle = BABYLON.MeshBuilder.CreateCylinder("spoonHandle", { diameter: 0.02, height: 0.25 }, scene);
spoonHandle.position.set(0.5, 0.97, 1);
spoonHandle.rotation.z = Math.PI / 4;
const spoonHandleMat = new BABYLON.StandardMaterial("spoonHandleMat", scene);
spoonHandleMat.diffuseTexture = new BABYLON.Texture("./Textures/Metal.jpg", scene);
spoonHandle.material = spoonHandleMat;

const spoonHead = BABYLON.MeshBuilder.CreateSphere("spoonHead", { diameter: 0.07 }, scene);
spoonHead.position.set(0.62, 0.9, 1.12);
spoonHead.material = spoonHandleMat;

const spoon = BABYLON.Mesh.MergeMeshes([spoonHandle, spoonHead], true);


//Spoon interaction (highlight on click)
spoon.actionManager = new BABYLON.ActionManager(scene);
spoon.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPickTrigger,
    () => {
        spoon.material.emissiveColor = BABYLON.Color3.Random();
        setTimeout(() => {
            spoon.material.emissiveColor = BABYLON.Color3.Black();
        }, 300);
    }
));


    //GUI: Start Cooking Button
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const button = BABYLON.GUI.Button.CreateSimpleButton("startBtn", "Start Cooking");
    button.width = "150px";
    button.height = "50px";
    button.color = "white";
    button.background = "green";
    button.cornerRadius = 10;
    button.top = "-40%";
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    button.onPointerUpObservable.add(function () {
        alert("Let's start cooking!");
    });

    advancedTexture.addControl(button);
    

    //Render Loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });
});
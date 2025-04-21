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
    }
    environment.ground.setEnabled(false);

    //Camera
    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1.6, -4), scene);
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

    //Kitchen Counter with Texture
    const counter = BABYLON.MeshBuilder.CreateBox("counter", { width: 2, height: 0.9, depth: 0.6 }, scene);
    counter.position.set(0, 0.45, 0);
    const counterMat = new BABYLON.StandardMaterial("counterMat", scene);
    counterMat.diffuseTexture = new BABYLON.Texture("./Textures/Wood.jpg", scene);
    counter.material = counterMat;

    //Pan with Texture
    const pan = BABYLON.MeshBuilder.CreateCylinder("pan", { diameter: 0.3, height: 0.05, tessellation: 32 }, scene);
    pan.position.set(0, 0.95, 0);
    const panMat = new BABYLON.StandardMaterial("panMat", scene);
    panMat.diffuseTexture = new BABYLON.Texture("./Textures/Metal.jpg", scene);
    pan.material = panMat;

    //Spoon
    const spoon = BABYLON.MeshBuilder.CreateBox("spoon", { width: 0.05, height: 0.02, depth: 0.3 }, scene);
    spoon.position.set(0.5, 0.97, 0);
    const spoonMat = new BABYLON.StandardMaterial("spoonMat", scene);
    spoonMat.diffuseTexture = new BABYLON.Texture("./Textures/Metal.jpg", scene);
    spoon.material = spoonMat;

    //Pan Interaction
    pan.actionManager = new BABYLON.ActionManager(scene);
    pan.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        () => { pan.rotation.y += 0.3; }
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
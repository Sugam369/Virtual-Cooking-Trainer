window.addEventListener('DOMContentLoaded', async function () {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 500 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBoxMat", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://assets.babylonjs.com/environments/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Camera
    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1.6, -4), scene);
    camera.attachControl(canvas, true);

    // Lights
    const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.8;

    const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(5, 5, 5);
    dirLight.intensity = 1;

    // Floor
    const floor = BABYLON.MeshBuilder.CreateGround("floor", { width: 10, height: 10 }, scene);
    const floorMat = new BABYLON.StandardMaterial("floorMat", scene);
    floorMat.diffuseColor = new BABYLON.Color3(0.72, 0.52, 0.39); // wooden brown
    floor.material = floorMat;

    // Kitchen Counter
    const counter = BABYLON.MeshBuilder.CreateBox("counter", { width: 2, height: 0.9, depth: 0.6 }, scene);
    counter.position.set(0, 0.45, 0);
    const counterMat = new BABYLON.StandardMaterial("counterMat", scene);
    counterMat.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.2); // darker wood
    counter.material = counterMat;

    // Utensil on Counter
    const pan = BABYLON.MeshBuilder.CreateCylinder("pan", { diameter: 0.3, height: 0.05, tessellation: 32 }, scene);
    pan.position.set(0, 0.95, 0); // sitting on top of the counter
    const panMat = new BABYLON.StandardMaterial("panMat", scene);
    panMat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1); // dark grey
    pan.material = panMat;

    // Start a WebXR VR session 
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-vr",
        }
    });

    // Render Loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });

});

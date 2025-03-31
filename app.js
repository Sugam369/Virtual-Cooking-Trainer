window.addEventListener('DOMContentLoaded', async function () { // make it async

    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    // Scene
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.85, 0.92, 0.98); // soft sky color

    // Camera
    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1.6, -4), scene);
    camera.attachControl(canvas, true);

    // Lights
    const hemiLight = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.8;

    const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(5, 5, 5);
    dirLight.intensity = 1;

    // Floor (Wooden Style)
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

    // Start a WebXR session 
    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
            // Set the referenceSpaceType to "unbounded" - since the headset is in passthrough mode with AR, let the vistor go anywhere they like within their physical space
            referenceSpaceType: "local-floor" //  viewer, local, local-floor, bounded-floor, or unbounded (https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace and https://gist.github.com/lempa/64b3a89a19cbec980ade709be35d7cbc#file-webxr-reference-space-types-csv)

        },
        // Enable optional features - either all of them with true (boolean), or as an array
        optionalFeatures: true
    });

    // Render Loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
    });

});

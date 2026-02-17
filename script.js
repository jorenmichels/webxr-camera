let xrSession = null;
let glBinding = null;

async function startAR() {
    // 1. Vraag een AR-sessie aan met rauwe cameratoegang
    xrSession = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['camera-access', 'local']
    });

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { xrCompatible: true });
    
    // 2. Maak een binding om toegang te krijgen tot XR-specifieke WebGL-data
    glBinding = new XRWebGLBinding(xrSession, gl);
    
    xrSession.requestAnimationFrame(onXRFrame);
}

function onXRFrame(time, frame) {
    xrSession.requestAnimationFrame(onXRFrame);
    const session = frame.session;
    const pose = frame.getViewerPose(referenceSpace);

    if (pose) {
        for (const view of pose.views) {
            // 3. Controleer of de view camera-informatie bevat
            if (view.camera) {
                // 4. Haal de WebGLTexture van de live camerafeed op
                const cameraTexture = glBinding.getCameraImage(view.camera);
                
                // Visualiseer hier de texture (bijv. bind aan een vlak/mesh)
                gl.bindTexture(gl.TEXTURE_2D, cameraTexture);
                // Render instructies voor je AR-scherm...
            }
        }
    }
}

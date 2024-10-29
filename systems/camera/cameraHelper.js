import alt from 'alt-client';
import native from 'natives';
class Camera {
    /**
     * @type {number}
     */ get fov() {
        return this._fov;
    }
    set fov(value) {
        this._fov = value;
        native.setCamFov(this.scriptID, this._fov);
        this.render();
    }
    /**
     * @type {alt.Vector3}
     */ get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
        native.setCamCoord(this.scriptID, this._position.x, this._position.y, this._position.z);
        this.render();
    }
    /**
     * @type {alt.Vector3}
     */ get rotation() {
        return this._rotation;
    }
    set rotation(rotation) {
        this._rotation = rotation;
        native.setCamRot(this.scriptID, this._rotation.x, this._rotation.y, this._rotation.z, 0);
        this.render();
    }
    /**
     * Stops rendering the camera on the screen
     */ unrender() {
        native.renderScriptCams(false, false, 0, false, false, 0);
    }
    /**
     * Renders the camera view on the screen
     */ render() {
        native.setCamActive(this.scriptID, true);
        native.renderScriptCams(true, false, 0, true, false, 0);
    }
    /**
     * Destroys the camera
     */ destroy() {
        native.destroyCam(this.scriptID, false);
        this.unrender();
    //alt.log(`--> Destroyed camera: ${this.scriptID}`);
    }
    /**
     * Rotates camera so it points straight to a ped's specific bone
     *
     * @param {number} entity Ped handle that owns the bone
     * @param {number} bone Bone index
     * @param {number} xOffset Position offset of the camera X
     * @param {number} yOffset Position offset of the camera Y
     * @param {number} zOffset Position offset of the camera Z
     */ pointAtBone(entity, bone, xOffset, yOffset, zOffset) {
        native.pointCamAtPedBone(this.scriptID, entity, bone, xOffset, yOffset, zOffset, false);
        this.render();
    }
    /**
     * Rotates camera so it points straight to a position
     *
     * @param {alt.Vector3} position Vector3 to where to point the camera at
     */ pointAtCoord(position) {
        native.pointCamAtCoord(this.scriptID, position.x, position.y, position.z);
        this.render();
    }
    /**
     * Create a new camera
     *
     * @param {alt.Vector3} position Initial position of the camera
     * @param {alt.Vector3} rotation Initial rotation of the camera
     * @param {number} fov Initial field of view of the camera
     */ constructor(position, rotation, fov){
        this._position = position;
        this._rotation = rotation;
        this._fov = fov;
        this.scriptID = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', this._position.x, this._position.y, this._position.z, this._rotation.x, this._rotation.y, this._rotation.z, this._fov, true, 0);
    //alt.log(`--> Created camera: ${this.scriptID}`);
    }
}
export { Camera as default };
const cameraPosition = new alt.Vector3(0, 0, 0);
const cameraRotation = new alt.Vector3(0, 0, 0);
const camera = new Camera(cameraPosition, cameraRotation, 10);
/* 
camera.render(); // Show the camera
camera.unrender(); // Hide the camera
camera.destroy(); // Destroy the camera

camera.position = cameraPosition; // Change camera's position
camera.rotation = cameraRotation; // Change camera's rotation
camera.fov = 10; // Change camera's FOV
*/ alt.onServer('Camera:Open', (position, rotation, fov)=>{
    camera.position = position;
    camera.rotation = rotation;
    camera.fov = fov;
    camera.render();
});
alt.onServer('Camera:Close', ()=>{
    camera.unrender();
});
alt.onServer('Camera:LookAt', (coord)=>{
    camera.pointAtCoord(coord);
});

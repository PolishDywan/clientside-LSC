function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
import alt from 'alt-client';
import native from 'natives';
export function getCrossProduct(v1, v2) {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}
export function getNormalizedVector(vector) {
    const mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    return {
        x: vector.x / mag,
        y: vector.y / mag,
        z: vector.z / mag
    };
}
export function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
export function rotationToDirection(rotation) {
    const z = degToRad(rotation.z);
    const x = degToRad(rotation.x);
    const num = Math.abs(Math.cos(x));
    return {
        x: -Math.sin(z) * num,
        y: Math.cos(z) * num,
        z: Math.sin(x)
    };
}
export function getCameraRotation(cam) {
    return _objectSpread({}, native.getCamRot(parseInt(cam), 2));
}
export function getCameraPosition(cam) {
    return _objectSpread({}, native.getCamCoord(parseInt(cam)));
}
export function mulNumber(vector1, value) {
    return {
        x: vector1.x * value,
        y: vector1.y * value,
        z: vector1.z * value
    };
}
export function addVector3(vector1, vector2) {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y,
        z: vector1.z + vector2.z
    };
}
export function subVector3(vector1, vector2) {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y,
        z: vector1.z - vector2.z
    };
}
export function w2s(position) {
    let result = native.getScreenCoordFromWorldCoord(position.x, position.y, position.z, undefined, undefined);
    if (!result[0]) {
        return undefined;
    }
    let newPos = {
        x: (result[1] - 0.5) * 2,
        y: (result[2] - 0.5) * 2,
        z: 0
    };
    return newPos;
}
export function processCoordinates(x, y) {
    const [_, width, height] = native.getActualScreenResolution(0, 0);
    const screenX = width;
    const screenY = height;
    let relativeX = 1 - x / screenX * 1.0 * 2;
    let relativeY = 1 - y / screenY * 1.0 * 2;
    if (relativeX > 0.0) {
        relativeX = -relativeX;
    } else {
        relativeX = Math.abs(relativeX);
    }
    if (relativeY > 0.0) {
        relativeY = -relativeY;
    } else {
        relativeY = Math.abs(relativeY);
    }
    return {
        x: relativeX,
        y: relativeY
    };
}
export function s2w(camPos, rot, relX, relY) {
    const camRot = rot;
    const camForward = rotationToDirection(camRot);
    const rotUp = addVector3(camRot, {
        x: 10,
        y: 0,
        z: 0
    });
    const rotDown = addVector3(camRot, {
        x: -10,
        y: 0,
        z: 0
    });
    const rotLeft = addVector3(camRot, {
        x: 0,
        y: 0,
        z: -10
    });
    const rotRight = addVector3(camRot, {
        x: 0,
        y: 0,
        z: 10
    });
    const camRight = subVector3(rotationToDirection(rotRight), rotationToDirection(rotLeft));
    const camUp = subVector3(rotationToDirection(rotUp), rotationToDirection(rotDown));
    const rollRad = -degToRad(camRot.y);
    const camRightRoll = subVector3(mulNumber(camRight, Math.cos(rollRad)), mulNumber(camUp, Math.sin(rollRad)));
    const camUpRoll = addVector3(mulNumber(camRight, Math.sin(rollRad)), mulNumber(camUp, Math.cos(rollRad)));
    const point3D = addVector3(addVector3(addVector3(camPos, mulNumber(camForward, 10.0)), camRightRoll), camUpRoll);
    const point2D = w2s(point3D);
    if (point2D === undefined) {
        return addVector3(camPos, mulNumber(camForward, 10.0));
    }
    const point3DZero = addVector3(camPos, mulNumber(camForward, 10.0));
    const point2DZero = w2s(point3DZero);
    if (point2DZero === undefined) {
        return addVector3(camPos, mulNumber(camForward, 10.0));
    }
    const eps = 0.001;
    if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
        return addVector3(camPos, mulNumber(camForward, 10.0));
    }
    const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
    const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
    const point3Dret = addVector3(addVector3(addVector3(camPos, mulNumber(camForward, 10.0)), mulNumber(camRightRoll, scaleX)), mulNumber(camUpRoll, scaleY));
    return point3Dret;
}
// Get entity, ground, etc. targeted by mouse position in 3D space.
export function screenToWorld(flags, ignore, pos, rot) {
    const x = alt.getCursorPos().x;
    const y = alt.getCursorPos().y;
    const absoluteX = x;
    const absoluteY = y;
    let camPos = pos;
    const processedCoords = processCoordinates(absoluteX, absoluteY);
    const target = s2w(camPos, rot, processedCoords.x, processedCoords.y);
    const dir = subVector3(target, camPos);
    const from = addVector3(camPos, mulNumber(dir, 0.05));
    const to = addVector3(camPos, mulNumber(dir, 300));
    const ray = native.startExpensiveSynchronousShapeTestLosProbe(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0);
    return native.getShapeTestResult(ray);
}
export function screenCenterToWorld(flags, ignore, pos, rot) {
    const x = 0.5;
    const y = 0.5;
    const absoluteX = x;
    const absoluteY = y;
    let camPos = pos;
    const processedCoords = processCoordinates(absoluteX, absoluteY);
    const target = s2w(camPos, rot, processedCoords.x, processedCoords.y);
    const dir = subVector3(target, camPos);
    const from = addVector3(camPos, mulNumber(dir, 0.05));
    const to = addVector3(camPos, mulNumber(dir, 300));
    const ray = native.startExpensiveSynchronousShapeTestLosProbe(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0);
    return native.getShapeTestResult(ray);
}

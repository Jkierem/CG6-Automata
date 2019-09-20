import * as THREE from 'three';
import "../vendor/OrbitControls";
import { identity } from '@juan-utils/functions'

const createCore = (renderer, scene, camera) => {
    let cont = true;
    let id = null;
    const control =  new THREE.OrbitControls( camera , renderer.domElement );

    camera.position.x = 0
    camera.position.y = 60
    camera.position.z = 50
    control.enableDamping = true
    control.keyPanSpeed = 15;
    control.update();

    return {
        loop(action=identity) {
            (function render() {
                if (cont) {
                    action(this)
                    control.update()
                    id = requestAnimationFrame(render);
                }
                renderer.render(scene, camera);
            })()
        },
        stop() {
            cont = false;
            if (id !== null) cancelAnimationFrame(id);
        }
    }
};

export default createCore;
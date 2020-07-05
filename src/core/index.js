import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import { identity } from '@juan-utils/functions'

const createCore = (renderer, scene, camera) => {
    let cont = true;
    let id = null;
    const control =  new OrbitControls( camera , renderer.domElement );

    camera.position.x = 0
    camera.position.y = 60
    camera.position.z = 50
    control.enableDamping = true
    control.keyPanSpeed = 15;
    control.update();

    return {
        asyncBefore(){
            return new Promise((resolve,reject) => resolve())
        },
        loop(action=identity) {
            function render(core) {
                if (cont) {
                    action(core)
                    control.update()
                    id = requestAnimationFrame(render);
                }
                renderer.render(scene, camera);
            }
            const run = () => render(this);
            this.asyncBefore().then(run)
        },
        stop() {
            cont = false;
            if (id !== null) cancelAnimationFrame(id);
        }
    }
};

export default createCore;
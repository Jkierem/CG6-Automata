const createCore = (renderer, scene, camera) => {
    let cont = true;
    let id = null;
    return {
        loop() {
            (function render() {
                if (cont) {
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
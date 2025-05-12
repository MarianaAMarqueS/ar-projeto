// Necessário para que o GLTFLoader funcione corretamente
window.THREE = THREE;

let mixer;

AFRAME.registerComponent('play-gltf', {
    init: function () {
        const el = this.el;
        const loader = new THREE.GLTFLoader();

        loader.load('posteranimado.glb', function (gltf) {
            const model = gltf.scene;
            el.setObject3D('mesh', model);

            if (gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => {
                    const action = mixer.clipAction(clip);
                    action.play();
                });
            }
        }, undefined, function (error) {
            console.error('Erro ao carregar GLB:', error);
        });
    },

    tick: function (time, deltaTime) {
        if (mixer) mixer.update(deltaTime / 1000);
    }
});

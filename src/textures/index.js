import * as THREE from 'three';
import { zip } from '@juan-utils/functions';

const loader = new THREE.TextureLoader();
const loadTexture = (str,callback) => loader.load(`static/textures/${str}`,callback);
const fetchTexture = (str) => new Promise((resolve,reject) => {
    loadTexture(str, (texture,err) => {
        if(err){
            reject(err)
        }else{   
            resolve(texture)
        }
    })
})

export const fetchTextures = (names,onLoad) => {
    const promises = names.map(fetchTexture)
    Promise.all(promises)
    .then(texts => {
        return zip(names,texts).reduce( (prev,[name,texture]) => {
            prev[name] = texture
            return prev
        } ,{})
    }).then( textures => {
        onLoad(textures);
    })
}
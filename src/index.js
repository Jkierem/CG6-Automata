import * as THREE from 'three'
import createCore from './core';
import Grid from './grid';
import City from './city';
import { random, integerRandom, prop } from '@juan-utils/functions';

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const config = {
    width: 10,
    height: 10
}

const city = new City(config);
console.log(city.pickRandomSeeds().map(prop("data")))

const core = createCore(renderer, scene, camera);
core.loop();
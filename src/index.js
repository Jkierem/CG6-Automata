import * as THREE from 'three'
import createCore from './core';
import City from './city';
import { buildCityScene } from './scenes';

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const config = {
    width: 10,
    height: 10,
    tilesWidth:10,
    tilesHeigth: 10,
    seedCount: 3,
}

const city = new City(config);
city.generateTiles()
city.populateGrids()

buildCityScene(city,scene)

const core = createCore(renderer, scene, camera);
core.loop();
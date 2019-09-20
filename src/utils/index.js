import * as THREE from 'three'
import { isNil, identity, integerRandom, toRadians } from '@juan-utils/functions'
import { Colors } from '../data';

const Geometries = {
    Plane: "PlaneGeometry",
    Box: "BoxGeometry",
    Cone: "ConeGeometry"
}

const Materials = {
    Basic: "MeshBasicMaterial",
    Lambert: "MeshLambertMaterial"
}

const Objects = {
    Mesh: "Mesh",
    Container: "Object3D"
}

const Lights = {
    Ambient: "AmbientLight",
    Directional: "DirectionalLight"
}

export const translate = (obj,{ x=0,y=0,z=0}) => {
    obj.translateX(x)
    obj.translateY(y)
    obj.translateZ(z)
}

export const create = (className , ...args) => {
    if( THREE[className] ){
        return new THREE[className](...args);
    }
    throw new Error(`${className} does not exist on THREE`);
}

const createMesh = ({ geometry , material , transform=identity , mutate=identity }) => {
    const mesh = create( Objects.Mesh, geometry, material );
    mutate(mesh);
    return transform(mesh);
}

export const Ambient = () => {
    return create( Lights.Ambient , 0x404040 );
}

export const Directional = () => {
    return create( Lights.Directional , 0xffffff , 0.5 )
}

export const Container = (...objs) => {
    const cont = create(Objects.Container);
    if( objs.length > 0 ){
        cont.add(...objs)
    }
    return cont;
}

export const Plane = ({ 
    width, 
    height, 
    color, 
    transform=identity,
    mutate=identity 
}) => {
    const geometry = create(Geometries.Plane,width,height)
    const material = create( Materials.Lambert, { color , side: THREE.DoubleSide });
    return createMesh({geometry,material,transform,mutate});
}

export const Box = ({
    x,y,z,
    color,
    transform=identity,
    mutate=identity
}) => {
    const geometry = create(Geometries.Box,x,y,z);
    const material = create( Materials.Lambert, { color , side: THREE.DoubleSide });
    return createMesh({geometry,material,transform,mutate});
}

export const Pyramid = ({
    r,h,
    color,
    transform=identity,
    mutate=identity
}) => {
    const geometry = create(Geometries.Cone,r,h,4);
    const material = create( Materials.Lambert, { color , side: THREE.DoubleSide });
    return createMesh({geometry,material,transform,mutate})
}

export const House = ({
    grass,
    box,
}) => {
    const z = 1 + integerRandom(2);
    const y = 3;
    const x = 3;
    const color = 0xeb9e34;
    const boxMesh = Box({x,y,z,color,mutate(obj){
        box.mutate(obj);
        translate(obj,{
            z: z/2
        })
    }})
    const grassMesh = Plane({ color: Colors.green , width:5, height:5, ...grass })
    return Container(boxMesh,grassMesh);
}

export const Shop = ({
    mutate:rootMutate
}) => {
    const boxMesh = Box({
        x: 4,
        y: 3,
        z: 5,
        color: Colors.blue,
        mutate(b){
            rootMutate(b)
            translate(b,{ z: 2.5 })
        }
    })
    const roofMesh = Pyramid({ 
        r:2 , 
        h:2.5 , 
        color: Colors.blue,
        mutate(p){
            rootMutate(p)
            p.rotation.z = toRadians(90)
            translate(p,{z:5})
        }
    })
    const roofMesh2 = Pyramid({ 
        r:2 , 
        h:2.5 , 
        color: Colors.blue,
        mutate(p){
            rootMutate(p)
            p.rotation.z = toRadians(-90)
            translate(p,{z:5})
        }
    })
    const planeMesh = Plane({ width:5 , height:5 , color: Colors.lightGray, mutate:rootMutate})
    return Container(boxMesh,planeMesh,roofMesh,roofMesh2);
}

export const Office = ({
    building,
    concrete,
}) => {
    const [x,y,z] = [4.5,4.5,5+integerRandom(5)];
    const color = Colors.lightGray;
    const boxMesh = Box({x,y,z,color,
        mutate(b){
            building.mutate(b)
            translate(b,{z: z/2})
        }
    })
    const planeMesh = Plane({ width:5 , height:5 , color, ...concrete})
    return Container(boxMesh,planeMesh);
}


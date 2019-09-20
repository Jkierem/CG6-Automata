import { TileColors, Tiles } from '../data'
import { translate, Plane } from 'src/utils';
import { Container, House, Ambient, Directional, Office, Shop } from '../utils';
import { toRadians } from '@juan-utils/functions'
import * as THREE from 'three'

export const buildCityScene = (city,scene) => {
    scene.add(Ambient())
    scene.add(Directional())
    const tileSide = 5;
    const SuperContainer = Container();
    city.tiles.map( (t,x,y) => {
        const container = Container();
        translate(container, {y:50*x,x:50*y});
        t.map( (value,x,y) => {
            const planeConfig = {
                width: tileSide,
                height: tileSide,
                mutate(plane){
                    translate(plane,{
                        x: tileSide*x,
                        y: tileSide*y,
                    })
                }
            }
            switch(value){
                case Tiles.EMPTY:
                    planeConfig.color = TileColors.Empty;
                    container.add(Plane(planeConfig));
                    break;
                case Tiles.ROAD:
                    planeConfig.color = TileColors.Road;
                    container.add(Plane(planeConfig));
                    break;
                case Tiles.RESIDENTIAL:
                    const houseConfig = {
                        grass: {
                            mutate(plane){
                                translate(plane,{
                                    x: tileSide*x,
                                    y: tileSide*y,
                                })
                            }
                        },
                        box: {
                            mutate(box){
                                translate(box,{
                                    x: tileSide*x,
                                    y: tileSide*y,
                                })
                            }
                        },
                        roof: {

                        }
                    }
                    container.add(House(houseConfig));
                    break;
                case Tiles.SMALL_SHOP:
                    const shopConfig = {
                        mutate(box){
                            translate(box,{
                                x: tileSide*x,
                                y: tileSide*y,
                            })
                        }
                    }
                    container.add(Shop(shopConfig));
                    break;
                case Tiles.OFFICE:
                    const officeConfig = {
                        building: {
                            mutate(b){
                                translate(b,{
                                    x: tileSide*x,
                                    y: tileSide*y,
                                })
                            }
                        },
                        concrete: {
                            mutate(b){
                                translate(b,{
                                    x: tileSide*x,
                                    y: tileSide*y,
                                })
                            }
                        }
                    }
                    container.add(Office(officeConfig));
                    break;
            }
        })
        // container
        SuperContainer.add(container)
    })
    SuperContainer.rotation.x = toRadians(-90);
    translate(SuperContainer,{ x: -(city.dims.x/2) * 50 , y:-(city.dims.y/2) * 50})
    scene.add(SuperContainer)
}
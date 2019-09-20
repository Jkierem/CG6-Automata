import Grid from "src/grid";
import { Tiles } from "src/data";
import { pickRandomRoad } from "src/roads";
import { isNil, integerRandom, abs, gt } from "@juan-utils/functions";

class Point2D {
    constructor(x,y){
        this.data = [x,y]
    }
    get x(){ return this.data[0]; }
    get y(){ return this.data[1]; }
    add = ({ x, y }) => { return new Point2D( this.data[0] + x , this.data[1] + y )}
    get = (index) => { return isNil(index) ? this.data : (this.data[index] || 0) }
    map = (f) => { return new Point2D(...this.data.map(f)) }
    every = (f) => { return this.data.every(f) }
    some = (f) => { return this.data.some(f) }
    diff = (p) => { return new Point2D( this.x - p.x , this.y - p.y )}
    static random(xLimit,yLimit){
        return new Point2D( integerRandom(xLimit) , integerRandom(yLimit) )
    }
}

const UP = new Point2D(0,-1);
const DOWN = new Point2D(0,1);
const LEFT = new Point2D(-1,0);
const RIGHT = new Point2D(1,0);

const Directions = [ UP, DOWN, LEFT, RIGHT ];

class City {
    constructor(config){
        const { 
            width, 
            height,
            tilesWidth=10,
            tilesHeigth=10,
            seedCount=3, 
            tolerance=100
        } = config;
        this.width = width;
        this.height = height;
        this.dims = {
            x: tilesHeigth,
            y: tilesWidth,
        }
        this.seedCount = seedCount;
        this.tolerance = tolerance;
        this.tiles = new Grid(tilesWidth,tilesHeigth,0)
    }

    pickRandomSeeds = (n = 3,tries=100) => {
        const seeds = [ Point2D.random(this.width,this.height) ];
        let i = 0
        while( seeds.length !== n && i < tries){
            const next = Point2D.random(this.width,this.height);
            const valid = seeds.map(next.diff).every( d => d.every(x => gt(1,abs(x))) )
            i++;
            if(valid){
                seeds.push(next);
                i = 0;
            }
        }
        return seeds;
    }

    populate = (grid) => {
        return grid.map((value,x,y,grid) => {
            if( value === Tiles.EMPTY){
                const cur = new Point2D(x,y)
                const neighs = Directions
                            .map( dir => dir.add(cur) )
                            .map( p => grid.safeGet(p,Tiles.ROAD) )
                const roads = neighs.reduce((a,b) => a+b)
                return roads > 1 ? Tiles.SMALL_SHOP : Tiles.RESIDENTIAL;
            } 
            return value;
        }).map((value,x,y,grid) => {
            if( value === Tiles.SMALL_SHOP ){
                const cur = new Point2D(x,y);
                const neighs = Directions
                            .map( dir => dir.add(cur) )
                            .map( p => grid.safeGet(p,Tiles.ROAD));
                const isOffice = neighs.every( n => n !== Tiles.RESIDENTIAL )
                if( isOffice ){
                    return Tiles.OFFICE;
                }
                return integerRandom(3) >= 1 ? Tiles.SMALL_SHOP : Tiles.RESIDENTIAL
            }
            return value;
        })
    }

    generateTile = () => {
        const grid = new Grid(this.width,this.height,Tiles.EMPTY);
        const seeds = this.pickRandomSeeds(this.seedCount,this.tolerance);
        seeds
        .map( p => pickRandomRoad(p) )
        .map( p => p.getTiles(grid) )
        .reduce( (acc,next) => [...acc,...next])
        .forEach( p => {
            grid.setCell(p,Tiles.ROAD);
        })
        return grid;
    }

    generateTiles = () => {
        this.tiles = this.tiles.map( tile => this.generateTile() );
    }

    populateGrids = () => {
        this.tiles = this.tiles.map( g => this.populate(g) );
    }

    forEach = (f) => {
        this.tiles.map(f);
    }
}

export default City;
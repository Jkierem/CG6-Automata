import Grid from "../grid";
import { isNil, integerRandom, abs, neq, gt } from "@juan-utils/functions";

class Point2D {
    constructor(x,y){
        this.data = [x,y]
    }
    get x(){ return this.data[0]; }
    get y(){ return this.data[1]; }
    get = (index) => { return isNil(index) ? this.data : (this.data[index] || 0) }
    map = (f) => { return new Point2D(...this.data.map(f)) }
    every = (f) => { return this.data.every(f) }
    some = (f) => { return this.data.some(f) }
    diff = (p) => { return new Point2D( this.x - p.x , this.y - p.y )}
    static random(xLimit,yLimit){
        return new Point2D( integerRandom(xLimit) , integerRandom(yLimit) )
    }
}

class City {
    constructor(config){
        const { width, height } = config;
        this.grid = new Grid(width,height);
        this.width = width;
        this.height = height
    }

    pickRandomSeeds = (n = 3,tries=100) => {
        const tolerance = n * tries;
        const seeds = [ Point2D.random(this.width,this.height) ];
        let i = 0
        while( seeds.length !== n && i < tries){
            const next = Point2D.random(this.width,this.height);
            const valid = seeds.map(next.diff).every( d => d.every(x => gt(1,abs(x))) )
            i++;
            if(valid){
                seeds.push(next);
            }
        }
        if( i >= tries ){
            console.warn("Seed creation incomplete")
        }else{
            console.log("Failed to find this many tries:",i)
        }
        return seeds;
    }
}

export default City;
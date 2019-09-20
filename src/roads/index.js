import { Roads } from "src/data";
import { integerRandom, range } from '@juan-utils/functions'

const {
    SINGLE,
    THREE_WAY,
    FOUR_WAY
} = Roads

const createRoad = (type,pos,blockFunction) => {
    return {
        get type(){ return type },
        get pos(){ return pos },
        getTiles({ width , height }){
            return blockFunction(width,height);
        }
    }
}

const SingleStreet = (pos) => {
    const vertical = integerRandom(2);
    const creator = (width,height) => {
        if( vertical ){
            const { x } = pos;
            return range(0,height)
            .map( y => ({ x , y }))
        } else {
            const { y } = pos;
            return range(0,width)
            .map( x => ({ x , y }))
        }
    }
    return createRoad('SINGLE',pos,creator);
}

const ThreeWayIntersection = (pos) => {
    const creator = (width,height) => {
        const { x , y } = pos;
        const vertical = range(x,height).map( y => ({ x , y }) )
        const horizontal = range(0,width).map( x => ({ x , y }) )
        return [ ...vertical , ...horizontal ];
    }
    return createRoad('THREE_WAY',pos,creator);
}

const FourwayIntersection = (pos) => {
    const creator = (width,height) => {
        const { x , y } = pos;
        const vertical = range(0,height).map( y => ({ x , y }) )
        const horizontal = range(0,width).map( x => ({ x , y }) )
        return [ ...vertical , ...horizontal ];
    }
    return createRoad('FOUR_WAY',pos,creator);
}

export const pickRandomRoad = (pos) => {
    const road = integerRandom(3);
    switch(road){
        case SINGLE:
            return SingleStreet(pos);
        case THREE_WAY:
            return ThreeWayIntersection(pos);
        case FOUR_WAY:
            return FourwayIntersection(pos);
    }
}
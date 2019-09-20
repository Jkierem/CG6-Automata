import { repeat, prop, isNil, compose } from '@juan-utils/functions'


class Grid {
    constructor(width, height, value = 0) {
        this.data = []
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.data.push(repeat(height, value))
        }
    }

    getCell = ({ x, y }) => {
        return this.data[x][y];
    }

    safeGet = ({ x, y }, otherwise=undefined) => {
        const value = compose(prop(y),prop(x))(this.data)
        return isNil(value) ? otherwise : value
    }

    setCell = ({ x, y }, value) => {
        this.data[x][y] = value;
        return this;
    }

    map = (f) => {
        const newData = this.data.map( (row,x) => {
            return row.map( (value,y) => {
                return f(value,x,y,this);
            })
        })
        const newGrid = new Grid(this.width,this.height);
        newGrid.data = newData;
        return newGrid;
    }
}

export default Grid;
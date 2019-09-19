import { repeat } from '@juan-utils/functions'

class Grid {
    constructor(width, height, value = 0) {
        this.data = []
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.data.push(repeat(height, value))
        }
    }

    getCell = (x, y) => {
        return this.data[x][y];
    }

    setCell = (x, y, value) => {
        this.data[x][y] = value;
        return this;
    }
}

export default Grid;
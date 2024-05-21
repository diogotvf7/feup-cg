/**
 * Position class
 * 
 * @constructor
 * @param x - x coordinate
 * @param y - y coordinate
 * @param z - z coordinate
 */
export class Position {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    distance(pos) {
        return Math.sqrt((this.x - pos.x) ** 2 + (this.y - pos.y) ** 2 + (this.z - pos.z) ** 2);
    }
}

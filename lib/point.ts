import {ICoordinate} from "../utils/interfaces";

export class Point {
    public x: number;
    public y: number;
    public hollow: boolean = false;
    public crossPoints: Array<Point> = [];
    public flatArrayPoints: Array<Point> = [];
    public parent: Point = null;
    public children: Array<Point> = [];

    constructor(c: ICoordinate, ancesor: Point) {
        this.x = c.x;
        this.y = c.y;
        this.hollow = c.hollow;
        if (ancesor) {
            this.flatArrayPoints = ancesor.flatArrayPoints;
            this.parent = ancesor;
        }
        this.flatArrayPoints.forEach(v => {
            if (this.x === v.x && this.y === v.y) {
                this.crossPoints.push(v);
            }
        });
        this.flatArrayPoints.push(this);
        c.childs.forEach(v => {
            this.children.push(new Point(v, this));
        });
    }
}
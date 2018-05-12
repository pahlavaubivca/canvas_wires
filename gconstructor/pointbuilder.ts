import {Point} from "../lib/point";

export class PointBuilder {
    public point: Point;
    private previous: Point;

    constructor() {

    }

    public newPoint(x: number, y: number) {
        const p = new Point({x: x, y: y}, null);
        if (!this.previous) {
            // this.previous = p;
            this.point = p;
        } else {
            this.previous.childs.push(p);
            p.setAncesor(this.previous);
        }
        this.previous = p;
    }

    public getCurrentPoint(): Point {
        return this.point;
    }

    public reset() {
        this.point = null;
        this.previous = null;
    }
}
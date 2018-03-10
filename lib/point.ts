import {ICoordinate} from "../index";

export class Point {
    public x: number;
    public y: number;
    public hollow: boolean = false;
    public parent: Point = null;
    public children: Array<Point> = null;

    constructor(coordinate: ICoordinate) {

    }

    public getParent() {

    }

    /**
     * method
     * @return Array children
     */
    public getNext() {

    }
}
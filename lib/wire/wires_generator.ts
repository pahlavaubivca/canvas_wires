import {Point} from "../point";
import {ICoordinate, IWires} from "../../utils/interfaces";
import {getAmount, random} from "../helper";

export class WiresGenerator {
    private opt: IWires;
    /**
     * @desc Push first coordinate, considering this be to take place next coordinate shift
     * */
    private bufferShiftsXY: Array<{ x: number, y: number }> = [];
    /**
     * @desc Switch next coordinate to opposite direction relative 0
     * */
    private trigger: number = 1;
    private basePoint: Point;

    constructor(basePoint: Point, options: IWires) {
        this.opt = options;
        this.basePoint = basePoint;
        this.bufferShiftsXY.push({x: 0, y: 0});
        const amount = getAmount(this.opt.amount);
        for (let i = 0; i < amount; i++) this.genNextCoord();
    }

    /**
     * @description Determine shift for x and y coordinate, relative base point root coordinate,
     * considering option for base wires.
     * */
    private genNextCoord() {
        const delta = {
            x: Math.round(random(this.opt.distanceRange.x[0], this.opt.distanceRange.x[1])),
            y: Math.round(random(this.opt.distanceRange.y[0], this.opt.distanceRange.y[1]))
        };
        const rand = random(-1, 1) >= 0 ? 1 : -1;
        const res = {x: 0, y: 0};
        /**
         * @desc first and second variable take x|y string name for determine
         * who next have shift relative own parent coordinate,
         * and who just take random coordinate from range option
         * */
        const first = !this.opt.splitBy ? "x" : "y";
        const second = this.opt.splitBy ? "x" : "y";
        /**
         * @desc Get min|max from x|y coordinate for determine parent coordinate
         * */
        res[first] = this.bufferShiftsXY.reduce((a, c) => {
            if (this.trigger > 0) {
                return a[first] < c[first] ? c : a;
            } else {
                return a[first] > c[first] ? c : a;
            }
        })[first] + delta[first] * this.trigger;
        res[second] = delta[second] * rand;
        this.trigger *= -1;
        this.bufferShiftsXY.push({x: res.x, y: res.y});
    }

    /**
     * @description First create from bufferShiftsXY coordinates for line,
     * and next create instance of Point class.
     * */
    public getArrayPoints(): Array<Point> {
        const arrayLines = [];
        this.bufferShiftsXY.forEach((v, k) => {
            if (k > 0) {
                const coord = this.generateNewCoord(this.basePoint, v.x, v.y);
                arrayLines.push(new Point(coord, null));
            }
        });
        return arrayLines;
    }

    /**
     * @description This method return coordinate for next line with shift from bufferShiftsXY.
     * */
    private generateNewCoord(point: Point, x: number, y: number): ICoordinate {
        const newCoordinate: ICoordinate = {
            x: point.x + x,
            y: point.y + y
        };
        if (point.childs) {
            newCoordinate.childs = [];
            point.childs.forEach(v => {
                newCoordinate.childs.push(this.generateNewCoord(v, x, y));
            })
        }
        return newCoordinate;
    }
}
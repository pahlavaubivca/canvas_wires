import {Point} from "../point";
import {IWires} from "../../utils/interfaces";
import {getAmount, random} from "../helper";

export class WiresGenerator {
    private opt: IWires;
    private bp: Point;
    private buffCoord: Array<{ x: number, y: number }> = [];
    private trigger: number = 1;

    constructor(basePoint: Point, options: IWires) {
        this.opt = options;
        this.buffCoord.push({x: basePoint.x, y: basePoint.y});
        const amount = getAmount(this.opt.amount);
        for (let i = 0; i < amount; i++) this.genNextCoord();
    }

    private genNextCoord() {
        const delta = {
            x: Math.round(random(this.opt.distanceRange.x[0], this.opt.distanceRange.x[1])),
            y: Math.round(random(this.opt.distanceRange.y[0], this.opt.distanceRange.y[1]))
        };
        const rand = random(-1, 1) >= 0 ? 1 : -1;
        const res = {x: 0, y: 0};
        const first = !this.opt.splitBy ? "x" : "y";
        const second = this.opt.splitBy ? "x" : "y";

        res[first] = this.buffCoord.reduce((a, c) => {
            if (this.trigger > 0) {
                return a[first] < c[first] ? c : a;
            } else {
                return a[first] > c[first] ? c : a;
            }
        })[first] + delta[first] * this.trigger;
        res[second] = delta[second] * rand;
        this.trigger *= -1;
        this.buffCoord.push({x: res.x, y: res.y});
    }

    private assingToRealPoint() {

    }
}
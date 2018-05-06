import {IWires, IBeam, IColor} from "../utils/interfaces";
import {getAmount, getWidth, parseColor, random} from "./helper";
import {getBaseLines} from "./wire/basewires";

export interface IPoints {
    points: { x: number, y: number }[]
    width: number;
    color: string;

}

export class Painter {
    private arrPoints: { x: number, y: number }[];
    private ctx: CanvasRenderingContext2D;
    private lines: IPoints[];

    constructor(points: { x: number, y: number }[], ctx: CanvasRenderingContext2D) {
        this.arrPoints = points;
        this.ctx = ctx;
    }

    public baseWiresInit(b: IWires) {
        this.lines = getBaseLines(b, this.arrPoints);
        this.drawLines();
    }
//asdfasd
    private drawLines() {
        this.lines.forEach((value) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = value.width;
            this.ctx.strokeStyle = value.color;
            value.points.forEach((point, i) => {
                if (i === 0) {
                    this.ctx.moveTo(point.x, point.y);
                }
                if (i < value.points.length - 1) {
                    const next = value.points[i + 1];
                    this.drawLine(point.x, point.y, next.x, next.y);
                }
            });
        });
    }


    private drawLine(x0: number, y0: number, x1: number, y1: number) {
        this.ctx.lineTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    }
}


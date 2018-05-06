import {ICanvasDrawerOption} from "../utils/interfaces";

export abstract class CanvasDrawer {
    public abstract ctx: CanvasRenderingContext2D;
    private style: ICanvasDrawerOption;
    private isFill: boolean;
    private isStroke: boolean;

    constructor(canvasOption: ICanvasDrawerOption) {
        // this.ctx = ctx;
        this.style = canvasOption;
        this.isFill = canvasOption.isFill;
        this.isStroke = canvasOption.isStroke || true;
        //this.begin();
    }

    public setColor(color: string) {
        this.style.color = color;
    }

    public setWidth(width: number) {
        this.style.width = width;
    }

    public begin() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.style.width || 1;
        const setStyle = this.isStroke === true ? "strokeStyle" : "fillStyle";
        this.ctx[setStyle] = this.style.color || "rgba(0,0,0,1)";
    }

    public moveTo(x: number, y: number) {
        // TODO opional call begin method
        // if begin not call canvas path overlay each one
        // if begind call canvas path draw once, not overlay by other
        this.begin();
        this.ctx.moveTo(x, y);

    }

    public lineTo(x: number, y: number) {
        this.ctx.lineTo(x, y);
        this.draw();
    }

    public arc(x: number, y: number, r: number, startAng: number, endAng: number, antiClock: boolean = false) {
        this.ctx.arc(x, y, r, startAng, endAng, antiClock);
        this.draw();
    }

    private draw() {
        if (this.isStroke) {
            this.ctx.stroke();
        } else {
            this.ctx.fill();
        }
    }
}
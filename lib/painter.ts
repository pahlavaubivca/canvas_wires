import {IBase, IBeam, IColor, IPoints} from "../index";

export class Painter {
    private arrPoints: { x: number, y: number }[];
    private ctx: CanvasRenderingContext2D;
    private lines: IPoints[] = [];

    constructor(points: { x: number, y: number }[], ctx: CanvasRenderingContext2D) {
        this.arrPoints = points;
        this.ctx = ctx;
    }

    public drawBase(baseOption: IBase) {
        this.lines.push({
            points: this.arrPoints,
            width: random(baseOption.width[0], baseOption.width[1]),
            color: this.parseColor(baseOption.color)
        });
        const _count = random(baseOption.count[0], baseOption.count[1]);
        for (let i = 0; i < _count; i++) {
            const shiftX = random(baseOption.rangeX[0], baseOption.rangeX[1]);
            const shiftY = random(baseOption.rangeY[0], baseOption.rangeY[1]);
            const points = [];
            this.arrPoints.forEach(value => {
                points.push({
                    x: value.x - shiftX,
                    y: value.y - shiftY
                })
            });
            const width = random(baseOption.width[0], baseOption.width[1]);
            const color = this.parseColor(baseOption.color);
            this.lines.push({
                points: points,
                width: width,
                color: color
            })
        }
        this.drawLines();
    }

    private drawLines() {
        this.lines.forEach((value) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = value.width;
            this.ctx.strokeStyle = value.color;
            value.points.forEach((point,i) => {
                if (i === 0) {
                    this.moveTo(point.x, point.y);
                }
                if (i < value.points.length - 1) {
                    const next = value.points[i + 1];
                    this.drawRange(point.x, point.y, next.x, next.y);
                }
            });
        });
    }


    private drawRange(x0: number, y0: number, x1: number, y1: number) {
        this.ctx.lineTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    }

    private moveTo(x: number, y: number) {
        this.ctx.moveTo(x, y);
    }

    private parseColor(colors: IColor[]): string {
        const cc = Math.floor(random(0, colors.length - 0.1));
        const currentColor = colors[cc];
        const red = Math.floor(random(currentColor.red[0], currentColor.red[1]));
        const green = Math.floor(random(currentColor.green[0], currentColor.green[1]));
        const blue = Math.floor(random(currentColor.blue[0], currentColor.blue[1]));
        const opacity = random(currentColor.opacity[0], currentColor.opacity[1]);
        return `rgba(${red},${green},${blue},${opacity})`;
    }
}

const random = (min, max) => {
    return Math.random() * (max - min) + min;
};
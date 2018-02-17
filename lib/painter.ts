import {IWires, IBeam, IColor, IPoints} from "../index";

export class Painter {
    private arrPoints: { x: number, y: number }[];
    private ctx: CanvasRenderingContext2D;
    private lines: IPoints[];

    constructor(points: { x: number, y: number }[], ctx: CanvasRenderingContext2D) {
        this.arrPoints = points;
        this.ctx = ctx;
    }

    public drawBase(b: IWires) {
        this.lines = [];
        const _amount = this.getAmount(b);
        this.lines.push({
            points: this.arrPoints,
            width: this.getWidth(b),
            color: this.parseColor(b.color)
        });

        let oldSX = 0, oldSY = 0;
        const minDX = b.distX[0];
        const maxDX = b.distX[1];
        const minDY = b.distY[0];
        const maxDY = b.distY[1];
        for (let i = 0; i < _amount; i++) {
            let sX = random(minDX, maxDX);
            let sY = random(minDY, maxDY);
            sX = oldSX = sX + oldSX;
            sY = oldSY = sY + oldSY;

            const points = [];
            this.arrPoints.forEach(value => {
                points.push({
                    x: value.x + sX,
                    y: value.y + sY
                })
            });
            const color = this.parseColor(b.color);
            this.lines.push({
                points: points,
                width: this.getWidth(b),
                color: color
            })
        }
        this.drawLines();
    }
    private getPoints(){

    }
    private getWidth(b: IWires): number {
        return typeof b.width === "number" ? b.width : random(b.width[0], b.width[1]);
    }

    private getAmount(b: IWires): number {
        return typeof b.count === "number" ? b.count : random(b.count[0], b.count[1]);
    }

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

    private parseColor(colors: Array<IColor | string>): string {
        let color;
        let cColor = colors[Math.floor(random(0, colors.length - 0.1))];
        if (typeof colors === "string") {
            color = cColor
        } else {
            cColor = cColor as IColor;
            const red = typeof cColor.red === "number" ? cColor.red : Math.floor(random(cColor.red[0], cColor.red[1]));
            const green = typeof cColor.green === "number" ? cColor.green : Math.floor(random(cColor.green[0], cColor.green[1]));
            const blue = typeof cColor.blue === "number" ? cColor.blue : Math.floor(random(cColor.blue[0], cColor.blue[1]));
            const opacity = typeof cColor.opacity === "number" ? cColor.opacity : random(cColor.opacity[0], cColor.opacity[1]);
            color = `rgba(${red},${green},${blue},${opacity})`;
        }
        return color;
    }
}

const degToRad = (deg) => {
    return (Math.PI / 180) * deg;
};

const radToDeg = (rad) => {
    return rad * 180 / Math.PI;
};

const distBetweenPoints = (x0, y0, x1, y1) => {
    return Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2));
};
const random = (min, max) => {
    return Math.random() * (max - min) + min;
};
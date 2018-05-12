import {ICanvasDrawerOption, ICoordinate} from "../utils/interfaces";
import {CanvasDrawer} from "../lib/canvas_drawer";
import {PointBuilder} from "./pointbuilder";
import {Point} from "../lib/point";
import {Wires} from "../index";

export class GraphicConstructor extends CanvasDrawer {
    public ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private break: boolean;
    private coordinate: Array<ICoordinate> = [];
    private currentCoordinate: ICoordinate;
    private pointBuilder: PointBuilder;
    private container: HTMLDivElement;

    constructor(container: HTMLDivElement) {
        super({
            isStroke: true,
            width: 2,
            color: "rgba(0,0,0,1)"
        });
        this.container = container;
        this.createCanvas();
        this.addListener();
        this.pointBuilder = new PointBuilder();
    }

    public createCanvas() {
        this.canvas = document.createElement("canvas");
        const ww = window.innerWidth;
        const hh = window.innerHeight;
        this.canvas.width = ww;
        this.canvas.height = hh;
        this.canvas.style.width = ww + "px";
        this.canvas.style.height = hh + "px";
        this.container.appendChild(this.canvas);
    }

    private addListener() {
        this.canvas.addEventListener("click", this.pointHandler.bind(this));
        this.canvas.addEventListener("mousemove", this.moveHandler.bind(this));
        document.body.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.keyCode == 27) {
                this.break = true;
                this.buildWire(this.pointBuilder.getCurrentPoint());
                this.pointBuilder.reset();
            }
        })
    }

    private pointHandler(e: MouseEvent) {
        this.break = false;
        const x = e.clientX;
        const y = e.clientY;
        this.pointBuilder.newPoint(x, y);
    }

    private buildWire(p: Point) {
        const wire = new Wires({
            width: window.innerWidth,
            height: window.innerHeight
        })
            .appendTo(document.getElementById("wire"))
            .setPoint(p)
            .setWiresParams({
                color: [{
                    red: 230,
                    green: 30,
                    blue: 30,
                    opacity: 0.4
                }, {
                    red: 0,
                    green: 30,
                    blue: 30,
                    opacity: 0.4
                }],
                amount: 5, //amount wires lines
                distanceRange: {
                    x: [4, 5],
                    y: [0, 0]
                },
                splitBy: 0,
                width: [1, 2], // range width lines
            })
            .run();
    }

    private moveHandler(e: MouseEvent) {
        if (!this.break) {
            // const x = e.clientX;
            // const y = e.clientY;
            // this.pointBuilder.newPoint(x, y);
            // if (!this.currentCoordinate) {
            //     this.currentCoordinate = {
            //         x: x,
            //         y: y
            //     };
            // } else {
            //
            // }

        }
    }
}

(window as any).GConstructor = GraphicConstructor;
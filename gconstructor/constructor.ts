import {ICanvasDrawerOption, ICoordinate, IWires} from "../utils/interfaces";
import {CanvasDrawer} from "../lib/canvas_drawer";
import {PointBuilder} from "./lib/pointbuilder";
import {Point} from "../lib/point";
import {Wires} from "../wires";

export class GraphicConstructor extends CanvasDrawer {
    public ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private wiresCanvas: HTMLCanvasElement;
    private wiresParams: IWires;
    private wires: Array<Wires> = [];
    private break: boolean = true;
    private pointBuilder: PointBuilder;
    private lastX: number;
    private lastY: number;

    constructor(canvas: HTMLCanvasElement) {
        super({
            isStroke: true,
            width: 2,
            color: "rgba(0,0,0,1)"
        });
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.addListener();
        this.pointBuilder = new PointBuilder();
    }

    public setWiresCanvas(canvas: HTMLCanvasElement): GraphicConstructor {
        this.wiresCanvas = canvas;
        return this;
    }

    public setWiresParams(params: IWires): GraphicConstructor {
        this.wiresParams = params;
        return this;
    }

    public run(): GraphicConstructor {
        console.log("[graphic constructor run]");
        this.wires.forEach(v => v.run());
        return this;
    }

    private addListener() {
        this.canvas.addEventListener("click", this.pointHandler.bind(this));
        this.canvas.addEventListener("mousemove", this.moveHandler.bind(this));
        document.body.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.keyCode == 27) {
                console.log("[esc press]");
                this.break = true;
                this.buildWire(this.pointBuilder.getCurrentPoint());
                this.pointBuilder.reset();
            }
        })
    }

    private pointHandler(e: MouseEvent) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.lastX = x;
        this.lastY = y;
        this.pointBuilder.newPoint(x, y);
        if (this.break) {
            this.moveTo(x, y);
            this.lineTo(x, y);
        } else {
            this.lineTo(x, y);
        }
        this.break = false;
    }

    private buildWire(p: Point) {
        const wire = new Wires(this.wiresCanvas)
            .setPoint(p)
            .setWiresParams(this.wiresParams);
        this.wires.push(wire);
    }

    private moveHandler(e: MouseEvent) {
        if (!this.break) {
            // const x = e.offsetX;
            // const y = e.offsetY;
            // this.pointBuilder.newPoint(x, y);
            // this.lineTo(x, y);
        }
    }
}

(window as any).GConstructor = GraphicConstructor;
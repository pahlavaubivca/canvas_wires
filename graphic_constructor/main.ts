import {ICanvasDrawerOption} from "../utils/interfaces";
import {CanvasDrawer} from "../lib/canvas_drawer";

export class GraphicConstructor extends CanvasDrawer {
    public ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private break: boolean;

    constructor() {
        super({
            isStroke: true,
            width: 2,
            color: "rgba(0,0,0,1)"
        });
        this.createCanvas();
        this.addListener();
    }

    public createCanvas() {
        this.canvas = document.createElement("canvas");
        const ww = window.innerWidth;
        const hh = window.innerHeight;
        this.canvas.width = ww;
        this.canvas.height = hh;
        this.canvas.style.width = ww + "px";
        this.canvas.style.height = hh + "px";
    }

    private addListener() {
        this.canvas.addEventListener("click", this.pointHandler.bind(this));
        this.canvas.addEventListener("mousemove", this.moveHandler.bind(this));
        this.canvas.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.keyCode == 27) {
                this.break = true;
            }
        })
    }

    private pointHandler(e: MouseEvent) {
        this.break = false;

    }

    private moveHandler(e: MouseEvent) {
        if (!this.break) {

        }
    }
}
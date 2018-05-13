import {Canvas} from "./lib/canvas";
import {Point} from "./lib/point";
import {ICoordinate, IParams, IWires} from "./utils/interfaces";
import {WireTreeBuilder} from "./lib/wire/wires_builder";


export class Wires {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public point: Point;
    public wiresParams: IWires;

    constructor(canvas: HTMLCanvasElement) {
        // const _canvas = new Canvas(params.width, params.height);
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    public setPoint(point: Point): Wires {
        this.point = point;
        return this;
    }

    public setCoordinate(coordinate: ICoordinate): Wires {
        this.point = new Point(coordinate[0], null);
        return this;
    }

    public setWiresParams(wiresParams: IWires): Wires {
        this.wiresParams = wiresParams;
        return this;
    }

    // public appendTo(container: HTMLElement): Wires {
    //     container.appendChild(this.canvas);
    //     return this;
    // }

    public run() {
        const wiresBuilder = new WireTreeBuilder(this.point, this.wiresParams, this.ctx);
    }
}

(window as any).Wires = Wires;
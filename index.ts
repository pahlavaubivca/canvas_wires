import {Canvas} from "./lib/canvas";
import {Point} from "./lib/point";
import {ICoordinate, IParams, IWires} from "./utils/interfaces";
import {WiresBuilder} from "./lib/wire/wires_builder";


export class Wires {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public point: Point;
    public wiresParams: IWires;

    constructor(params: IParams) {
        const _canvas = new Canvas(params.width, params.height);
        this.canvas = _canvas.getElement();
        this.ctx = _canvas.getContext();
    }

    public setCoordinate(coordinate: ICoordinate): Wires {
        this.point = new Point(coordinate, null);
        return this;
    }

    public setWiresParams(wiresParams: IWires): Wires {
        this.wiresParams = wiresParams;
        return this;
    }

    public appendTo(container: HTMLElement): Wires {
        container.appendChild(this.canvas);
        return this;
    }

    public run() {
        const wiresBuilder = new WiresBuilder(this.point, this.wiresParams, this.ctx);
    }
}

(window as any).Wires = Wires;
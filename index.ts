import {Canvas} from "./lib/canvas";
import {Point} from "./lib/point";
import {ICoordinate, IParams, IWires} from "./utils/interfaces";


export class Wires {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public point: Point;
    private wires: IWires;

    constructor(params: IParams) {
        const _canvas = new Canvas(params.width, params.height);
        this.canvas = _canvas.getElement();
        this.ctx = _canvas.getContext();
    }

    public setCoordinate(coordinate: ICoordinate): Wires {
        this.point = new Point(coordinate, null);
        return this;
    }

    public wiresOptions(wiresParams: IWires): Wires {
        this.wires = wiresParams;
        return this;
    }

    public appendTo(container: HTMLElement): Wires {
        container.appendChild(this.canvas);
        return this;
    }

    public run() {
    }
}

(window as any).Wires = Wires;
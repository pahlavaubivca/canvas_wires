import {Canvas} from "./lib/canvas";
import {Painter} from "./lib/painter";

interface IParams {
    width: number;
    height: number;
    wires?: IWires;
    beam?: IBeam;
}


export interface IColor {
    red: number[] | number;
    green: number[] | number;
    blue: number[] | number;
    opacity: number[] | number;
}

export interface IWires {
    color: IColor[] | string[];
    count: number[] | number;
    width: number[] | number;
    speed?: number;
    distanceRange: {
        x: number[],
        y: number[]
    }
}

export interface ICoordinate {
    x: number;
    y: number;
    hollow?: boolean;
    childs?: Array<ICoordinate>;
}

export interface IBeam {
    color: IColor[];
    count: number[];
    speed: number[];
    length: number[];
    direction: number;
}

export class Wires {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private coordinate: { x: number, y: number }[];
    private wires: IWires;

    constructor(params: IParams) {
        const _canvas = new Canvas(params.width, params.height);
        this.canvas = _canvas.getElement();
        this.ctx = _canvas.getContext();
    }

    public setCoordinate(coordinate: ICoordinate): Wires {
        return this;
    }

    public wiresOptions(tracerParams: IWires): Wires {
        this.wires = tracerParams;
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
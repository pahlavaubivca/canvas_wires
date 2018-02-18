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
    distanceRange:{
        x: number[],
        y: number[]
    }
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
    private beam: IBeam;
    private painter: Painter;

    constructor(params: IParams) {
        const _canvas = new Canvas(params.width, params.height);
        this.canvas = _canvas.getElement();
        this.ctx = _canvas.getContext();
    }

    public setCoordinate(coordinate: { x: number, y: number }[]) {
        this.coordinate = coordinate;
        this.painter = new Painter(coordinate, this.ctx);
    }

    public setWires(wiresParams: IWires) {
        this.wires = wiresParams;
    }

    public setBeam(beamParams: IBeam) {
        this.beam = beamParams;
    }

    public appendTo(container: HTMLElement) {
        container.appendChild(this.canvas);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public run() {
        this.painter.baseWiresInit(this.wires);
    }
}

(window as any).Wires = Wires;
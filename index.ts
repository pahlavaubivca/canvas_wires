import {Canvas} from "./lib/canvas";
import {Painter} from "./lib/painter";

interface IParams {
    width: number;
    height: number;
    wires?: IWires;
    beam?: IBeam;
}

export interface IPoints {
    points: { x: number, y: number }[]
    width: number;
    color: string;

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
    distX: number[] | number;
    distY: number[] | number;
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
    private drawer;

    constructor(params: IParams) {
        this.parseParams(params);
        const _canvas = new Canvas(params.width, params.height);
        this.canvas = _canvas.getElement();
        this.ctx = _canvas.getContext();
    }

    public setCoordinate(coordinate: { x: number, y: number }[]) {
        this.coordinate = coordinate;
        this.drawer = new Painter(coordinate, this.ctx);
    }

    private parseParams(params: IParams) {
        this.wires = {
            color: params.wires && params.wires.color || [{red: [250], green: [0], blue: [0], opacity: [0.5, 1]}],
            // rangeX: params.wires && params.wires.rangeX || [30, -30],
            // rangeY: params.wires && params.wires.rangeY || [0, 0],
            count: params.wires && params.wires.count || [5, 8],
            width: params.wires && params.wires.width || [0.2, 2],
            distX: params.wires && params.wires.distX || [3, 5],
            distY: params.wires && params.wires.distY || [3, 5]
        };
        this.beam = {
            color: params.beam && params.beam.color || [{red: [150], green: [50], blue: [0], opacity: [0.5, 1]}],
            count: params.beam && params.beam.count || [5],
            speed: params.beam && params.beam.speed || [2],
            length: params.beam && params.beam.length || [50],
            direction: params.beam && params.beam.direction || 1
        }
    }

    public appendTo(container: HTMLElement) {
        container.appendChild(this.canvas);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public run() {
        this.drawer.drawBase(this.wires);
    }
}

(window as any).Tracer = Wires;
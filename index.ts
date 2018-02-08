import {Canvas} from "./lib/canvas";
import {Painter} from "./lib/painter";

interface IParams {
    width: number;
    height: number;
    base?: IBase;
    beam?: IBeam;
}

export interface IPoints {
    points: { x: number, y: number }[]
    width: number;
    color: string;

}

export interface IColor {
    red: number[];
    green: number[];
    blue: number[];
    opacity: number[];
}

export interface IBase {
    color: IColor[];
    count: number[];
    width: number[];
    distX: number[];
    distY: number[];
}

export interface IBeam {
    color: IColor[];
    count: number[];
    speed: number[];
    length: number[];
    direction: number;
}

export class Tracer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private coordinate: { x: number, y: number }[];
    private base: IBase;
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
        this.base = {
            color: params.base && params.base.color || [{red: [250], green: [0], blue: [0], opacity: [0.5, 1]}],
            // rangeX: params.base && params.base.rangeX || [30, -30],
            // rangeY: params.base && params.base.rangeY || [0, 0],
            count: params.base && params.base.count || [5, 8],
            width: params.base && params.base.width || [0.2, 2],
            distX: params.base && params.base.distX || [3, 5],
            distY: params.base && params.base.distY || [3, 5]
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

    public run() {
        this.drawer.drawBase(this.base);
    }
}

(window as any).Tracer = Tracer;
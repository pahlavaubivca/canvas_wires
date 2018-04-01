export interface IParams {
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
    color: IColor[] | string[] | string;
    amount: number[] | number;
    width: number[] | number;
    speed?: number;
    distanceRange: {
        x: number[],
        y: number[]
    },
    splitBy?: number; //0 - x, 1 - y
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

export interface ICanvasDrawerOption {
    isFill?: boolean;
    isStroke?: boolean;
    width: number;
    color: string;
}
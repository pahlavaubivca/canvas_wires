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
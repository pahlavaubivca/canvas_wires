import {IColor, IWires} from "../utils/interfaces";

export const degToRad = (deg) => {
    return (Math.PI / 180) * deg;
};

export const radToDeg = (rad) => {
    return rad * 180 / Math.PI;
};

export const distBetweenPoints = (x0, y0, x1, y1) => {
    return Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2));
};
export const random = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const parseColor = (colors: Array<IColor | string> | string): string => {
    let color;
    if (typeof colors === "string") {
        color = colors
    } else {
        let cColor = colors[Math.floor(random(0, colors.length - 0.1))];
        cColor = cColor as IColor;
        const red = typeof cColor.red === "number" ?
            cColor.red :
            Math.floor(random(cColor.red[0], cColor.red[1]));
        const green = typeof cColor.green === "number" ?
            cColor.green :
            Math.floor(random(cColor.green[0], cColor.green[1]));
        const blue = typeof cColor.blue === "number" ?
            cColor.blue :
            Math.floor(random(cColor.blue[0], cColor.blue[1]));
        const opacity = typeof cColor.opacity === "number" ?
            cColor.opacity :
            random(cColor.opacity[0], cColor.opacity[1]);
        color = `rgba(${red},${green},${blue},${opacity})`;
    }
    return color;
};
export const getWidth = (b: IWires): number => {
    return typeof b.width === "number" ? b.width : random(b.width[0], b.width[1]);
};

export const getAmount = (b: IWires): number => {
    return typeof b.count === "number" ? b.count : random(b.count[0], b.count[1]);
};
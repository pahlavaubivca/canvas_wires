import {getAmount, getWidth, parseColor, random} from "./helper";
import {IWires} from "../index";
import {IPoints} from "./painter";

export const drawBase = (b: IWires): IPoints[] => {
    const lines = [];
    const _amount = getAmount(b);
    let oldSX = 0, oldSY = 0;
    const minDX = b.distX[0];
    const maxDX = b.distX[1];
    const minDY = b.distY[0];
    const maxDY = b.distY[1];

    lines.push({
        points: this.arrPoints,
        width: getWidth(b),
        color: parseColor(b.color)
    });

    for (let i = 0; i < _amount; i++) {
        let sX = random(minDX, maxDX);
        let sY = random(minDY, maxDY);
        sX = oldSX = sX + oldSX;
        sY = oldSY = sY + oldSY;

        const points = [];
        this.arrPoints.forEach(value => {
            points.push({
                x: value.x + sX,
                y: value.y + sY
            })
        });
        const color = parseColor(b.color);
        lines.push({
            points: points,
            width: getWidth(b),
            color: color
        })
    }
    return lines;
};
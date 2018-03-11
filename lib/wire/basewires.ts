import {distBetweenPoints, getAmount, getWidth, parseColor, random} from "../helper";
import {IWires} from "../../utils/interfaces";
import {IPoints} from "../painter";

let _buffPoint;
let minDist;

/**
 * function
 * @param {IWires} b - options
 * @param {Array<{x:number,y:number}>} - initial point setted by user
 **/
export const getBaseLines = (b: IWires, points: { x: number, y: number }[]): IPoints[] => {
    const lines = [];
    const _amount = getAmount(b);
    const minDX = b.distanceRange.x[0];
    const maxDX = b.distanceRange.x[1];
    const minDY = b.distanceRange.y[0];
    const maxDY = b.distanceRange.y[1];
    minDist = minDX < minDY ? minDY : minDX;
    lines.push({
        points: points,
        width: getWidth(b),
        color: parseColor(b.color)
    });
    _buffPoint = [{x: 0, y: 0}];
    let sumbolX, sumbolY;
    for (let i = 0; i < _amount; i++) {
        if (sumbolX === void 0 || minDX <= minDY) sumbolX = random(1, -1) < 0 ? -1 : 1;
        if (sumbolY === void 0 || minDX >= minDY) sumbolY = random(1, -1) < 0 ? -1 : 1;
        let randSX = random(minDX, maxDX) * sumbolX;
        let randSY = random(minDY, maxDY) * sumbolY;
        sumbolX *= -1;
        sumbolY *= -1;
        const definedPoint = defineNextPoint(randSX, randSY);
        const _points = [];
        points.forEach(value => {
            _points.push({
                x: value.x + definedPoint.x,
                y: value.y + definedPoint.y
            })
        });
        const color = parseColor(b.color);
        lines.push({
            points: _points,
            width: getWidth(b),
            color: color
        })
    }
    return lines;
};
const defineNextPoint = (randX, randY) => {
    let targetX = randX, targetY = randY;
    let maxX = 0,
        maxY = 0,
        minX = 0,
        minY = 0;
    _buffPoint.forEach(value => {
        maxX = value.x > maxX ? value.x : maxX;
        minX = value.x < minX ? value.x : minX;
        maxY = value.y > maxY ? value.y : maxY;
        minY = value.y < minY ? value.y : minY;
    });
    targetX += targetX < 0 ? minX : maxX;
    targetY += targetY < 0 ? minY : maxY;
    _buffPoint.push({x: targetX, y: targetY});
    return {
        x: targetX,
        y: targetY
    }
};
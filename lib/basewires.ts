import {distBetweenPoints, getAmount, getWidth, parseColor, random} from "./helper";
import {IWires} from "../index";
import {IPoints} from "./painter";

let _buffPoint;
let minDist;

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
    _buffPoint = [points[0]];
    let sumbolX, sumbolY;
    for (let i = 0; i < _amount; i++) {
        if (sumbolX === void 0) {
            sumbolX = random(1, -1) < 0 ? -1 : 1;
            sumbolY = random(1, -1) < 0 ? -1 : 1;
        }
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
    let koef = Math.abs(Math.abs(targetX) > Math.abs(targetY) ? targetY / targetX : targetX / targetY);
    _buffPoint.forEach(value => {
        const dist = distBetweenPoints(value.x, value.y, targetX, targetY);
        if (dist < minDist) {
            const diff = minDist - dist;
            const shiftX = value.x + ((diff + (1 - koef)) * targetX > 0 ? 1 : -1);
            const shiftY = value.y + ((diff + koef) * targetY > 0 ? 1 : -1);
            targetX = targetX !== 0 ? targetX + shiftX : 0;
            targetY = targetY !== 0 ? targetY + shiftY : 0;
        }
    });
    _buffPoint.push({x: targetX, y: targetY});
    return {
        x: targetX,
        y: targetY
    }
};
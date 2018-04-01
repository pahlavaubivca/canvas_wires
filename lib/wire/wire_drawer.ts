import {CanvasDrawer} from "../canvas_drawer";
import {IWires} from "../../utils/interfaces";
import {getWidth, parseColor} from "../helper";

/*
* TODO implement draw line by coordinate with speed
* TODO implement recursive call method with draw by point
* */
export class WireDrawer extends CanvasDrawer {
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, params: IWires) {
        const color = parseColor(params.color);
        const width = getWidth(params.width);
        super({
            isStroke: true,
            width: width as number,
            color: color as string
        });
        this.ctx = ctx;
        this.begin();
    }
}
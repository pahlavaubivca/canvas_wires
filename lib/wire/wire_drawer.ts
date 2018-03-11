import {CanvasDrawer} from "../canvas_drawer";
import {IWires} from "../../utils/interfaces";

/*
* TODO implement draw line by coordinate with speed
* TODO implement recursive call method with draw by point
* */
export class WireDrawer extends CanvasDrawer {
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, option: IWires) {
        super({
            isStroke: true,
            width: option.width as number,
            color: option.color as string
        })
    }
}
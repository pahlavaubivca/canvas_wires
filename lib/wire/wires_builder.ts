import {Point} from "../point";
import {IWires} from "../../utils/interfaces";

/*
* TODO implement determine option for each line,
* TODO determine end point if next base point cross with other base point
* TODO implement call line drawer and pass option and point
* TODO implement callback when last line been draw
* */
export class WiresBuilder {
    private option: IWires;
    public ctx: CanvasRenderingContext2D;

    constructor(point: Point, option: IWires, ctx: CanvasRenderingContext2D) {
        this.option = option;
        this.ctx = ctx;
    }

    private drawBaseWire() {

    }

    private determineOption() {

    }
}
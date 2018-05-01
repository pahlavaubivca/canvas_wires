import {Point} from "../point";
import {IWires} from "../../utils/interfaces";
import {WireDrawer} from "./wire_drawer";
import {WiresGenerator} from "./wires_generator";

/*
* TODO determine end point if next base point cross with other base point
* TODO implement callback when last line been draw
* */
export class WireTreeBuilder {
    private params: IWires;
    public ctx: CanvasRenderingContext2D;
    private drawer: WireDrawer;
    private ancesor: Point;
    private wiresGenerator: WiresGenerator;

    constructor(point: Point, params: IWires, ctx: CanvasRenderingContext2D) {
        this.ancesor = point;
        this.params = params;
        this.ctx = ctx;
        this.drawer = new WireDrawer(ctx, params);
        this.wiresGenerator = new WiresGenerator(point, params);
        this.nextBranchWireTree(point);
        const arrPoints = this.wiresGenerator.getArrayPoints();
        arrPoints.forEach(v => {
            this.drawer.setNewStyle();
            this.nextBranchWireTree(v);
        });
    }

    private nextBranchWireTree(point: Point) {
        point.childs.forEach(v => {
            this.drawer.moveTo(point.x, point.y);
            this.drawer.lineTo(v.x, v.y);
            this.nextBranchWireTree(v);
        });
    }


    private createNewWire() {

    }

    private drawBaseWire() {

    }

    private determineOption() {

    }
}
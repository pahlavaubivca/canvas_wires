export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.ctx = this.canvas.getContext("2d");
    }

    public getElement(): HTMLCanvasElement {
        return this.canvas
    }
    public getContext(): CanvasRenderingContext2D{
        return this.ctx;
    }
}
export class Board {
    canvas;
    canvasContext;

    cursorPosition;

    constructor() {
        this.canvas = document.querySelector("canvas");
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = "white";
        this.canvasContext.lineJoin = "round";
        this.canvasContext.lineCap = "round";
        
        this.cursorPosition = { x: 0, y: 0 };
    }

    updatedPosition(event) {
        this.cursorPosition.x = event.clientX - this.canvas.offsetLeft;
        this.cursorPosition.y = event.clientY - this.canvas.offsetTop;
    }

    painter(event) {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.cursorPosition.x, this.cursorPosition.y);
        this.updatedPosition(event);
        this.canvasContext.lineTo(this.cursorPosition.x, this.cursorPosition.y);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }

    reset() {
        this.cursorPosition = {x:0, y:0};
        this.canvasContext.clearRect(0,0, 500, 300);
    }

}
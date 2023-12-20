import { fromEvent, map, mergeAll, takeUntil } from "rxjs";
import { Board } from "./board";

export class View {
    board;
    
    onMouseDown$;
    onMouseUp$;
    onMouseMove$;

    onClickButton$;

    constructor() {
        this.board = new Board();

        this.onMouseUp$ = fromEvent(this.board.canvas, "mouseup");
        this.onMouseDown$ = fromEvent(this.board.canvas, "mousedown");
        this.onMouseMove$ = fromEvent(this.board.canvas, "mousemove").pipe(takeUntil(this.onMouseUp$));

        this.onClickButton$ = fromEvent(document.querySelector("button"), "click");
    }

    onInit() {
        this.observerMouseDown();
        this.observerMouseMove();

        this.observerReset();
    }

    observerMouseDown() {
        const this$ = this;
        this.onMouseDown$
            .subscribe({
                next: function(result) {
                    this$.board.updatedPosition(result);
                }
            });
    }

    observerMouseMove() {
        const this$ = this;

        this.onMouseDown$
            .pipe(
                map(function(event) {
                    return this$.onMouseMove$;
                }),
                mergeAll(),
                
            )
            .subscribe({
                next: function(result) {
                    this$.board.painter(result);
                }
            });
    }

    observerReset() {
        const this$ = this;

        this.onClickButton$
            .subscribe({
                next: function() {
                    console.log("clicked");
                    this$.board.reset();
                }
            });
    }

}
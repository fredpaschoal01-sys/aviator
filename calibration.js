/**
 * calibration.js
 * Ferramenta de calibração da região do histórico
 */

class Calibration {

    static canvas;
    static ctx;

    static dragging = false;

    static startX = 0;
    static startY = 0;

    static rect = {
        x:0,
        y:0,
        width:0,
        height:0
    };

    static init(){

        this.canvas =
            document.getElementById("screenCanvas");

        if(!this.canvas) return;

        this.ctx =
            this.canvas.getContext("2d");

        document
        .getElementById("btnCalibrar")
        .addEventListener(
            "click",
            ()=>{

                alert(
                    "Arraste o mouse sobre o HISTÓRICO DA RONDA."
                );

                this.enable();

            }
        );

    }

    static enable(){

        this.canvas.addEventListener(
            "mousedown",
            this.mouseDown
        );

        this.canvas.addEventListener(
            "mousemove",
            this.mouseMove
        );

        this.canvas.addEventListener(
            "mouseup",
            this.mouseUp
        );

    }

    static mouseDown=(e)=>{

        Calibration.dragging=true;

        Calibration.startX=e.offsetX;

        Calibration.startY=e.offsetY;

    }

    static mouseMove=(e)=>{

        if(!Calibration.dragging) return;

        const x=e.offsetX;
        const y=e.offsetY;

        Calibration.rect.x=
            Math.min(
                Calibration.startX,
                x
            );

        Calibration.rect.y=
            Math.min(
                Calibration.startY,
                y
            );

        Calibration.rect.width=
            Math.abs(
                x-Calibration.startX
            );

        Calibration.rect.height=
            Math.abs(
                y-Calibration.startY
            );

        Calibration.draw();

    }

    static mouseUp=()=>{

        Calibration.dragging=false;

        console.clear();

        console.log("");

        console.log("========== REGIÃO ==========");

        console.log(

`x: ${Calibration.rect.x},
y: ${Calibration.rect.y},
width: ${Calibration.rect.width},
height: ${Calibration.rect.height}`

        );

        console.log("============================");

    }

    static draw(){

        Calibration.ctx.strokeStyle="red";

        Calibration.ctx.lineWidth=3;

        Calibration.ctx.strokeRect(

            Calibration.rect.x,

            Calibration.rect.y,

            Calibration.rect.width,

            Calibration.rect.height

        );

    }

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>Calibration.init()

);

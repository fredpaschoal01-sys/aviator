/**
 * history-reader.js
 * Aviator Vision AI
 *
 * Primeira etapa:
 * Captura apenas a área do Histórico da Ronda.
 *
 * Não faz OCR ainda.
 */

class HistoryReader {

    static canvas = null;
    static ctx = null;


    /*
     * Ajuste inicial para tela 1366x768
     *
     * Vamos testar a área do histórico.
     * Depois refinamos se necessário.
     */

    static region = {

        x: 1050,

        y: 120,

        width: 250,

        height: 450

    };


    static init(){

        this.canvas =
            document.getElementById(
                "historyCanvas"
            );


        if(!this.canvas){

            console.log(
                "historyCanvas não encontrado"
            );

            return;

        }


        this.ctx =
            this.canvas.getContext(
                "2d"
            );


        document.addEventListener(

            "frameCaptured",

            (event)=>{

                this.process(
                    event.detail
                );

            }

        );


        console.log(
            "HistoryReader iniciado"
        );

    }



    static process(frame){


        const tempCanvas =
            document.createElement(
                "canvas"
            );


        const tempCtx =
            tempCanvas.getContext(
                "2d"
            );


        tempCanvas.width =
            frame.width;


        tempCanvas.height =
            frame.height;



        tempCtx.putImageData(
            frame,
            0,
            0
        );



        const r =
            this.region;



        this.canvas.width =
            r.width;


        this.canvas.height =
            r.height;



        this.ctx.drawImage(

            tempCanvas,

            r.x,
            r.y,

            r.width,
            r.height,

            0,
            0,

            r.width,
            r.height

        );


    }


}


window.HistoryReader =
    HistoryReader;



document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        HistoryReader.init();

    }

);

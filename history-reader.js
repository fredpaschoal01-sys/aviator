/**
 * history-reader.js
 * Aviator Vision AI
 *
 * Captura apenas a área do Histórico da Ronda.
 * Envia aviso para o OCR quando o recorte estiver pronto.
 */


class HistoryReader {


    static canvas = null;
    static ctx = null;



    /*
     * Área do histórico
     * Ajustada para tela 1366x768
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



        if(!frame){

            return;

        }



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





        this.ctx.clearRect(

            0,

            0,

            r.width,

            r.height

        );





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




        /*
         * Avisamos o OCR que
         * o histórico foi atualizado
         */

        document.dispatchEvent(

            new Event(
                "historicoAtualizado"
            )

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

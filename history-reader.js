/**
 * history-reader.js
 * Aviator Vision AI
 *
 * Captura a área do Histórico da Ronda.
 * Prepara imagem para OCR.
 * Versão com diagnóstico.
 */


class HistoryReader {


    static canvas = null;
    static ctx = null;



    /*
     * Região inicial para tela 1366x768
     * Ajustaremos depois se necessário.
     */

    static region = {

        x: 1050,

        y: 120,

        width: 250,

        height: 450

    };




    static init(){


        console.log(
            "HistoryReader iniciando..."
        );



        this.canvas =
            document.getElementById(
                "historyCanvas"
            );



        if(!this.canvas){

            console.error(
                "ERRO: historyCanvas não encontrado"
            );

            return;

        }



        this.ctx =
            this.canvas.getContext(
                "2d"
            );



        console.log(
            "Canvas encontrado:",
            this.canvas
        );



        document.addEventListener(

            "frameCaptured",

            (event)=>{


                console.log(
                    "Frame recebido pelo HistoryReader"
                );


                this.process(
                    event.detail
                );


            }

        );



        console.log(
            "HistoryReader iniciado com sucesso"
        );


    }






    static process(frame){



        if(!frame){

            console.error(
                "Frame vazio"
            );

            return;

        }



        console.log(
            "Frame tamanho:",
            frame.width,
            frame.height
        );





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




        console.log(
            "Recortando região:",
            r
        );





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





        console.log(
            "Histórico desenhado no canvas"
        );





        document.dispatchEvent(

            new Event(
                "historicoAtualizado"
            )

        );



        console.log(
            "Evento enviado para OCR"
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

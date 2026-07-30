/**
 * ocr-reader.js
 * Aviator Vision AI
 *
 * Lê o histórico capturado
 * e extrai multiplicadores.
 */


class OCRReader {


    static canvas = null;

    static trabalhando = false;


    static init(){


        this.canvas =
            document.getElementById(
                "historyCanvas"
            );


        if(!this.canvas){

            console.log(
                "OCR: canvas não encontrado"
            );

            return;

        }


        console.log(
            "OCR Reader iniciado"
        );


        // Faz uma leitura a cada 3 segundos

        setInterval(()=>{

            this.read();

        },3000);



    }



    static async read(){


        if(this.trabalhando)
            return;


        this.trabalhando = true;



        try{


            const resultado =

            await Tesseract.recognize(

                this.canvas,

                "eng",

                {

                    logger: m => {

                        if(m.status){

                            console.log(
                                "OCR:",
                                m.status,
                                m.progress
                            );

                        }

                    }

                }


            );



            const texto =
                resultado.data.text;



            console.log(
                "Texto detectado:",
                texto
            );



            const multiplicadores =

                this.extract(
                    texto
                );



            if(
                multiplicadores.length
            ){

                console.log(
                    "Rodadas encontradas:",
                    multiplicadores
                );


                document.dispatchEvent(

                    new CustomEvent(

                        "historicoDetectado",

                        {

                            detail:
                                multiplicadores

                        }

                    )

                );

            }


        }

        catch(error){

            console.error(
                "Erro OCR:",
                error
            );

        }



        this.trabalhando=false;


    }





    static extract(texto){


        /*
          Procura:

          1.00x
          2.99x
          15.50x

        */


        const encontrados =

        texto.match(

            /\d+\.\d+\s*x/gi

        );



        if(!encontrados)

            return [];



        return encontrados.map(valor=>{


            return parseFloat(

                valor

                .replace(
                    "x",
                    ""
                )

            );


        });



    }


}




window.OCRReader =
    OCRReader;



document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        OCRReader.init();

    }

);

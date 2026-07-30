/**
 * ocr-reader.js
 * Leitura do histórico do Aviator
 */

class OCRReader {

    static canvas = null;
    static trabalhando = false;


    static init() {

        this.canvas = document.getElementById(
            "historyCanvas"
        );


        if (!this.canvas) {

            console.log(
                "OCR: historyCanvas não encontrado"
            );

            return;
        }


        console.log(
            "OCR Reader iniciado"
        );


        document.addEventListener(
            "historicoAtualizado",
            () => {

                this.read();

            }
        );

    }



    static async read() {


        if (this.trabalhando) {
            return;
        }


        this.trabalhando = true;


        try {


            const resultado =
                await Tesseract.recognize(

                    this.canvas,

                    "eng",

                    {

                        logger: mensagem => {

                            if (mensagem.status) {

                                console.log(
                                    "OCR:",
                                    mensagem.status
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



            const valores =
                this.extract(texto);



            if (valores.length) {

                console.log(
                    "Multiplicadores encontrados:",
                    valores
                );

            }



        } catch (erro) {


            console.error(
                "Erro OCR:",
                erro
            );


        }


        this.trabalhando = false;

    }




    static extract(texto) {


        const encontrados =
            texto.match(
                /\d+\.\d+\s*x/gi
            );


        if (!encontrados) {

            return [];

        }



        return encontrados.map(

            valor =>

                parseFloat(
                    valor
                    .replace(
                        /x/gi,
                        ""
                    )
                )

        );

    }


}



window.OCRReader = OCRReader;



document.addEventListener(
    "DOMContentLoaded",
    () => {

        OCRReader.init();

    }
);

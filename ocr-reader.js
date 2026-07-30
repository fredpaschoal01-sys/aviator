/**
 * ocr-reader.js
 * Aviator Vision AI
 *
 * Lê os multiplicadores do histórico
 * após a imagem ser tratada pelo vision.js.
 */

class OCRReader {

    static canvas = null;
    static trabalhando = false;

    static init() {

        this.canvas =
            document.getElementById("historyCanvas");

        if (!this.canvas) {

            console.error(
                "OCR: historyCanvas não encontrado."
            );

            return;

        }

        console.log(
            "OCR Reader iniciado."
        );

        // Agora espera o Vision terminar

        document.addEventListener(

            "visionReady",

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

                        logger: info => {

                            if (info.status) {

                                console.log(
                                    "OCR:",
                                    info.status
                                );

                            }

                        }

                    }

                );



            const texto =
                resultado.data.text;



            console.log(
                "=================================="
            );

            console.log(
                "OCR TEXTO BRUTO:"
            );

            console.log(texto);

            console.log(
                "=================================="
            );



            const valores =
                this.extract(texto);



            if (valores.length > 0) {

                console.log(
                    "Multiplicadores:"
                );

                console.table(valores);

            } else {

                console.log(
                    "Nenhum multiplicador encontrado."
                );

            }

        }

        catch (erro) {

            console.error(

                "Erro OCR:",

                erro

            );

        }

        this.trabalhando = false;

    }






    static extract(texto) {

        if (!texto) {

            return [];

        }



        /*
         * Corrige erros comuns do OCR
         */

        texto =

            texto

            .replace(/O/g,"0")
            .replace(/o/g,"0")
            .replace(/,/g,".")
            .replace(/\s+/g," ");




        /*
         * Procura padrões:
         *
         * 1.00x
         * 2.99x
         * 37.23x
         */

        const regex =

            /\d+\.\d+\s*x/gi;



        const encontrados =

            texto.match(regex);



        if(!encontrados){

            return [];

        }



        return encontrados.map(

            item=>{

                return parseFloat(

                    item

                    .replace(/x/gi,"")

                    .trim()

                );

            }

        );

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

/**
 * App
 * Controlador principal da aplicação.
 */

import Collector from "./collector.js";
import Engine from "./engine.js";
import Dashboard from "./dashboard.js";
import Importer from "./importer.js";


class App {


    /**
     * Inicializa aplicação.
     */
    static init() {

        this.bindEvents();

        console.log(
            "Sistema iniciado."
        );

    }



    /**
     * Conecta eventos da interface.
     */
    static bindEvents() {


        const button =
            document.getElementById(
                "btnImportar"
            );


        const input =
            document.getElementById(
                "arquivoHistorico"
            );


        if (!button || !input) {

            console.error(
                "Elementos de importação não encontrados."
            );

            return;

        }



        button.addEventListener(
            "click",
            () => {

                input.click();

            }
        );



        input.addEventListener(
            "change",
            async (event) => {


                const file =
                    event.target.files[0];


                if (!file) {
                    return;
                }


                try {


                    const rawData =
                        await Importer.import(file);



                    const collectedData =
                        Collector.process(rawData);



                    const statistics =
                        Engine.analyze(
                            collectedData
                        );



                    Dashboard.render(
                        statistics
                    );


                    console.log(
                        "Histórico importado:",
                        collectedData
                    );


                    console.log(
                        "Estatísticas:",
                        statistics
                    );


                } catch (error) {


                    console.error(
                        error.message
                    );


                }


            }
        );


    }


}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.init();

    }
);

/**
 * App
 * Controlador principal da aplicação.
 */

import Collector from "./collector.js";
import Engine from "./engine.js";
import Dashboard from "./dashboard.js";
import Importer from "./importer.js";
import StorageManager from "./storageManager.js";


class App {


    /**
     * Inicializa aplicação.
     */
    static init() {

        this.bindEvents();

        this.loadSavedHistory();

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



                    StorageManager.save(
                        collectedData
                    );



                    this.updateDashboard(
                        collectedData
                    );



                    console.log(
                        "Histórico salvo:",
                        collectedData
                    );


                } catch (error) {


                    console.error(
                        error.message
                    );


                }


            }
        );


    }



    /**
     * Carrega histórico salvo.
     */
    static loadSavedHistory() {


        const history =
            StorageManager.load();



        if (history.length === 0) {

            return;

        }



        this.updateDashboard(
            history
        );


        console.log(
            "Histórico carregado:",
            history
        );

    }



    /**
     * Executa análise e atualiza tela.
     *
     * @param {Array} data
     */
    static updateDashboard(data) {


        const statistics =
            Engine.analyze(data);



        Dashboard.render(
            statistics
        );



        console.log(
            "Estatísticas:",
            statistics
        );

    }


}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.init();

    }
);

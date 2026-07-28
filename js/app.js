/**
 * App
 * Controlador principal da aplicação.
 */

import Collector from "./collector.js";
import Engine from "./engine.js";
import Dashboard from "./dashboard.js";
import Importer from "./importer.js";
import StorageManager from "./storageManager.js";
import DataInput from "./dataInput.js";


class App {


    static init() {

        this.bindImport();

        this.loadSavedHistory();

        DataInput.init(
            (value) => {

                this.addMultiplier(value);

            }
        );


        console.log(
            "Sistema iniciado."
        );

    }



    static bindImport() {


        const button =
            document.getElementById(
                "btnImportar"
            );


        const input =
            document.getElementById(
                "arquivoHistorico"
            );


        if (!button || !input) {
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


                } catch(error) {


                    console.error(
                        error.message
                    );


                }


            }
        );


    }



    static addMultiplier(value) {


        const history =
            StorageManager.load();



        history.push({

            id:
                history.length + 1,

            timestamp:
                new Date()
                .toISOString(),

            multiplier:
                value

        });



        StorageManager.save(
            history
        );



        this.updateDashboard(
            history
        );


    }



    static loadSavedHistory() {


        const history =
            StorageManager.load();



        if (history.length > 0) {

            this.updateDashboard(
                history
            );

        }

    }



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

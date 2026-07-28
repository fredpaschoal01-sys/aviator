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
import HistoryView from "./historyView.js";
import ChartManager from "./chartManager.js";
import HistogramManager from "./histogramManager.js";
import ScoreCalculator from "./scoreCalculator.js";
import SessionManager from "./sessionManager.js";


class App {


    static currentSession = null;



    static init() {


        this.createSession();


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





    static createSession() {


        const sessions =
            SessionManager.getSessions();



        if (sessions.length === 0) {


            this.currentSession =
                SessionManager.createSession();



        } else {


            this.currentSession =
                sessions[
                    sessions.length - 1
                ];


        }



        console.log(
            "Sessão atual:",
            this.currentSession
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





        if (this.currentSession) {


            SessionManager.addResult(

                this.currentSession.id,

                value

            );


        }





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




        const score =
            ScoreCalculator.calculate(
                statistics
            );





        Dashboard.render(

            statistics,

            score

        );





        HistoryView.render(
            data
        );





        ChartManager.render(
            data
        );





        HistogramManager.render(
            statistics.distribution
        );





        console.log(
            "Estatísticas:",
            statistics
        );



        console.log(
            "Score:",
            score
        );



    }


}





document.addEventListener(

    "DOMContentLoaded",

    () => {


        App.init();


    }

);

/**
 * App
 * Controlador principal da aplicação.
 */

import Collector from "./collector.js";
import Engine from "./engine.js";
import Dashboard from "./dashboard.js";


class App {


    /**
     * Inicializa a aplicação.
     */
    static init() {

        const history = this.loadDemoData();


        const collectedData =
            Collector.process(history);


        const statistics =
            Engine.analyze(collectedData);


        Dashboard.render(statistics);


        console.log(
            "Dados processados:",
            collectedData
        );


        console.log(
            "Estatísticas:",
            statistics
        );

    }



    /**
     * Dados temporários para teste.
     *
     * Futuramente será substituído
     * por importação JSON/CSV.
     *
     * @returns {Array}
     */
    static loadDemoData() {

        return [

            1.20,
            1.85,
            2.40,
            3.10,
            1.05,
            5.80,
            2.15,
            10.50,
            1.40,
            3.75

        ];

    }


}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        App.init();

    }
);

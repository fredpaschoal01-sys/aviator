/**
 * Dashboard
 * Responsável por atualizar os componentes visuais.
 */

class Dashboard {


    /**
     * Atualiza elemento pelo ID.
     *
     * @param {string} id
     * @param {string|number} value
     */
    static updateElement(id, value) {


        const element =
            document.getElementById(id);



        if (!element) {

            return;

        }



        element.textContent = value;


    }




    /**
     * Renderiza estatísticas no dashboard.
     *
     * @param {Object} statistics
     * @param {Object} score
     */
    static render(statistics, score) {


        if (!statistics) {

            return;

        }




        this.updateElement(
            "totalRodadas",
            statistics.total
        );





        this.updateElement(
            "maiorMultiplicador",
            `${statistics.max.toFixed(2)}x`
        );





        this.updateElement(
            "mediaGeral",
            `${statistics.average.toFixed(2)}x`
        );





        this.updateElement(
            "voosBaixos",
            statistics.belowTwo
        );





        this.updateElement(
            "voosAltos",
            statistics.aboveFive
        );





        this.updateElement(
            "desvio",
            statistics.standardDeviation
        );





        this.updateElement(
            "ultimoMultiplicador",
            `${statistics.lastMultiplier.toFixed(2)}x`
        );





        this.updateElement(
            "volatilidade",
            statistics.volatility
        );





        this.updateElement(
            "sequenciaBaixa",
            statistics.currentLowSequence
        );





        /**
         * Opportunity Score
         */

        if (score) {


            this.updateElement(
                "opportunityScore",
                score.score
            );



            this.updateElement(
                "confiancaIA",
                score.description
            );


        }





        console.log(
            "Média móvel 10:",
            statistics.movingAverage10
        );





        console.log(
            "Média móvel 50:",
            statistics.movingAverage50
        );



    }


}


export default Dashboard;

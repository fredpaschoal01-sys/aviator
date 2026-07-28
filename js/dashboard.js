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

        const element = document.getElementById(id);

        if (!element) {
            return;
        }

        element.textContent = value;

    }



    /**
     * Renderiza estatísticas no dashboard.
     *
     * @param {Object} statistics
     */
    static render(statistics) {

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


    }

}


export default Dashboard;

/**
 * Dashboard
 * Responsável por atualizar os componentes visuais da aplicação.
 */

class Dashboard {


    /**
     * Atualiza um elemento HTML pelo ID.
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
     * Renderiza as estatísticas no dashboard.
     *
     * @param {Object} statistics
     */
    static render(statistics) {

        if (!statistics) {
            return;
        }


        this.updateElement(
            "totalRounds",
            statistics.total
        );


        this.updateElement(
            "averageMultiplier",
            `${statistics.average}x`
        );


        this.updateElement(
            "highestMultiplier",
            `${statistics.max}x`
        );


        this.updateElement(
            "lowestMultiplier",
            `${statistics.min}x`
        );


        this.updateElement(
            "standardDeviation",
            statistics.standardDeviation
        );


        this.updateElement(
            "belowTwo",
            statistics.belowTwo
        );


        this.updateElement(
            "aboveFive",
            statistics.aboveFive
        );

    }


}


export default Dashboard;

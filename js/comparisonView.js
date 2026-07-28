/**
 * ComparisonView
 * Responsável por exibir comparações entre sessões.
 */

class ComparisonView {



    /**
     * Atualiza elemento HTML.
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
     * Renderiza comparação.
     *
     * @param {Object} comparison
     */
    static render(comparison) {



        if (!comparison || comparison.error) {

            return;

        }





        this.updateElement(

            "comparacaoRodadas",

            comparison.totalDifference

        );





        this.updateElement(

            "comparacaoMedia",

            `${comparison.averageDifference.toFixed(2)}x`

        );





        this.updateElement(

            "comparacaoMaior",

            `${comparison.maxDifference.toFixed(2)}x`

        );





        this.updateElement(

            "comparacaoVolatilidade",

            comparison.volatilityDifference

        );



    }



}


export default ComparisonView;

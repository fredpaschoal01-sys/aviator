/**
 * ComparisonEngine
 * Compara sessões históricas.
 *
 * Responsável apenas por análise comparativa.
 */

class ComparisonEngine {


    /**
     * Compara duas sessões.
     *
     * @param {Object} sessionA
     * @param {Object} sessionB
     * @returns {Object}
     */
    static compare(sessionA, sessionB) {


        if (!sessionA || !sessionB) {


            return {

                error:
                    "Sessões inválidas"

            };


        }



        const valuesA =
            sessionA.results.map(
                item => item.multiplier
            );



        const valuesB =
            sessionB.results.map(
                item => item.multiplier
            );




        return {


            sessionA:
                sessionA.id,



            sessionB:
                sessionB.id,



            totalDifference:

                valuesB.length -
                valuesA.length,



            averageDifference:

                this.average(valuesB) -
                this.average(valuesA),



            maxDifference:

                Math.max(...valuesB) -
                Math.max(...valuesA),



            volatilityDifference:

                this.volatility(
                    valuesB
                )
                -
                this.volatility(
                    valuesA
                )



        };


    }





    /**
     * Calcula média.
     *
     * @param {Array} values
     * @returns {number}
     */
    static average(values) {


        if (!values.length) {

            return 0;

        }


        return Number(

            (
                values.reduce(
                    (sum, value) =>
                        sum + value,
                    0
                )
                /
                values.length

            ).toFixed(2)

        );


    }





    /**
     * Calcula volatilidade simples.
     *
     * @param {Array} values
     * @returns {number}
     */
    static volatility(values) {


        if (!values.length) {

            return 0;

        }



        const avg =
            this.average(values);



        const variance =
            values.reduce(

                (sum, value) =>

                    sum +
                    Math.pow(
                        value - avg,
                        2
                    ),

                0

            )
            /
            values.length;



        return Number(

            Math.sqrt(
                variance
            )
            .toFixed(2)

        );


    }


}


export default ComparisonEngine;

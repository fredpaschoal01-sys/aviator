/**
 * Engine
 * Responsável pelos cálculos estatísticos dos dados históricos.
 */

class Engine {


    /**
     * Calcula estatísticas gerais do histórico.
     *
     * @param {Array} data
     * @returns {Object}
     */
    static analyze(data) {


        if (!Array.isArray(data) || data.length === 0) {

            return this.emptyResult();

        }



        const values =
            data.map(
                item => Number(item.multiplier)
            );



        const total =
            values.length;



        const average =
            values.reduce(
                (sum, value) => sum + value,
                0
            ) / total;



        const max =
            Math.max(...values);



        const min =
            Math.min(...values);



        const variance =
            values.reduce(
                (sum, value) =>
                    sum +
                    Math.pow(
                        value - average,
                        2
                    ),
                0
            ) / total;



        const standardDeviation =
            Math.sqrt(variance);



        return {

            total,

            average:
                this.round(average),


            max:
                this.round(max),


            min:
                this.round(min),


            standardDeviation:
                this.round(standardDeviation),


            belowTwo:
                values.filter(
                    value => value < 2
                ).length,


            aboveFive:
                values.filter(
                    value => value >= 5
                ).length,


            lastMultiplier:
                this.round(
                    values[values.length - 1]
                ),


            currentLowSequence:
                this.currentLowSequence(values),


            longestLowSequence:
                this.longestLowSequence(values),


            volatility:
                this.volatility(
                    standardDeviation
                ),


            distribution:
                this.distribution(values),


            movingAverage10:
                this.movingAverage(
                    values,
                    10
                ),


            movingAverage50:
                this.movingAverage(
                    values,
                    50
                )

        };

    }



    static emptyResult() {

        return {

            total: 0,
            average: 0,
            max: 0,
            min: 0,
            standardDeviation: 0,
            belowTwo: 0,
            aboveFive: 0,
            lastMultiplier: 0,
            currentLowSequence: 0,
            longestLowSequence: 0,
            volatility: "Sem dados",
            distribution: {},
            movingAverage10: 0,
            movingAverage50: 0

        };

    }



    static round(value) {

        return Number(
            value.toFixed(2)
        );

    }



    static currentLowSequence(values) {

        let count = 0;


        for (
            let i = values.length - 1;
            i >= 0;
            i--
        ) {

            if (values[i] < 2) {

                count++;

            } else {

                break;

            }

        }


        return count;

    }



    static longestLowSequence(values) {

        let current = 0;
        let longest = 0;


        values.forEach(value => {


            if (value < 2) {

                current++;


                if (current > longest) {

                    longest = current;

                }


            } else {

                current = 0;

            }


        });


        return longest;

    }



    static volatility(value) {


        if (value < 1) {

            return "Baixa";

        }


        if (value < 3) {

            return "Moderada";

        }


        return "Alta";

    }



    static distribution(values) {


        return {

            low:
                values.filter(
                    value => value < 2
                ).length,


            medium:
                values.filter(
                    value =>
                        value >= 2 &&
                        value < 5
                ).length,


            high:
                values.filter(
                    value =>
                        value >= 5 &&
                        value < 10
                ).length,


            extreme:
                values.filter(
                    value => value >= 10
                ).length

        };

    }



    static movingAverage(values, period) {


        if (values.length === 0) {

            return 0;

        }


        const slice =
            values.slice(
                -period
            );


        const average =
            slice.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) / slice.length;


        return this.round(
            average
        );

    }



    /**
     * Retorna últimos registros.
     *
     * @param {Array} data
     * @param {number} limit
     * @returns {Array}
     */
    static lastResults(data, limit = 10) {


        if (!Array.isArray(data)) {

            return [];

        }


        return data.slice(
            -limit
        );

    }


}


export default Engine;

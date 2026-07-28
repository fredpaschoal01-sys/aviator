/**
 * Engine
 * Responsável pelos cálculos estatísticos dos dados históricos.
 */

class Engine {

    /**
     * Calcula estatísticas gerais do histórico.
     *
     * @param {Array} data - Dados tratados pelo Collector
     * @returns {Object} Resultado estatístico
     */
    static analyze(data) {

        if (!Array.isArray(data) || data.length === 0) {
            return {
                total: 0,
                average: 0,
                max: 0,
                min: 0,
                standardDeviation: 0,
                belowTwo: 0,
                aboveFive: 0
            };
        }


        const values = data.map(
            item => item.multiplier
        );


        const total = values.length;


        const average =
            values.reduce(
                (sum, value) => sum + value,
                0
            ) / total;


        const max = Math.max(...values);


        const min = Math.min(...values);


        const variance =
            values.reduce(
                (sum, value) =>
                    sum + Math.pow(value - average, 2),
                0
            ) / total;


        const standardDeviation =
            Math.sqrt(variance);


        const belowTwo =
            values.filter(
                value => value < 2
            ).length;


        const aboveFive =
            values.filter(
                value => value >= 5
            ).length;


        return {

            total,

            average:
                Number(average.toFixed(2)),

            max,

            min,

            standardDeviation:
                Number(
                    standardDeviation.toFixed(2)
                ),

            belowTwo,

            aboveFive

        };

    }


    /**
     * Retorna os últimos registros.
     *
     * @param {Array} data
     * @param {number} limit
     * @returns {Array}
     */
    static lastResults(data, limit = 10) {

        if (!Array.isArray(data)) {
            return [];
        }


        return data.slice(-limit);

    }

}


export default Engine;

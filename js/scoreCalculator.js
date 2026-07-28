/**
 * ScoreCalculator
 * Calcula um índice estatístico da sessão.
 *
 * Este módulo não prevê resultados.
 * Apenas resume características históricas.
 */

class ScoreCalculator {


    /**
     * Calcula score estatístico.
     *
     * @param {Object} statistics
     * @returns {Object}
     */
    static calculate(statistics) {


        if (!statistics) {

            return {

                score: 0,

                description:
                    "Sem dados"

            };

        }



        let score = 50;



        /*
         * Mais dados aumentam
         * a confiabilidade estatística.
         */

        if (statistics.total >= 50) {

            score += 15;

        } else if (statistics.total >= 20) {

            score += 10;

        }



        /*
         * Volatilidade influencia
         * apenas a descrição da sessão.
         */

        if (statistics.volatility === "Baixa") {

            score += 10;

        }


        if (statistics.volatility === "Alta") {

            score -= 10;

        }



        /*
         * Distribuição histórica.
         */

        if (
            statistics.distribution &&
            statistics.distribution.medium >
            statistics.distribution.low
        ) {

            score += 5;

        }



        /*
         * Limites.
         */

        if (score > 100) {

            score = 100;

        }


        if (score < 0) {

            score = 0;

        }



        return {

            score,


            description:
                this.description(score)

        };


    }




    /**
     * Descrição do score.
     *
     * @param {number} score
     * @returns {string}
     */
    static description(score) {


        if (score >= 80) {

            return "Sessão estatisticamente estável";

        }


        if (score >= 60) {

            return "Sessão com variação moderada";

        }


        return "Sessão com alta variação";

    }


}


export default ScoreCalculator;

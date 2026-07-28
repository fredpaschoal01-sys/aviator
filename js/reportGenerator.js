/**
 * ReportGenerator
 * Responsável por montar relatórios estatísticos.
 */

class ReportGenerator {


    /**
     * Cria um relatório da sessão.
     *
     * @param {Object} session
     * @param {Object} statistics
     * @param {Object} score
     * @returns {Object}
     */
    static generate(session, statistics, score) {


        if (!session || !statistics) {


            return null;


        }




        return {


            generatedAt:

                new Date()
                .toISOString(),



            session: {


                id:
                    session.id,


                createdAt:
                    session.createdAt,


                totalResults:
                    session.results.length


            },



            statistics: {


                total:
                    statistics.total,


                average:
                    statistics.average,


                maximum:
                    statistics.max,


                minimum:
                    statistics.min,


                volatility:
                    statistics.volatility,


                standardDeviation:
                    statistics.standardDeviation,


                movingAverage10:
                    statistics.movingAverage10,


                movingAverage50:
                    statistics.movingAverage50


            },



            distribution:

                statistics.distribution,



            score: {


                value:
                    score
                    ?
                    score.score
                    :
                    0,


                description:
                    score
                    ?
                    score.description
                    :
                    "Sem dados"


            }


        };


    }




    /**
     * Converte relatório para JSON.
     *
     * @param {Object} report
     * @returns {string}
     */
    static toJSON(report) {


        return JSON.stringify(

            report,

            null,

            4

        );


    }


}


export default ReportGenerator;

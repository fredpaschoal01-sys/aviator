/**
 * HistogramManager
 * Responsável pelo gráfico de distribuição dos multiplicadores.
 */

class HistogramManager {


    static chart = null;



    /**
     * Renderiza o histograma.
     *
     * @param {Object} distribution
     */
    static render(distribution) {


        const canvas =
            document.getElementById(
                "graficoDistribuicao"
            );


        if (!canvas || !distribution) {
            return;
        }



        const labels = [

            "Abaixo de 2x",
            "2x até 5x",
            "5x até 10x",
            "Acima de 10x"

        ];



        const values = [

            distribution.low,
            distribution.medium,
            distribution.high,
            distribution.extreme

        ];



        if (this.chart) {


            this.chart.data.datasets[0].data =
                values;


            this.chart.update();


            return;

        }



        this.chart =
            new Chart(
                canvas,
                {

                    type: "bar",


                    data: {

                        labels,


                        datasets: [
                            {

                                label:
                                    "Distribuição",

                                data:
                                    values

                            }
                        ]

                    },


                    options: {

                        responsive:
                            true,


                        scales: {

                            y: {

                                beginAtZero:
                                    true

                            }

                        }

                    }

                }

            );


    }


}


export default HistogramManager;

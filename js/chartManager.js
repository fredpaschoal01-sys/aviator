/**
 * ChartManager
 * Responsável pelo gráfico de multiplicadores.
 */

class ChartManager {


    static chart = null;



    /**
     * Renderiza ou atualiza gráfico.
     *
     * @param {Array} history
     */
    static render(history) {


        const canvas =
            document.getElementById(
                "graficoPrincipal"
            );


        if (!canvas) {
            return;
        }



        const labels =
            history.map(
                (_, index) =>
                    index + 1
            );



        const values =
            history.map(
                item =>
                    item.multiplier
            );



        if (this.chart) {


            this.chart.data.labels =
                labels;


            this.chart.data.datasets[0].data =
                values;


            this.chart.update();


            return;

        }



        this.chart =
            new Chart(
                canvas,
                {

                    type: "line",

                    data: {

                        labels: labels,

                        datasets: [
                            {

                                label:
                                    "Multiplicador",

                                data:
                                    values,

                                tension:
                                    0.3

                            }
                        ]

                    },


                    options: {

                        responsive:
                            true,


                        plugins: {

                            legend: {

                                display:
                                    true

                            }

                        },


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


export default ChartManager;

/**
 * HistoryView
 * Responsável por renderizar o histórico na tabela.
 */

class HistoryView {


    /**
     * Atualiza a tabela de histórico.
     *
     * @param {Array} history
     */
    static render(history) {


        const table =
            document.getElementById(
                "historico"
            );


        if (!table) {
            return;
        }


        table.innerHTML = "";



        const items =
            history.slice(-20).reverse();



        items.forEach(item => {


            const row =
                document.createElement(
                    "tr"
                );


            const time =
                new Date(
                    item.timestamp
                ).toLocaleTimeString(
                    "pt-BR"
                );



            const status =
                this.getStatus(
                    item.multiplier
                );



            row.innerHTML = `

                <td>${time}</td>

                <td>
                    ${item.multiplier.toFixed(2)}x
                </td>

                <td>
                    ${status}
                </td>

            `;



            table.appendChild(
                row
            );


        });


    }



    /**
     * Classifica visualmente o multiplicador.
     *
     * @param {number} value
     * @returns {string}
     */
    static getStatus(value) {


        if (value < 2) {

            return "Baixo";

        }


        if (value >= 5) {

            return "Alto";

        }


        return "Normal";

    }


}


export default HistoryView;

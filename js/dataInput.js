/**
 * DataInput
 * Responsável pela entrada rápida de novos multiplicadores.
 */

class DataInput {


    /**
     * Inicializa o campo de entrada.
     *
     * @param {Function} callback
     */
    static init(callback) {


        const button =
            document.getElementById(
                "btnAdicionar"
            );


        const input =
            document.getElementById(
                "novoMultiplicador"
            );


        if (!button || !input) {

            console.log(
                "Entrada rápida ainda não adicionada ao HTML."
            );

            return;

        }



        button.addEventListener(
            "click",
            () => {


                const value =
                    Number(
                        input.value
                    );



                if (!value || value <= 0) {

                    return;

                }



                callback(value);



                input.value = "";

            }
        );


    }


}


export default DataInput;

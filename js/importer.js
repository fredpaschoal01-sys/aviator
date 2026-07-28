/**
 * Importer
 * Responsável pela leitura de arquivos históricos.
 */

class Importer {


    /**
     * Lê um arquivo JSON selecionado pelo usuário.
     *
     * @param {File} file
     * @returns {Promise<Array>}
     */
    static readJSON(file) {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();


            reader.onload = (event) => {

                try {

                    const data =
                        JSON.parse(event.target.result);


                    resolve(data);


                } catch (error) {

                    reject(
                        new Error(
                            "Arquivo JSON inválido."
                        )
                    );

                }

            };


            reader.onerror = () => {

                reject(
                    new Error(
                        "Erro ao ler arquivo."
                    )
                );

            };


            reader.readAsText(file);

        });

    }


    /**
     * Identifica o tipo de arquivo.
     *
     * @param {File} file
     * @returns {Promise<Array>}
     */
    static import(file) {

        if (!file) {

            return Promise.reject(
                new Error(
                    "Nenhum arquivo selecionado."
                )
            );

        }


        const extension =
            file.name
                .split(".")
                .pop()
                .toLowerCase();



        if (extension === "json") {

            return this.readJSON(file);

        }


        return Promise.reject(
            new Error(
                "Formato não suportado."
            )
        );

    }


}


export default Importer;

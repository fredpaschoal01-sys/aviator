/**
 * StorageManager
 * Responsável por salvar e recuperar históricos locais.
 */

class StorageManager {


    static key = "aviator_history";


    /**
     * Salva histórico no navegador.
     *
     * @param {Array} data
     */
    static save(data) {

        if (!Array.isArray(data)) {
            return false;
        }


        localStorage.setItem(
            this.key,
            JSON.stringify(data)
        );


        return true;

    }



    /**
     * Recupera histórico salvo.
     *
     * @returns {Array}
     */
    static load() {

        const data =
            localStorage.getItem(
                this.key
            );


        if (!data) {
            return [];
        }


        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "Erro ao carregar histórico.",
                error
            );


            return [];

        }

    }



    /**
     * Remove histórico salvo.
     */
    static clear() {

        localStorage.removeItem(
            this.key
        );

    }



    /**
     * Verifica se existe histórico.
     *
     * @returns {boolean}
     */
    static exists() {

        return this.load().length > 0;

    }


}


export default StorageManager;

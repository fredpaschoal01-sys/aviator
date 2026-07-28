/**
 * Collector
 * Responsável por receber, validar e padronizar dados históricos.
 */

class Collector {

    /**
     * Recebe um histórico bruto e retorna dados tratados.
     * 
     * @param {Array} history - Lista de multiplicadores
     * @returns {Array} Dados padronizados
     */
    static process(history) {

        if (!Array.isArray(history)) {
            return [];
        }

        return history
            .map((item, index) => {

                const multiplier = Number(
                    typeof item === "object"
                        ? item.multiplier
                        : item
                );

                if (isNaN(multiplier) || multiplier <= 0) {
                    return null;
                }

                return {
                    id: index + 1,
                    timestamp:
                        typeof item === "object" && item.timestamp
                            ? item.timestamp
                            : new Date().toISOString(),

                    multiplier: multiplier
                };

            })
            .filter(item => item !== null);
    }


    /**
     * Retorna quantidade de registros válidos.
     *
     * @param {Array} data
     * @returns {number}
     */
    static count(data) {

        return Array.isArray(data)
            ? data.length
            : 0;

    }

}


export default Collector;

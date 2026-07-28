/**
 * SessionManager
 * Gerencia sessões independentes de histórico.
 */

class SessionManager {


    static storageKey =
        "aviator_sessions";



    /**
     * Retorna todas as sessões salvas.
     *
     * @returns {Array}
     */
    static getSessions() {


        const sessions =
            localStorage.getItem(
                this.storageKey
            );


        if (!sessions) {

            return [];

        }


        return JSON.parse(
            sessions
        );


    }




    /**
     * Cria uma nova sessão.
     *
     * @returns {Object}
     */
    static createSession() {


        const sessions =
            this.getSessions();



        const session = {


            id:
                Date.now(),


            createdAt:
                new Date()
                .toISOString(),


            results: []


        };



        sessions.push(
            session
        );



        this.saveSessions(
            sessions
        );



        return session;


    }





    /**
     * Salva todas as sessões.
     *
     * @param {Array} sessions
     */
    static saveSessions(sessions) {


        localStorage.setItem(

            this.storageKey,

            JSON.stringify(
                sessions
            )

        );


    }





    /**
     * Adiciona resultado em uma sessão.
     *
     * @param {number} sessionId
     * @param {number} multiplier
     */
    static addResult(sessionId, multiplier) {


        const sessions =
            this.getSessions();



        const session =
            sessions.find(
                item =>
                    item.id === sessionId
            );



        if (!session) {

            return;

        }



        session.results.push({

            timestamp:
                new Date()
                .toISOString(),

            multiplier

        });



        this.saveSessions(
            sessions
        );


    }





    /**
     * Busca uma sessão pelo ID.
     *
     * @param {number} id
     * @returns {Object|null}
     */
    static getSession(id) {


        const sessions =
            this.getSessions();



        return (
            sessions.find(
                item =>
                    item.id === id
            )
            ||
            null
        );


    }


}


export default SessionManager;

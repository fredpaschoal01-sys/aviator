class Collector {

    constructor() {
        this.history = [];
    }

    importJSON(texto) {

        try {

            const dados = JSON.parse(texto);

            this.history = dados;

            console.log("Histórico carregado:", dados);

            alert(`Histórico carregado com ${dados.length} rodadas.`);

            return true;

        } catch (erro) {

            alert("Erro ao ler o arquivo JSON.");

            console.error(erro);

            return false;

        }

    }

    getHistory() {
        return this.history;
    }

    clear() {
        this.history = [];
    }

}

window.collector = new Collector();

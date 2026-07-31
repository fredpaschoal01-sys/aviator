/*
 * content.js
 * Aviator Analyzer AI
 * Leitura automática do Histórico da Ronda
 */

console.log("==================================");
console.log("AVIATOR ANALYZER AI");
console.log("Content Script iniciado");
console.log("==================================");

class AviatorReader {

    static historico = [];

    static ultimoHash = "";

    static iniciar() {

        console.log("Aguardando histórico...");

        this.observarPagina();

        this.lerHistorico();

        setInterval(() => {

            this.lerHistorico();

        }, 500);

    }

    static observarPagina() {

        const observer = new MutationObserver(() => {

            this.lerHistorico();

        });

        observer.observe(document.body, {

            childList: true,

            subtree: true

        });

    }

    static lerHistorico() {

        const payouts = document.querySelectorAll(".payout");

        if (!payouts.length) {

            return;

        }

        const lista = [];

        payouts.forEach((item) => {

            const texto = item.textContent.trim();

            const numero = parseFloat(

                texto.replace("x", "")

            );

            if (!isNaN(numero)) {

                lista.push(numero);

            }

        });

        const hash = lista.join(",");

        if (hash === this.ultimoHash) {

            return;

        }

        this.ultimoHash = hash;

        this.historico = lista;

        console.clear();

        console.log("================================");

        console.log("HISTÓRICO CAPTURADO");

        console.log("================================");

        console.table(lista);

        console.log("Total:", lista.length);

        chrome.storage.local.set({

            historico: lista,

            ultimaAtualizacao: Date.now()

        });

    }

}

window.addEventListener(

    "load",

    () => {

        AviatorReader.iniciar();

    }

);

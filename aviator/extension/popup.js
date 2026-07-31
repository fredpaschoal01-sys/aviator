/*
 * popup.js
 * Aviator Analyzer AI
 */

document.addEventListener("DOMContentLoaded", () => {

    const status = document.getElementById("status");
    const total = document.getElementById("total");
    const ultimo = document.getElementById("ultimo");
    const hora = document.getElementById("hora");
    const abrirDashboard = document.getElementById("abrirDashboard");

    atualizar();

    // Atualiza automaticamente a cada segundo
    setInterval(atualizar, 1000);

    function atualizar() {

        chrome.storage.local.get(

            ["historico", "ultimaAtualizacao"],

            (dados) => {

                const lista = dados.historico || [];

                total.textContent = lista.length;

                if (lista.length) {

                    ultimo.textContent =
                        lista[0].toFixed(2) + "x";

                    status.textContent = "Conectado";

                    status.style.color = "#00ff66";

                } else {

                    ultimo.textContent = "--";

                    status.textContent = "Aguardando...";

                    status.style.color = "#ffaa00";

                }

                if (dados.ultimaAtualizacao) {

                    const d = new Date(dados.ultimaAtualizacao);

                    hora.textContent =
                        d.toLocaleTimeString();

                } else {

                    hora.textContent = "--";

                }

            }

        );

    }

    abrirDashboard.addEventListener(

        "click",

        () => {

            chrome.tabs.create({

                url: "https://fredpaschoal01-sys.github.io/aviator/"

            });

        }

    );

});

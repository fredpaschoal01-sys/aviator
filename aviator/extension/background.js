/*
 * background.js
 * Aviator Analyzer AI
 *
 * Responsável por receber mensagens do content.js
 * e manter a extensão ativa.
 */

console.log("==================================");
console.log("AVIATOR ANALYZER AI");
console.log("Background iniciado");
console.log("==================================");

chrome.runtime.onInstalled.addListener(() => {

    console.log("Extensão instalada com sucesso.");

});

chrome.runtime.onMessage.addListener(

    (request, sender, sendResponse) => {

        switch (request.type) {

            case "NOVO_HISTORICO":

                console.log("Histórico recebido.");

                console.table(request.dados);

                chrome.storage.local.set({

                    historico: request.dados,

                    ultimaAtualizacao: Date.now()

                });

                sendResponse({

                    status: "ok"

                });

                break;

            case "PING":

                sendResponse({

                    status: "online"

                });

                break;

            default:

                sendResponse({

                    status: "ignorado"

                });

        }

        return true;

    }

);

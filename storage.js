// ===========================
// storage.js
// Aviator Analyzer AI
// ===========================

const STORAGE_KEY = "aviator_historico";

// Salvar histórico
function salvarHistorico() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(historico)
    );
}

// Carregar histórico
function carregarHistorico() {

    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados)
        return;

    historico = JSON.parse(dados);

    atualizarDashboard();

}

// Limpar histórico
function limparHistorico() {

    if (!confirm("Deseja apagar todo o histórico?"))
        return;

    historico = [];

    salvarHistorico();

    atualizarDashboard();

}

// Exportar JSON
function exportarHistorico() {

    const blob = new Blob(
        [JSON.stringify(historico, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "historico_aviator.json";

    a.click();

    URL.revokeObjectURL(url);

}

// Importar JSON
function importarHistorico(evento) {

    const arquivo = evento.target.files[0];

    if (!arquivo)
        return;

    const leitor = new FileReader();

    leitor.onload = function(e){

        historico = JSON.parse(e.target.result);

        salvarHistorico();

        atualizarDashboard();

    }

    leitor.readAsText(arquivo);

}
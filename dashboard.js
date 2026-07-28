class Dashboard {

    atualizar(estatisticas){

        if(!estatisticas) return;

        document.getElementById("totalRodadas").textContent =
            estatisticas.total;

        document.getElementById("mediaGeral").textContent =
            estatisticas.media.toFixed(2) + "x";

        document.getElementById("maiorMultiplicador").textContent =
            estatisticas.maior.toFixed(2) + "x";

        document.getElementById("voosBaixos").textContent =
            estatisticas.voosBaixos;

        document.getElementById("voosAltos").textContent =
            estatisticas.voosAltos;

    }

}

window.dashboard = new Dashboard();

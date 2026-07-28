// =============================
// AVIATOR ANALYZER AI
// script.js
// =============================

let historico = [];

const totalRodadas = document.getElementById("totalRodadas");
const ultimoMultiplicador = document.getElementById("ultimoMultiplicador");
const maiorMultiplicador = document.getElementById("maiorMultiplicador");
const mediaGeral = document.getElementById("mediaGeral");
const sequenciaBaixa = document.getElementById("sequenciaBaixa");
const statusIA = document.getElementById("statusIA");

const media20 = document.getElementById("media20");
const media50 = document.getElementById("media50");
const desvio = document.getElementById("desvio");
const maiorSequencia = document.getElementById("maiorSequencia");
const probabilidade = document.getElementById("probabilidade");

const historicoTabela = document.getElementById("historico");
const logs = document.getElementById("logs");

const ctx = document.getElementById("graficoPrincipal").getContext("2d");

const grafico = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Multiplicadores",
            data: [],
            borderWidth: 2,
            tension: 0.25
        }]
    },
    options: {
        responsive: true,
        animation: false
    }
});

function adicionarRodada(valor){

    const agora = new Date().toLocaleTimeString();

    historico.push({
        hora: agora,
        valor: valor
    });

    atualizarDashboard();
}

function atualizarDashboard(){

    totalRodadas.innerHTML = historico.length;

    if(historico.length===0)
        return;

    const ultimo = historico[historico.length-1];

    ultimoMultiplicador.innerHTML =
        ultimo.valor.toFixed(2)+"x";

    const maior = Math.max(...historico.map(x=>x.valor));

    maiorMultiplicador.innerHTML =
        maior.toFixed(2)+"x";

    const media =
        historico.reduce((s,x)=>s+x.valor,0)/historico.length;

    mediaGeral.innerHTML =
        media.toFixed(2)+"x";

    atualizarSequencias();

    atualizarTabela();

    atualizarGrafico();

    atualizarEstatisticas();

}

function atualizarSequencias(){

    let atual=0;
    let maior=0;

    for(let i=0;i<historico.length;i++){

        if(historico[i].valor<2){

            atual++;

            if(atual>maior)
                maior=atual;

        }else{

            atual=0;

        }

    }

    sequenciaBaixa.innerHTML=atual;
    maiorSequencia.innerHTML=maior;

}

function atualizarTabela(){

    historicoTabela.innerHTML="";

    const ultimos=historico.slice(-20).reverse();

    ultimos.forEach(item=>{

        const tr=document.createElement("tr");

        tr.innerHTML=`
            <td>${item.hora}</td>
            <td>${item.valor.toFixed(2)}x</td>
            <td>${item.valor<2?"Baixo":"Alto"}</td>
        `;

        historicoTabela.appendChild(tr);

    });

}

function atualizarGrafico(){

    grafico.data.labels=
        historico.map((x,i)=>i+1);

    grafico.data.datasets[0].data=
        historico.map(x=>x.valor);

    grafico.update();

}

function atualizarEstatisticas(){

    const ult20=
        historico.slice(-20).map(x=>x.valor);

    const ult50=
        historico.slice(-50).map(x=>x.valor);

    media20.innerHTML=
        mediaArray(ult20).toFixed(2);

    media50.innerHTML=
        mediaArray(ult50).toFixed(2);

    desvio.innerHTML=
        desvioPadrao(
            historico.map(x=>x.valor)
        ).toFixed(2);

    const acima5=
        historico.filter(x=>x.valor>=5).length;

    const perc=
        (acima5/historico.length)*100;

    probabilidade.innerHTML=
        perc.toFixed(1)+"%";

    statusIA.innerHTML=
        analisarMomento();

}

function mediaArray(arr){

    if(arr.length===0)
        return 0;

    return arr.reduce((a,b)=>a+b,0)/arr.length;

}

function desvioPadrao(arr){

    if(arr.length===0)
        return 0;

    const media=mediaArray(arr);

    const variancia=
        arr.reduce((s,x)=>s+Math.pow(x-media,2),0)/arr.length;

    return Math.sqrt(variancia);

}

function analisarMomento(){

    if(historico.length<20)
        return "Coletando dados";

    const ultimos=
        historico.slice(-10);

    const baixos=
        ultimos.filter(x=>x.valor<2).length;

    if(baixos>=8)
        return "Alta concentração de voos baixos";

    if(baixos<=2)
        return "Maioria acima de 2x";

    return "Distribuição dentro da média";

}

function log(msg){

    logs.innerHTML+=`<p>${msg}</p>`;

    logs.scrollTop=logs.scrollHeight;

}

// =========================
// DEMONSTRAÇÃO
// =========================

// Apenas para testar a interface.
// Depois será substituído pelos dados do backend.

setInterval(()=>{

    const valor=
        Number((Math.random()*10+1).toFixed(2));

    adicionarRodada(valor);

    log("Nova rodada registrada: "+valor+"x");

},3000);
const btnImportar =
document.getElementById("btnImportar");

const arquivoHistorico =
document.getElementById("arquivoHistorico");

btnImportar.addEventListener("click",()=>{

    arquivoHistorico.click();

});

arquivoHistorico.addEventListener("change",(e)=>{

    const arquivo=e.target.files[0];

    if(!arquivo)return;

    const leitor=new FileReader();

    leitor.onload=(evento)=>{

        if(collector.importJSON(evento.target.result)){

            const resultado=

            engine.calcular(

                collector.getHistory()

            );

            dashboard.atualizar(resultado);

        }

    };

    leitor.readAsText(arquivo);

});

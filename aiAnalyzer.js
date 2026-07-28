class AIAnalyzer {


    static analyze(history) {


        if (!history || history.length < 10) {

            return {
                status: "Coletando dados...",
                message: "Preciso de mais rodadas para analisar."
            };

        }


        const valores = history.map(item => 
            Number(item.multiplier)
        );


        const media =
            valores.reduce((a,b)=>a+b,0)
            /
            valores.length;



        const baixos =
            valores.filter(
                x => x < 2
            ).length;



        const altos =
            valores.filter(
                x => x >= 5
            ).length;



        let status;
        let message;



        if (baixos > valores.length * 0.6) {


            status = "ATENÇÃO";


            message =
            "Muitos voos abaixo de 2x. Mercado instável.";


        }


        else if (altos >= 3) {


            status = "OPORTUNIDADE";


            message =
            "Boa presença de multiplicadores altos.";


        }


        else {


            status = "NEUTRO";


            message =
            "Analisando comportamento atual.";

        }




        return {


            status,

            message,

            media: media.toFixed(2),

            baixos,

            altos


        };


    }


}


export default AIAnalyzer;

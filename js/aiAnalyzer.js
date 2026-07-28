class AIAnalyzer {

    static async analyze(statistics) {

        try {

            const response = await fetch("https://api.openai.com/v1/responses", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer SUA_CHAVE_OPENAI"

                },

                body: JSON.stringify({

                    model: "gpt-5.5",

                    input: `
Analise estas estatísticas do Aviator.

Total: ${statistics.total}
Média: ${statistics.average}
Maior: ${statistics.max}
Menor: ${statistics.min}
Desvio: ${statistics.standardDeviation}
Voos abaixo de 2x: ${statistics.belowTwo}
Voos acima de 5x: ${statistics.aboveFive}
Volatilidade: ${statistics.volatility}
Média móvel 10: ${statistics.movingAverage10}
Média móvel 50: ${statistics.movingAverage50}

Faça uma análise estatística objetiva.
Não afirme prever resultados futuros.
`
                })

            });

            const data = await response.json();

            return data.output_text;

        } catch (e) {

            console.error(e);

            return "Erro ao consultar IA.";

        }

    }

}

export default AIAnalyzer;

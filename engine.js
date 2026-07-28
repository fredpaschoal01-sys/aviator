class Engine {

    calcular(history){

        if(history.length === 0){

            return null;

        }

        const valores = history.map(item => item.multiplier);

        const total = valores.length;

        const soma = valores.reduce((a,b)=>a+b,0);

        const media = soma / total;

        const maior = Math.max(...valores);

        const menor = Math.min(...valores);

        const voosBaixos = valores.filter(v => v < 2).length;

        const voosAltos = valores.filter(v => v >= 5).length;

        return {

            total,

            media,

            maior,

            menor,

            voosBaixos,

            voosAltos

        };

    }

}

window.engine = new Engine();

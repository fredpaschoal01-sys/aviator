class Engine{

    calcular(history){

        if(history.length===0){

            return null;

        }

        const valores=history.map(item=>item.multiplier);

        return{

            total:valores.length,

            media:valores.reduce((a,b)=>a+b,0)/valores.length,

            maior:Math.max(...valores),

            menor:Math.min(...valores),

            voosBaixos:valores.filter(v=>v<2).length,

            voosAltos:valores.filter(v=>v>=5).length

        };

    }

}

window.engine=new Engine();

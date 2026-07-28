class Collector {

    constructor() {
        this.history = [];
    }

    importJSON(texto){

        try{

            this.history = JSON.parse(texto);

            return true;

        }catch(e){

            console.error(e);

            return false;

        }

    }

    getHistory(){

        return this.history;

    }

    clear(){

        this.history=[];

    }

}

window.collector=new Collector();

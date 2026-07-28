class Collector {

    constructor() {
        this.history = [];
    }

    load(data){
        this.history = data;
    }

    getHistory(){
        return this.history;
    }

    clear(){
        this.history = [];
    }

}

window.collector = new Collector();

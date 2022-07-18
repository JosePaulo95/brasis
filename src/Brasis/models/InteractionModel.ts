
export class InteractionModel {
    method: Function;
    event_key: string;
    
    constructor(event_key: string, method: Function){
        this.event_key = event_key
        this.method = method
    }
} 
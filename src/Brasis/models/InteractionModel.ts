
export class InteractionModel {
    method: Function;
    event_key: string;
    
    constructor(event_key: string, method: Function){
        this.event_key = event_key
        this.method = method
    }

    match(event_key: string) {
        if(this.event_key == "*"){
            return true
        }

        event_key = event_key.includes(">")?event_key:">"+event_key

        const t = this.event_key.split(">")
        const e = event_key.split(">")

        return (t[0]==e[0] || t[0]=="*") && (t[1]==e[1] || t[1]=="*")
    }
} 
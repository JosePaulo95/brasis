import BoardModel from "../models/BoardModel";
import { InteractionModel } from "../models/InteractionModel";
import { Point } from "../models/Point";
import AudioController from "./AudioController";

export default class BoardController{
    model = {} as BoardModel
    interactions: Array<InteractionModel>;
    interaction_on = true;
    prev_point: Point|undefined;
    audio_controller: AudioController|undefined;
    
    constructor(model: BoardModel, audio_controller?: AudioController){
        this.model = model
        this.audio_controller = audio_controller
        this.interactions = [
            new InteractionModel("actor>bg", this.audioCancel),
            new InteractionModel("*", this.dismissActionSquares),
            new InteractionModel("*>actor", this.selectActor),
            new InteractionModel("actor>action-square", this.moveActor),
        ]
    }
    async select(x: number, y: number): Promise<any> {
        if(this.interaction_on){
            const cur_point = new Point(x,y)
            const previous_actor = this.getTopLayer(this.prev_point)
            const top_current = this.getTopLayer(cur_point)
            const event_key = `${previous_actor}>${top_current}` 

            this.interaction_on = false
            const interactions = this.interactions.filter(i=>i.match(event_key))
            for (let i = 0; i < interactions.length; i++) {
                await interactions[i].method.call(this, cur_point, this.prev_point)
            }
            
            this.interaction_on = true
            this.prev_point = new Point(x,y)
        }
    }
    getSubscribedInteractions(event_key: string) {
        return this.interactions.filter(i => i.event_key == event_key)
    }
    getTopLayer(p?: Point) {
        if(!p){
            return ""
        }
        if(this.model.action_square_board.at(p).value){
            return "action-square"
        }
        if(this.model.actors_board.at(p).value){
            return "actor"
        }
        return "bg"
    }

    async moveActor(cur_point: Point, prev_point?: Point) {
        if(prev_point){
            const actor = this.model.actors_board.at(prev_point)
            const shortest_path = this.calcShortestPath(prev_point, cur_point)

            this.audio_controller?.play("on-square-to-move-selection")

            // AudioManager.plays("moving", shortest_path.length)
            // AnimationManager.plays("moving", actor, shortest_path)
            // ActorsModelManager.update("swap", p1, p2)

            await actor.animMove(shortest_path, this.audio_controller)
            actor.disabled = true;
            this.model.actors_board.swap(prev_point, cur_point)
            actor.animReset(prev_point)
        }
    }
    dismissActionSquares() {
        this.model.action_square_board.clear()
    }
    audioCancel(){
        this.model.action_square_board.hasAny() && this.audio_controller?.play("cancel")
    }
    selectActor(cur_point: Point, prev_point?: Point) {
        const actor = this.model.actors_board.at(cur_point)
        const current_team = this.model.getCurrentTeam()
        
        if(actor && actor.team){
            if (actor.team == current_team && !actor.disabled){
                this.showPossibleMoves(cur_point)
            } else {
                //do nothing
            }
        }
    }
    showPossibleMoves(cur_point: Point) {
        this.audio_controller?.play("select")

        const possible_houses_1 = this.getNeighbors(cur_point,1).concat(this.getNeighbors(cur_point,2))
        
        for (let i = 0; i < possible_houses_1.length; i++) {
            const house = possible_houses_1[i];
            this.model.action_square_board.at(house).value = 1
        }
    }
    getNeighbors(p: Point, d=1, root=true): Array<Point> {
        if(!this.model.bg_board.at(p) || (this.model.actors_board.at(p).value && !root)){
            return []
        }
        
        if(d==0){
            return [p]
        }
        return [
            this.getNeighbors(new Point(p.x,    p.y-1),    d-1, false),
            this.getNeighbors(new Point(p.x,    p.y+1),    d-1, false),
            this.getNeighbors(new Point(p.x-1,  p.y),      d-1, false),
            this.getNeighbors(new Point(p.x+1,  p.y),      d-1, false)
        ].filter(Boolean).flat(10).filter((elm, index, arr) => index == arr.findIndex(i=>i.x==elm.x&&i.y==elm.y))
    }
    calcShortestPath(a: Point, b: Point): Array<Point> {
        const points:Array<Point> = [];
        const d = this.getDistance(a,b)
        if(d!=undefined){
            let cur = a
            points.push(cur)

            for (let i = 0; i < d; i++) {
                let neighbors = this.getNeighbors(cur, 1)
                let neighbors_w_distance = neighbors.map(p => { return {d: this.getDistance(b, p), p}})
                let sorted = neighbors_w_distance.sort((a,b)=>a.d-b.d)
                let next = sorted[0]
                cur = next.p
                points.push(cur)
            }
        }
        return points;
    }
    getDistance(a: Point, b: Point): number {
        let d = 0, neighbors = [], found

        do{
            neighbors = this.getNeighbors(a, d)
            found = neighbors.some(p => p.x==b.x && p.y==b.y)
            d++
        }while(d<10 && !found)


        return found?d-1:Infinity
    }
}



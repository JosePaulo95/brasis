import { Mapper } from "@/agents/Mapper";
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
    mapper: Mapper;
    
    constructor(model: BoardModel, audio_controller?: AudioController){
        this.model = model
        this.mapper = new Mapper(this.model)
        this.audio_controller = audio_controller
        this.interactions = [
            new InteractionModel("actor>bg", this.audioCancel),
            new InteractionModel("actor", this.dismissActionSquares),
            new InteractionModel("bg", this.dismissActionSquares),
            new InteractionModel("*>actor", this.selectActor),
            new InteractionModel("actor>action-square", this.doAction),
            new InteractionModel("actor>action-square", this.checkEndOfTurn),
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

    async doAction(cur_point: Point, prev_point?: Point) {
        const action = this.model.action_square_board.at(cur_point)
        
        switch (action.getType()) {
            case "move":
                await this.moveActor(cur_point, prev_point)
                break;
            case "attack":
                await this.attack(cur_point, prev_point)
                break;
            default:
                break;
        }
        this.dismissActionSquares()
    }

    async attack(cur_point: Point, prev_point?: Point) {
        if(prev_point){
            const attacking_actor = this.model.actors_board.at(prev_point)
            const attacked_actor = this.model.actors_board.at(cur_point)

            const basic_attack_success = attacking_actor.rollDice()

            await attacking_actor.doAttack(prev_point, cur_point)

            if(basic_attack_success){
                await attacked_actor.getsHit();
            }else{
                await attacked_actor.doDodge();
            }
            debugger
            attacking_actor.disabled = true;
        }
    }

    async moveActor(cur_point: Point, prev_point?: Point) {
        if(prev_point){
            const actor = this.model.actors_board.at(prev_point)
            const shortest_path = this.mapper.getPath(prev_point, cur_point)

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
    async checkEndOfTurn(cur_point: Point, prev_point?: Point) {
        const current_team = this.model.getCurrentTeam()
        const has_ally_to_move = this.model.actors_board.hasAny(a => 
            a.team == current_team &&
            !a.disabled &&
            a.value>0
        )
        if(!has_ally_to_move){
            this.passTurn()
        }
    }
    passTurn(){
        this.model.round++;
        //todo: refactor
        for (let i = 0; i < this.model.actors_board.board.length; i++) {
            for (let j = 0; j < this.model.actors_board.board[i].length; j++) {
                this.model.actors_board.board[i][j].disabled = false
            }
        }
        
        //this.model.actors_board.update({disabled: false})
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

        const possible_houses = this.mapper.getPossibleMovesOf(cur_point.x, cur_point.y).filter(p=>!p.match(cur_point))
        const atk_houses = this.mapper.getReachableEnemiesFrom(cur_point.x, cur_point.y)

        for (let i = 0; i < possible_houses.length; i++) {
            const house = possible_houses[i];
            this.model.action_square_board.at(house).value = 1
        }

        for (let i = 0; i < atk_houses.length; i++) {
            this.model.action_square_board.at(atk_houses[i]).value = 4
        }
    }
}



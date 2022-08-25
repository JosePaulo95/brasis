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
            new InteractionModel("*>bg", this.dismissActionSquares),
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

    async doAction(cur_point: Point, prev_point: Point) {
        const action = this.model.action_square_board.at(cur_point)
        const actor = this.model.actors_board.at(prev_point)

        switch (action.getType()) {
            case "move":
                await this.moveActor(cur_point, prev_point)
                this.dismissActionSquares()
                const enemies_close = this.mapper.getReachableEnemiesFrom(cur_point.x, cur_point.y, 2)
                if(enemies_close.length > 0){
                    //actor.disabled = false
                    for (let i = 0; i < enemies_close.length; i++) {
                        this.model.action_square_board.at(enemies_close[i]).value = 4
                    }
                }
                break;
            case "attack":
                await this.attack(cur_point, prev_point)
                this.dismissActionSquares()
                break;
            default:
                break;
        }
        
    }

    async attack(cur_point: Point, prev_point?: Point) {
        if(prev_point){
            const attacking_actor = this.model.actors_board.at(prev_point)
            const attacked_actor = this.model.actors_board.at(cur_point)

            const discount = this.getsDiscountByPos(prev_point, cur_point)

            const basic_attack_success = attacking_actor.rollDice(discount)

            if(basic_attack_success){
                await attacking_actor.doAttack(prev_point, cur_point, discount),
                await attacked_actor.getsHit(discount)
            }else{
                await attacking_actor.doAttack(prev_point, cur_point, discount)
                await attacked_actor.doDodge(discount);
            }
            debugger
            attacking_actor.disabled = true;
        }
    }
    getsDiscountByPos(attacker_pos: Point, attacked_pos: Point) {
        const attacked_actor = this.model.actors_board.at(attacked_pos)
        let back, left_side, right_side
        switch (attacked_actor.direction) {
            case "left":
                right_side = new Point(-1, 0)
                left_side = new Point(1, 0)
                back = new Point(0, 1)
                break;
            case "right":
                right_side = new Point(1, 0)
                left_side = new Point(-1, 0)
                back = new Point(0, -1)
                break;
            case "top":
                right_side = new Point(-1, 0)
                left_side = new Point(1, 0)
                back = new Point(1, 0)
                break;
            case "bottom":
                right_side = new Point(0, 1)
                left_side = new Point(0, -1)
                back = new Point(-1, 0)
                break;
            default:
                right_side = new Point(0, 0)
                left_side = new Point(0, 0)
                back = new Point(0, 0)
        }

        const back_pos = new Point(attacked_pos.x+back.x, attacked_pos.y+back.y)
        const left_pos = new Point(attacked_pos.x+left_side.x, attacked_pos.y+left_side.y)
        const right_pos = new Point(attacked_pos.x+right_side.x, attacked_pos.y+right_side.y)

        if(back_pos.match(attacker_pos)){
            return 2
        }
        if(left_pos.match(attacker_pos) || right_pos.match(attacker_pos)){
            return 1
        }
        return 0
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
        this.dismissActionSquares()
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



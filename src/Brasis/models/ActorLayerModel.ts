import AudioController from "../controllers/AudioController";
import BaseLayerModel from "./BaseLayerModel";
import { Point } from "./Point";
const anime = require ('animejs/lib/anime.min.js');

export default class ActorLayerModel extends BaseLayerModel{
    direction = "";
    animation = "";
    character: string;
    team: string;
    disabled = false;
    life: number;

    constructor(value=0){
        super(value);
        switch (value) {
            case 1:
                this.character = "knight"
                this.team = "teamA"
                this.life = 8
                break;
            case 2:
                this.character = "knight"
                this.team = "teamB"
                this.life = 8
                break;
                default:
                    this.character = "knight"
                    this.team = "teamA"
                    this.life = 0
                    break;
                }
            }    
            
            async animMove(path: Array<Point>, audio_controller: AudioController|undefined) {
                const x = path[0].x
                const y = path[0].y
                
                const translations = this.pathToTranslations(path)
                for (let i = 0; i < translations.length; i++) {
                    this.direction = translations[i].direction;
                    this.animation = "walking"
                    audio_controller?.startsPlaying("on-moving", 2)
            await anime ({
                targets: `#cell-${x}-${y} .actor`,
                keyframes: [translations[i]],
                easing: 'linear',
                duration: 500
            }).finished;
        }
        this.animation = "";
        audio_controller?.stopsPlaying("on-moving")
        audio_controller?.play("on-move-end")
    }
    
    async doAttack(attacker_pos: Point, attacked_pos: Point) {        
        this.direction = this.getsDirection(attacker_pos, attacked_pos);
        this.animation = "attacking"
        
        await new Promise(resolve => setTimeout(resolve, 500));    
        this.animation = "";
    }
    
    async doDodge() {
        const backup_direction = this.direction+""
        this.direction = ""
        this.animation = "dodging"
        
        await new Promise(resolve => setTimeout(resolve, 500));    
        this.direction = backup_direction
        this.animation = "";
    }

    animReset(origin: Point) {
        const x = origin.x
        const y = origin.y
        anime ({
            targets: `#cell-${x}-${y} .actor`,
            keyframes:[{
                translateX: "0%",
                translateY: "0%",
            }],
            easing: 'steps(1)',
            "animation-name": "example"
        });
    }
        
    getsDirection(a: Point, b: Point): string {
        const difx = a.y-b.y
        const dify = a.x-b.x
        
        return difx>0?"left":difx<0?"right":dify>0?"top":"bottom"
    }
    
    async getsHit() {
        this.animation = "getting-hitted"
        await new Promise(resolve => setTimeout(resolve, 500));
        this.animation = "";

        this.life--
        if(this.life <= 0){
            this.value = 0
        }
    }

    rollDice() {
        return this.life >= this.getRandomInt(10);
    }
    getRandomInt(max: number) {
        return Math.floor(Math.random() * max+1);
    }
    pathToTranslations(path: Array<Point>) {
        const translations = []
        const origin = path[0]
        let difx, dify
        let prev = origin

        for (let i = 1; i < path.length; i++) {
            let next = path[i]
            difx = next.y-prev.y
            dify = next.x-prev.x

            let direction = difx>0?"right":difx<0?"left":dify>0?"bottom":"top"

            difx = next.y-origin.y
            dify = next.x-origin.x

            translations.push({translateX: difx+"00%", translateY: dify+"00%", direction: direction})
            prev = next
        }
        return translations
    }
}
import AudioController from "../controllers/AudioController";
import BaseLayerModel from "./BaseLayerModel";
import { Point } from "./Point";
const anime = require ('animejs/lib/anime.min.js');

export default class ActorLayerModel extends BaseLayerModel{
    direction = "";
    animation = "";

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
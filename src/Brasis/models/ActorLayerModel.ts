import BaseLayerModel from "./BaseLayerModel";
import { Point } from "./Point";
const anime = require ('animejs/lib/anime.min.js');

export default class ActorLayerModel extends BaseLayerModel{
    direction = "";

    async animMove(path: Array<Point>) {
        const x = path[0].x
        const y = path[0].y

        const translations = this.pathToTranslations(path)
        debugger
        for (let i = 0; i < translations.length; i++) {
            this.direction = translations[i].direction;
            await anime ({
                targets: `#cell-${x}-${y} .actor`,
                keyframes: [translations[i]],
                easing: 'linear',
                duration: 500
            }).finished;
            this.direction = "";
        }
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
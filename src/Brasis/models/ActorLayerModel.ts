import BaseLayerModel from "./BaseLayerModel";
import { Point } from "./Point";
const anime = require ('animejs/lib/anime.min.js');

export default class ActorLayerModel extends BaseLayerModel{
    animReset() {
        anime ({
            targets: '.actor',
            keyframes:[{
                translateX: "0%",
                translateY: "0%",
            }],
            easing: 'steps(1)',
        });
    }
    async animMove(path: Array<Point>) {
        await anime ({
            targets: '.actor',
            keyframes:this.pathToTranslations(path),
            easing: 'linear',
        }).finished;
    }
    pathToTranslations(path: Array<Point>) {
        const translations = []
        const origin = path[0]
        for (let i = 1; i < path.length; i++) {
            let destiny = path[i]

            let difx = destiny.x-origin.x
            let dify = destiny.y-origin.y

            translations.push({translateY: difx+"00%", translateX: dify+"00%"})
        }
        return translations
    }
}
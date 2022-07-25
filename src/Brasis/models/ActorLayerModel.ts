import BaseLayerModel from "./BaseLayerModel";
import { Point } from "./Point";
const anime = require ('animejs/lib/anime.min.js');

export default class ActorLayerModel extends BaseLayerModel{
    direction = "bottom";

    async animMove(path: Array<Point>) {
        const x = path[0].x
        const y = path[0].y
        this.direction = "right"
        
        //await move(step)

        // await anime ({
        //     targets: `#cell-${x}-${y} .actor`,
        //     keyframes:this.pathToTranslations(path),
        //     easing: 'linear',
        //     update: function anim(anim: any){
        //         debugger
        //         console.log(anim.remaining)
        //     } 
        // }).finished;
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
        for (let i = 1; i < path.length; i++) {
            let destiny = path[i]

            let difx = destiny.x-origin.x
            let dify = destiny.y-origin.y

            translations.push({translateY: difx+"00%", translateX: dify+"00%"})
        }
        return translations
    }
}
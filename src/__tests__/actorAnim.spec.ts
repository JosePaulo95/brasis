import ActorLayerModel from "@/Brasis/models/ActorLayerModel"
import { Point } from "@/Brasis/models/Point"

describe('actor animation', () => {
    it('steps conversion', async () => {
        const model = new ActorLayerModel()
        const a = new Point(2,2)
        const b = new Point(2,3)
        const c = new Point(2,4)
        
        const path = [a,b,c]
        const translations = model.pathToTranslations(path)
        expect(translations.length).toEqual(2)

        expect(translations[0].translateX).toEqual("100%")
        expect(translations[1].translateX).toEqual("200%")

        // expect(model.convertToSteps(2,0)).toEqual(["right", "right"])
        // expect(model.convertToSteps(-1,2)).toEqual(["down", "down", "left"])
        // expect(model.convertToSteps(0,0)).toEqual([])
    })
})
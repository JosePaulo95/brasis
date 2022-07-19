import ActorLayerModel from "@/Brasis/models/ActorLayerModel"

describe('actor animation', () => {
    it('steps conversion', async () => {
        const model = new ActorLayerModel()
        expect(model.convertToSteps(-1,-1)).toEqual(["up", "left"])
        expect(model.convertToSteps(2,0)).toEqual(["right", "right"])
        expect(model.convertToSteps(-1,2)).toEqual(["down", "down", "left"])
        expect(model.convertToSteps(0,0)).toEqual([])
    })
})
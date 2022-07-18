import { InteractionModel } from "@/Brasis/models/InteractionModel";

describe('board component', () => {
    it('eventMethod maps correctly', async () => {
        const trigger_all = new InteractionModel("*", ()=>{})
        const trigger_possible_moves = new InteractionModel("*>actor", ()=>{})
        const trigger_dismiss = new InteractionModel("actor>*", ()=>{})

        expect(trigger_all.match("actor>actor")).toBe(true)
        expect(trigger_all.match("hud")).toBe(true)

        expect(trigger_possible_moves.match("actor>actor")).toBe(true)
        expect(trigger_possible_moves.match(">actor")).toBe(true)
        expect(trigger_possible_moves.match("actor>bg")).toBe(false)

        expect(trigger_dismiss.match(">actor")).toBe(false)
        expect(trigger_dismiss.match("hud>actor")).toBe(false)
        expect(trigger_dismiss.match("actor>bg")).toBe(true)
    })
})
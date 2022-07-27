

export default class AudioModel {
    files:any = {}

    constructor () {
        this.files["select"] = new Audio(require('@/assets/audio/Sounds/Menu2/click4.ogg'))
        this.files["on-square-to-move-selection"] = new Audio(require('@/assets/audio/Sounds/Menu2/click5.ogg'))
        this.files["on-moving"] = new Audio(require('@/assets/audio/Sounds/Menu2/rollover2.ogg'))
        this.files["on-move-end"] = new Audio(require('@/assets/audio/Sounds/Menu2/rollover2.ogg'))
        this.files["cancel"] = new Audio(require('@/assets/audio/Sounds/Menu/Menu4.wav'))
    }
    find(index: string) {
        return this.files[index]
    }
}
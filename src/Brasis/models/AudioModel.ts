

export default class AudioModel {
    files:any = {}

    constructor () {
        this.files["select"] = new Audio(require('@/assets/audio/Sounds/Menu2/click1.ogg'))
        this.files["on-move-end"] = new Audio(require('@/assets/audio/Sounds/Menu2/rollover2.ogg'))
        this.files["on-square-to-move-selection"] = new Audio(require('@/assets/audio/Sounds/Menu2/click3.ogg'))
    }
    find(index: string) {
        return this.files[index]
    }
}
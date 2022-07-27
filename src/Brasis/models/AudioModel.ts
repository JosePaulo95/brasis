

export default class AudioModel {
    files:any = {}

    constructor () {
        this.files["select"] = new Audio(require('@/assets/audio/Sounds/Menu2/click1.ogg'))
    }
    find(index: string) {
        return this.files[index]
    }
}
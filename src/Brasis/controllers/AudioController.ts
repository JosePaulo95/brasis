import AudioModel from "../models/AudioModel";

export default class AudioController {
    audio_model: AudioModel;

    constructor (audio_model: AudioModel) {
        this.audio_model = audio_model
    }

    play (index: string) {
        const audio_file = this.audio_model.find(index)
        if(audio_file){
            audio_file.play()
        }
        debugger
    }
}
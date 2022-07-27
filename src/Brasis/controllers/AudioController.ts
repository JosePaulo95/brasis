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
    }
    startsPlaying (index: string, speed=1) {
        const audio_file = this.audio_model.find(index)
        if(audio_file){
            audio_file.playbackRate = speed
            audio_file.addEventListener('ended', function() {
                audio_file.play()
            }, false);
            audio_file.play()
        }
    }
    stopsPlaying (index: string) {
        const audio_file = this.audio_model.find(index)
        if(audio_file){
            audio_file.pause()
        }
    }
}
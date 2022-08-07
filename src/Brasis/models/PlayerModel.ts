

export class PlayerModel {
    playable: boolean;
    team: string;

    constructor (team: string, playable = false) {
        this.team = team;
        this.playable = playable;
    }

}
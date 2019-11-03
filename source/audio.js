import { CONSTANTS } from "./constants.js";

export class Audio extends Phaser.Scene{
    currentSong = {}
    audioLoaded = false;
    currentVolume = 0;
    currentSongName = 'scapeMain';
    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO
        });
    }

    async preload(){
        // Audio
        this.load.audio('scapeMain', 'source/assets/audio/bgm/ScapeMain.ogg');
        this.load.audio('newbieMelody', 'source/assets/audio/bgm/NewbieMelody.ogg');
        this.load.audio('harmony', 'source/assets/audio/bgm/Harmony.ogg');

        this.load.on('complete', () => {
            this.currentSong = this.sound.add(this.currentSongName);
            this.currentSong.play();
            this.audioLoaded = true;
            this.changeVolume(0, this.currentVolume);
        });
    }

    create(){
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false; 
    }

    async playAudio(audioName){
        if (this.audioLoaded) {
            this.currentSong.stop();
            this.currentSong = this.sound.add(audioName)
            this.currentSong.play();  
        }
        else {
            this.currentSongName = audioName;
        }
    }

    changeVolume(volumeType, value) {
        switch(volumeType) {
            case 0: // BGM
                // Set volume and show button
                if (this.audioLoaded) {
                    this.currentSong.setVolume(value/4); // 0-4 = 0-100
                }
                else {  // Save volume to be set after loading
                    this.currentVolume = value;
                }
                break;
            case 1: // SFX
                break;
            case 2: // Environment
                break;
            default:
                console.log('Error: incorrect volume knob type');
                break;
        }
    }
}
import { CONSTANTS } from "../constants.js";

export class MenuScene extends Phaser.Scene{
    characterData = {};
    settingsWindow;
    settingsOpen = false;
    settingsTitle;
    settingsYesText;
    settingsNoText;

    constructor() {
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }

    init() {}

    preload(){
        this.load.image('settings', 'source/assets/SettingsPanel.png');
    }

    create(){
        // Create the menu screen
        let bg = this.add.image(0, 0, 'menu-bg').setOrigin(0,0).setDepth(0).setInteractive();
        this.add.image(400, 300, 'menu').setDepth(1);
        this.add.image(400, 125, 'rsc-logo').setDepth(1);

        // Settings window
        this.settingsWindow = this.add.image(400, 300, 'settings').setDepth(2).setInteractive();
        this.settingsWindow.visible = false;
        this.settingsTitle = this.add.text(330, 190, 'Delete cookies?', {color: 'yellow'}).setDepth(3);
        this.settingsTitle.visible = false;
        this.settingsYesText = this.add.text(348, 242, 'Yes', {
            color: 'red',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: 'black',
                fill: true
            }
        }).setDepth(3).setInteractive();
        this.settingsYesText.visible = false;
        this.settingsNoText = this.add.text(428, 242, 'No').setDepth(3).setInteractive();
        this.settingsNoText.visible = false;

        // Close settings window if clicked outside of it
        bg.on("pointerup", ()=>{
            this.toggleSettings(false);
        })

        // Play
        let playButton = this.add.image(485, 321, "play-button").setDepth(1);
        playButton.setInteractive();
        playButton.on("pointerup", ()=>{
            // Prevent play while settings are open
            if (this.settingsOpen) {
                this.toggleSettings(false);
            }
            else {
                if (!this.characterData.characterClass) {
                    this.scene.start(CONSTANTS.SCENES.CC); 
                    console.log("Going to Character Creation");
                }
                else {
                    this.scene.start(CONSTANTS.SCENES.TUTORIAL_ISLAND, this.characterData); 
                    console.log("Going to Tutorial Island");
                }
            }
        })

        // Settings button
        let settingsButton = this.add.image(319, 321, "settings-button").setDepth(1);
        settingsButton.setInteractive();
        settingsButton.on("pointerup", ()=>{
            if (this.settingsOpen) {
                this.toggleSettings(false);
            }
            else {
                this.toggleSettings(true);
            }
        })

        // Delete cookies (Yes)
        this.settingsYesText.on("pointerup", ()=>{
            this.characterData = {};
            this.toggleSettings(false);
        })

        // Close Settings (No)
        this.settingsNoText.on("pointerup", ()=>{
            this.toggleSettings(false);
        })

        // Pull in previous data
        this.getCookies();
    }

    getCookies(){
        // Pull out first cookie
        let decodedCookies = decodeURIComponent(document.cookie).split(';');
        if (decodedCookies[0] != "") {
            for (let i = 0; i < decodedCookies.length; i++) {
                // Split into (0)name|(1)value
                let cookieCrumbs = decodedCookies[i].split('=');   
                if (cookieCrumbs[i] == "characterData" || cookieCrumbs[i] == " characterData") {
                    this.characterData = JSON.parse(cookieCrumbs[1]);
                }
            }
        }
    }

    toggleSettings(toggle){
        this.settingsOpen = toggle;
        this.settingsWindow.visible = toggle;
        this.settingsTitle.visible = toggle;
        this.settingsYesText.visible = toggle;
        this.settingsNoText.visible = toggle;
    }

}


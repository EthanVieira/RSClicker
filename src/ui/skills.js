import { CONSTANTS, FONTS } from "../constants/constants.js";
import { calcLevel } from "../utilities.js";

export class Skills {
    scene;
    statsScene;
    saveData = {};
    skillText = {};

    hoverGraphics;
    hoverWindow;
    hoverNameText;
    hoverLevelText;
    hoverXpText;

    skillInfo = {
        bg: {},
        header: {},
        closeButton: {},
    };

    skillWidth = 64;
    skillHeight = 31;

    constructor(scene, skillData) {
        this.scene = scene;
        this.saveData = skillData;

        let startX = 585,
            startY = 220,
            index = 0;

        // Add level text for skills
        for (let skill in this.saveData) {
            let row = index % 3;
            let column = Math.floor(index / 3);
            let x = startX + row * this.skillWidth;
            let y = startY + column * this.skillHeight;

            this.skillText[skill] = scene.add
                .text(x, y, "1", FONTS.SKILLS)
                .setOrigin(0.5)
                .setDepth(2);
            this.skillText[skill + "Bottom"] = scene.add
                .text(x + 12, y + 10, "1", FONTS.SKILLS)
                .setOrigin(0.5)
                .setDepth(2);

            index++;
        }

        // Add hover menu for skills
        this.hoverNameText = this.scene.add.text(0, 0, "", FONTS.SKILL_HOVER).setDepth(3);
        this.hoverLevelText = this.scene.add
            .text(0, 0, "", FONTS.SKILL_HOVER)
            .setDepth(3);
        this.hoverXpText = this.scene.add.text(0, 0, "", FONTS.SKILL_HOVER).setDepth(3);
        this.hoverWindow = new Phaser.Geom.Rectangle(0, 0, 78, 38);
        this.hoverGraphics = this.scene.add.graphics({
            lineStyle: { width: 1, color: 0x000000 },
            fillStyle: { color: 0xffffa0 },
        });

        // Hover on skill
        this.scene.input.on("pointermove", (pointer) => {
            if (this.scene.currentPanel == CONSTANTS.PANEL.SKILLS) {
                this.createHoverWindow(pointer.x, pointer.y);
            }
        });

        // Click on skill
        this.scene.input.on("pointerdown", (pointer) => {
            if (this.scene.currentPanel == CONSTANTS.PANEL.SKILLS) {
                this.createSkillInfo(pointer.x, pointer.y, true);
            }
        });

        this.totalLevelText = scene.add
            .text(705, 450, "1", { fontSize: "12px", fill: "yellow" })
            .setOrigin(0.5)
            .setDepth(2);

        // Hotbar skills text (the top part)
        this.prayerHotbarText = scene.add
            .text(532, 97, "1", FONTS.HOTBAR)
            .setOrigin(0.5)
            .setDepth(3);

        // Skill description
        this.skillInfo.bg = this.scene.add
            .image(250, 250, "skills-info")
            .setDepth(2)
            .setVisible(false);
        this.skillInfo.header = this.scene.add
            .text(220, 100, "Fletching", { font: "24px runescape", fill: "black" })
            .setOrigin(0)
            .setDepth(3)
            .setVisible(false);
        this.skillInfo.closeButton = this.scene.add
            .image(405, 75, "exit-button")
            .setDepth(2)
            .setInteractive()
            .setVisible(false)
            .on("pointerup", () => {
                this.showSkillInfo(false);
            });
    }

    showSkills(isVisible) {
        if (isVisible) {
            this.scene.hideAllMenus();
            this.scene.skills.button.setAlpha(1);
            this.scene.currentPanel = CONSTANTS.PANEL.SKILLS;
        } else {
            this.scene.skills.button.setAlpha(0.1);
        }

        // Show panel and all skill text
        for (let skill in this.skillText) {
            this.skillText[skill].visible = isVisible;
        }
        this.scene.skills.panel.visible = isVisible;
        this.totalLevelText.visible = isVisible;
        this.hoverGraphics.visible = false;
        this.hoverXpText.visible = false;
        this.hoverLevelText.visible = false;
    }

    updateSkillsText() {
        if (this.scene.scene.isActive()) {
            let totalLevel = 0;

            for (let skill in this.saveData) {
                let level = calcLevel(this.saveData[skill]);
                this.skillText[skill].text = level;
                this.skillText[skill + "Bottom"].text = level;

                if (skill == "prayer") {
                    this.prayerHotbarText.text = level;
                    this.scene.prayer.curPrayerText.text = level;
                    this.scene.prayer.maxPrayerText.text = level;
                }

                totalLevel += level;
            }

            this.totalLevelText.text = totalLevel;
        } else {
            // If called before load, update once loaded
            this.scene.events.once("create", () => {
                this.updateSkillsText();
            });
        }
    }

    // Find which skill is being clicked/hovered
    findSkill(x, y) {
        let column = 0;
        let row = 0;
        let index = 0;
        let skill = 0;

        if (x > 550 && x < 730 && y > 205 && y < 450) {
            column = Math.floor((x - 550) / this.skillWidth);
            row = Math.floor((y - 205) / this.skillHeight);
            index = column + row * 3;
            skill = Object.keys(this.saveData)[index];

            return { skill, index, row, column };
        }
        return { skill, index, row, column };
    }

    createHoverWindow(x, y) {
        let { skill, index, row, column } = this.findSkill(x, y);

        if (skill != 0) {
            x = Math.floor(490 + column * this.skillWidth);
            y = Math.floor(205 + row * this.skillHeight + this.skillHeight / 1.5);

            if (index < 23) {
                this.hoverNameText.text = skill[0].toUpperCase() + skill.substring(1);
                this.hoverXpText.text =
                    "Total XP: " + this.saveData[skill].toLocaleString();
            } else {
                this.hoverNameText.text = "Total Level";
                this.hoverXpText.text = "";
            }

            // Set window
            this.hoverGraphics.clear();
            this.hoverGraphics.fillRectShape(this.hoverWindow);
            this.hoverGraphics.strokeRectShape(this.hoverWindow);
            this.hoverGraphics.setDepth(3);
            this.hoverWindow.x = x;
            this.hoverWindow.y = y;
            this.hoverGraphics.visible = true;

            // Set text
            this.hoverNameText.x = x + 5;
            this.hoverNameText.y = y + 5;
            this.hoverNameText.visible = true;

            this.hoverXpText.x = x + 5;
            this.hoverXpText.y = y + 20;
            this.hoverXpText.visible = true;
        } else {
            this.hoverGraphics.visible = false;
            this.hoverNameText.visible = false;
            this.hoverXpText.visible = false;
        }
    }

    createSkillInfo(x, y, isVisible) {
        if (isVisible) {
            const { skill, index, row, column } = this.findSkill(x, y);

            if (skill != 0 && skill != undefined) {
                this.skillInfo.header.text = skill[0].toUpperCase() + skill.substring(1);
                this.showSkillInfo(true);
            }
        } else {
            this.showSkillInfo(false);
        }
    }

    showSkillInfo(isVisible) {
        if (this.statsScene == undefined) {
            this.statsScene = this.scene.scene.get(CONSTANTS.SCENES.STATS);
        }
        this.statsScene.show(!isVisible);
        for (let obj in this.skillInfo) {
            this.skillInfo[obj].visible = isVisible;
        }
    }
}

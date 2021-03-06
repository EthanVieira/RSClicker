import Tool from "./tool.js";

export default class Knife extends Tool {
    // Item data
    name = "Knife";
    item = "Knife";
    examineText = "A dangerous looking knife.";
    cost = 6;

    // Scenes
    scene;

    constructor(scene) {
        super();
        this.scene = scene;
    }

    getRecipe(itemName) {
        let output = {
            className: "",
            numRequiredItems: 0,
            xpGiven: 0,
        };

        switch (itemName) {
            case "Logs":
                output.className = "NormalShortbow";
                output.numRequiredItems = 50;
                output.xpGiven = 250;
                break;
            case "Oak Logs":
                output.className = "OakShortbow";
                output.numRequiredItems = 50;
                output.xpGiven = 500;
                break;
        }

        return output;
    }
}

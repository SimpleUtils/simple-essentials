import commandManager from "../api/commands/commandManager";
import uiManager from "../uiManager";

commandManager.addCommand("uis", { description: "View UIs in Simple Essentials", author: "FruitKitty", category: "Setup" }, ({ msg }) => {
    let text = [];
    text.push(`§8----------- §aList §r§8-----------`)
    for(const ui of uiManager.uis) {
        text.push(`§e${ui.id} §r§7${ui.description ? ui.description : "No Description"}`);
    }
    text.push(``);
    text.push(`§2You can open a UI by doing §f/scriptevent simple:open_ui §eui_id`);
    text.push(`§2Example: the ui §eadmin.codes.redeem §r§2would be §a/scriptevent §bsimple:open_ui §eadmin.codes.redeem`)
    msg.sender.sendMessage(text.join('\n§r'))
})
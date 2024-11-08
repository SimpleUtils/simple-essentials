import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("admin.ranks | admin.rank", "Admin UI", (player) => {
    let form = new ActionForm();
    form.title("§bAdmin UI")
    form.button(`§bRemove Ranks\n§7Remove ranks from players`, "textures/azalea_icons/Delete.png", (player) => {
        uiManager.open(player, "admin.ranks.remove")
    })
    form.button(`§bAdd Rank\n§r§7Add ranks to players`, "textures/azalea_icons/1.png", (player) => {
        uiManager.open(player, "admin.ranks.add")
    })
    form.show(player)
})
import homeAPI from "../../api/homeAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager.js";
import './list.js'
import './create.js'
import './delete.js'

uiManager.addUI("players.homes | players.homes.root", "Homes UI", (player) => {
    let form = new ActionForm();
    form.title("§bHomes UI")
    form.button(`§bCreate Home\n§7[ Create Home ]`, null, (player) => {
        uiManager.open(player, "players.homes.create")
    })
    form.button(`§bList Homes\n§r§7[ List All Homes ]`, null, (player) => {
        uiManager.open(player, "players.homes.list")
    })
    form.button(`§bDelete Home\n§r§7[ Delete a home ]`, null, (player) => {
        uiManager.open(player, "players.homes.delete")
    })
    form.show(player)
})
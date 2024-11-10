import homeAPI from "../../api/homeAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("players.homes.delete | players.deletehomes", "Homes UI", (player)=>{
    let allHomes = homeAPI.getHomes(player);
    let form = new ActionForm();
    form.title("§bHomes UI")
    form.button(`§cBack\n§7[ Go Back ]`, null, (player)=>{
        uiManager.open(player, "players.homes.root")
    })
    for (const home of allHomes) {
        form.button(`§b${home.data.name}\n§7[ Delete ]`, null, (player)=>{
            homeAPI.delete(player, home.data.name)
        })
    }
    form.show(player)
})
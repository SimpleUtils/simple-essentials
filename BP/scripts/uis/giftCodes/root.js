import giftCodes from "../../api/giftCodes";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";

uiManager.addUI("admin.codes.root | admin.codes.root", "Gifts Root", (player)=>{
    let form = new ActionForm();
    form.button(`§aAdd Gift Code\n§7Adds a code`, null, (player)=>{
        uiManager.open(player, "admin.codes.add");
    })
    for(const giftCode of giftCodes.db.data) {
        form.button(`§c${giftCode.data.code}\n§7${giftCode.data.action}`, null, (player)=>{
            uiManager.open(player, "admin.codes.edit", giftCode.id)
        })
    }
    form.show(player, false, (player, response)=>{})
})
import giftCodes from "../../api/giftCodes";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI("admin.codes.edit | admin.codes.edit", "Edit Gift Code", (player, id)=>{
    if(!giftCodes.db.getByID(id)) return;
    let form = new ActionForm();
    form.button("§eEdit Code\n§7Edit the gift code", `icons/server.png`, (player)=>{
        uiManager.open(player, "admin.codes.add", id);
    })
    form.button("§cDelete\n§7Delete this gift code", `icons/slash.png`, (player)=>{
        uiManager.open(player, "basic.confirm", `Are you sure you want to delete this?`, ()=>{
            giftCodes.db.deleteDocumentByID(id);
            uiManager.open(player, "admin.codes.root")
        }, ()=>{
            uiManager.open(player, "admin.codes.edit", id);
        })
    })
    form.show(player, false, ()=>{})
})
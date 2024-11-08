import { system } from "@minecraft/server";
import uiBuilder from "../../api/uiBuilder";
import { ActionForm, ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI("admin.uibuilder.edit | admin.uibuilder.edit", "UI Builder Edit", (player, id)=>{
    let doc = uiBuilder.db.getByID(id);
    if(!doc) return;
    let actionForm = new ActionForm();
    actionForm.title(`§f§u§l§l§s§c§r§e§e§n§rEditing "§b${doc.data.name.replace('§g§r§i§d§u§i','').replace('§c§h§e§s§t','')}§r"`);
    actionForm.button(`§6Back\n§7Go back`, null, (player)=>{
        uiManager.open(player, "admin.uibuilder.root");
    })
    actionForm.button(`§eEdit Buttons\n§7Move, edit, and remove buttons`, `textures/azalea_icons/ClickyClick`, (player)=>{
        uiManager.open(player, "admin.uibuilder.editbuttons", id);
    });
    actionForm.button(`§eEdit Form\n§7Edit form name, and more`, `textures/azalea_icons/GUIMaker/FormsV2`, (player)=>{
        uiManager.open(player, "admin.uibuilder.add", doc.data.name, doc.data.body, doc.data.scriptevent, undefined, doc.id);
    });
    actionForm.button(``, null, (player)=>{
        let modal = new ModalForm();
        modal.title("Code Editor");
        modal.textField("Code", "Code", JSON.stringify(doc.data, null, 2));
        modal.show(player, false, ()=>{})
    })
    actionForm.button(`§cDelete\n§7Delete this UI`, null, player=>{
        uiManager.open(player, "basic.confirm", "Are you sure you want to delete this Chest GUI?", ()=>{
            uiBuilder.db.deleteDocumentByID(id);
            return uiManager.open(player, "admin.uibuilder.root")    
        }, ()=>{
            return uiManager.open(player, "admin.uibuilder.edit", id);
        });
    })
    actionForm.show(player, false, (player, response)=>{

    })
});
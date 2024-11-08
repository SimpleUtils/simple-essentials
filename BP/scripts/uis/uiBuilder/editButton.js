import uiBuilder from "../../api/uiBuilder";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI("admin.uibuilder.editbutton | admin.uibuilder.editbutton", "Edit Button", (player, id, index)=>{
    let actionForm = new ActionForm();
    actionForm.button(`§eEdit`, null, (player)=>{
        let doc = uiBuilder.db.getByID(id);
        if(!doc) return;
        let button = doc.data.buttons[index];
        uiManager.open(player, "admin.uibuilder.addbutton", id, index);
    })
    actionForm.button("§cBack\n§7Go back", null, (player)=>{
        uiManager.open(player, "admin.uibuilder.editbuttons", id);
    })

//player, id, defaultText=undefined, defaultSubtext=undefined, defaultAction=undefined, defaultIcon=undefined, error=null
    actionForm.button(`§cDelete`, `textures/azalea_icons/Delete`, (player)=>{
        let doc = uiBuilder.db.getByID(id);
        if(!doc) return;
        doc.data.buttons.splice(index, 1);
        uiBuilder.db.overwriteDataByID(doc.id, doc.data);
        uiManager.open(player, "admin.uibuilder.editbuttons", id);
    })
    actionForm.button(`§aMove Up`, `textures/azalea_icons/Up`, (player)=>{
        uiBuilder.moveButtonInUI(id, "up", index);
        uiManager.open(player, "admin.uibuilder.editbuttons", id);
    })
    actionForm.button(`§cMove Down`, `textures/azalea_icons/Down`, (player)=>{
        uiBuilder.moveButtonInUI(id, "down", index);
        uiManager.open(player, "admin.uibuilder.editbuttons", id);
    })
    actionForm.show(player, false, ()=>{})
})
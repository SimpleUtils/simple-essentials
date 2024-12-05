import { system, world } from "@minecraft/server";
import blockDb from "../blockDb";
import { ModalForm } from "../lib/form_func";
import uiManager from "../uiManager";
import actionParser from "../api/actionParser";

let inUI = new Map();
uiManager.addUI("blockeditor | admin.blockeditor", "Block editor", (player, vec3)=>{
    let modalForm = new ModalForm();
    let blockData = blockDb.getBlockData(vec3);
    let defaultVal = undefined;
    if(blockData && blockData.action) {
        defaultVal = blockData.action;
    }
    modalForm.textField("On Interaction Action", "Example: /say hi", defaultVal);
    modalForm.submitButton("Edit");
    modalForm.show(player, false, (player, response)=>{
        blockDb.setBlockData(vec3, {action:response.formValues[0]});
    }).then(res=>{
        inUI.delete(player.id);

    })
})

let interactionCooldown = new Set();
world.beforeEvents.playerInteractWithBlock.subscribe(e=>{
    if(e.itemStack && e.itemStack.typeId == 'simple:block_property_editor' && !inUI.has(e.player.id) && (e.player.hasTag("admin"))) {
        inUI.set(e.player.id, true);
        system.run(()=>{
            uiManager.open(e.player, "blockeditor", e.block.location);
        })
        return;
    }
    if(e.itemStack && e.itemStack.typeId == 'simple:block_property_editor') return;
    let blockData = blockDb.getBlockData(e.block.location);
    let defaultVal = undefined;
    if(blockData && blockData.action) {
        defaultVal = blockData.action;
    }
    if (interactionCooldown.has(e.player.id)) return;

    interactionCooldown.add(e.player.id);
    if(defaultVal) {
        e.cancel = true;
        system.run(()=>{
            actionParser.runAction(e.player, defaultVal)
            interactionCooldown.delete(e.player.id);
        })
        
    }
})
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { openMain } from "./uiManager";
import { error, success } from '../functions'
import { changeCommandPrefix, commandPrefix } from '../main';
import uiManager from '../uiManager';
import { ModalForm } from '../lib/form_func';

uiManager.addUI("admin.config.prefix | admin.config.prefix", "prefix", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Broadcast")
    modalForm.textField("New Prefix", "Example: !");
    modalForm.submitButton("Submit");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.tools")
        if (!textField) return error("You must enter a prefix", player)
            changeCommandPrefix(`${textField}`)
            mc.world.setDynamicProperty("prefix", `${textField}`) 
            if (commandPrefix === `${textField}`) return success(`Changed prefix to ${textField}`, player)
            error("Error while changing prefix, please report this to the bugs forum on the Discord!", player)   
    })
}) 

function openPrefix(player) {
    if (!player.hasTag('admin')) return error("You can not use the Admin UI", player);

    const prefixForm = new ui.ModalFormData()
        .title("Prefix Form")
        .textField("", "Type anything here!")
        .submitButton("Submit");

    prefixForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.main")

        const [textField] = res.formValues;

        if (!textField) return error("Enter a prefix!", player)
        changeCommandPrefix(`${textField}`)
        mc.world.setDynamicProperty("prefix", `${textField}`)
        success(`Successfully set command prefix to ${commandPrefix}`, player)
    });
}

export { openPrefix }
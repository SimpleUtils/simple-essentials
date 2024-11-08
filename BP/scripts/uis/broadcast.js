import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { openMain } from "./uiManager";
import { broadcast, error } from '../functions';
import uiManager from '../uiManager.js';
import { ModalForm } from '../lib/form_func.js';


uiManager.addUI("admin.tools.broadcast | admin.tools.broadcast", "broadcast", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Broadcast")
    modalForm.textField("Message", "Example: New server coming soon!", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.tools")
        if (!textField) return error("You must enter a message", player)
            broadcast(`${textField}`) 
    })
}) 

function openBroadcast(player) {
    if (!player.hasTag('admin')) return error("You can not use the Admin UI", player);

    const broadcastForm = new ui.ModalFormData()
        .title("Broadcast Form")
        .textField("", "Type anything here!")
        .submitButton("Submit");

    broadcastForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.main")

        const [textField] = res.formValues;

        broadcast(`${textField}`)
    });
}

export { openBroadcast }
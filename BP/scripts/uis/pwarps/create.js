import { broadcast, error, success } from '../../functions.js';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import homeAPI from '../../api/homeAPI.js';
import * as config from '../../config.js';
import pwarpAPI from '../../api/pwarpAPI.js';

uiManager.addUI("players.pwarps.create | players.createpwarp", "Create a player warp", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Player Warps UI")
    modalForm.textField("Name", `Example: ${player.name}'s store!`, undefined)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [pwarpName] = response.formValues;

       if (response.canceled) return uiManager.open(player, "players.pwarps.root")
        pwarpAPI.set(player, pwarpName)
    })
}) 
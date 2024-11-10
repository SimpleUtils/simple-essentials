import { broadcast, error, success } from '../../functions';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import homeAPI from '../../api/homeAPI.js';
import * as config from '../../config.js';

uiManager.addUI("players.homes.create | players.createHome", "Create a home", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Homes UI")
    modalForm.textField("Name", "Example: Base", undefined)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [homeName] = response.formValues;

       if (response.canceled) return uiManager.open(player, "players.homes")
        homeAPI.set(player, homeName)
    })
}) 
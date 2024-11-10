import { broadcast, error, success } from '../../functions';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import homeAPI from '../../api/homeAPI.js';
import * as config from '../../config.js';

uiManager.addUI("admin.homes.config | admin.homesconfig", "Config homes", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Homes UI")
    modalForm.textField("Homes limit", "Example: 10", undefined)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [homelimit] = response.formValues;

       if (response.canceled) return uiManager.open(player, "players.homes")
        homeAPI.setHomeLimit(homelimit, player)
    })
}) 
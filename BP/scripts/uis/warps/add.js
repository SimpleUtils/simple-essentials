import { broadcast, error, success } from '../../functions';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import { removeWarpwithUI, setWarpwithUi } from '../../warp.js';
import * as config from '../../config.js';

uiManager.addUI("admin.warps.add | admin.warps.add", "Add warps", (player)=>{
    let modalForm = new ModalForm();
    modalForm.title("Add warp")
    modalForm.textField("Warp:", "Example: Spawn", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [textField] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.tools")
        if (!textField) return error("You must enter a warp!", player)
            if (!config.warpSystem === true) return error("Warp system is off!", player)
            setWarpwithUi(player, `${textField}`) 
    })
}) 
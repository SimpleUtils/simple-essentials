import { broadcast, error, success } from '../../functions.js';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import { removeWarpwithUI, setWarpwithUi } from '../../warp.js';
import * as config from '../../config.js';
import platformAPI from '../../api/platformAPI.js';

uiManager.addUI("admin.platform.mobile | admin.platformSettings.mobile", "Mobile platform config", (player)=>{
    let modalForm = new ModalForm();
    let dd = platformAPI.joinMessages.findFirst({platform: "mobile"})
    modalForm.title("Tag: platform_mobile")
    modalForm.toggle("Banned", config.mobileBanned)
    modalForm.textField("Join message", "Example: Hey plr!", dd.data.joinMessage)
    modalForm.textField("Leave message", "Example: Bye plr!", dd.data.leaveMessage)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [mobileBanned, jmsg, lmsg] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.platform")
        config.platformban_mobile(mobileBanned)
    platformAPI.changeMobileMessages(jmsg, lmsg)
    })
}) 
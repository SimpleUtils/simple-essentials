import { broadcast, error, success } from '../../functions.js';
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';
import { removeWarpwithUI, setWarpwithUi } from '../../warp.js';
import * as config from '../../config.js';
import platformAPI from '../../api/platformAPI.js';

uiManager.addUI("admin.platform.console | admin.platformSettings.console", "Console platform config", (player)=>{
    let modalForm = new ModalForm();
    let dd = platformAPI.joinMessages.findFirst({platform: "console"})
    modalForm.title("Tag: platform_console")
    modalForm.toggle("Banned", config.consoleBanned)
    modalForm.textField("Join message", "Example: Hey plr!", dd.data.joinMessage)
    modalForm.textField("Leave message", "Example: Bye plr!", dd.data.leaveMessage)
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [consoleBanned, jmsg, lmsg] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.platform")
        config.platformban_console(consoleBanned)
       platformAPI.changeConsoleMessages(jmsg, lmsg)
    })
}) 
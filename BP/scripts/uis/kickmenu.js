import { scriptEngine } from "../functions";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { error, success } from "../functions";
import { openMain } from "./uiManager";
import uiManager from '../uiManager';
import { ModalForm } from '../lib/form_func.js';


uiManager.addUI("admin.tools.kick | admin.tools.kick", "Kick Menu", (player)=>{
    let playerList = mc.world.getPlayers();
    let playerListDisplay = playerList.map(_=>_.name);

    let modalForm = new ModalForm();
    modalForm.title("Kick Menu");
    modalForm.dropdown("Player", playerListDisplay.map(_=>{
        return {
            option: _,
            callback() {}
        }
    }))
    modalForm.textField("Reason", "Example: Kicked for griefing!", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response)=>{

        const [a, reason] = response.formValues;

       if (response.canceled) return uiManager.open(player, "admin.tools")
        if (!reason) return error("You must enter a reason", player)
            let tryingtoKick = playerList[a]
        let targetPlayer;
        for (const player of mc.world.getPlayers()) {
            if (player.name.toLowerCase() == tryingtoKick.name.toLowerCase()) targetPlayer = player;
        }
        if (!targetPlayer) return error("That is not an online player!", player)
        if (targetPlayer.name == (`${player.name}`)) return error("You can't kick yourself, silly!", player)
        try {
            scriptEngine.runCommandAsync(`kick ${targetPlayer.name} Kicked by: ${player.name}. Reason: ${reason}`)
        } catch (error) {
            mc.world.sendMessage(`Error: ${error.message}`)
        }
    })
}) 

function openKickMenu(player) {
    if (!player.hasTag('admin')) return error("You can not use the Admin UI", player);

    let playerNames = [];
    let vPlayers = [];
    
    for (const player of mc.world.getPlayers()) {
        playerNames.push(player.name);
        vPlayers.push(player);
    }

    const kickForm = new ui.ModalFormData()
        .title("Kick Form")
        .dropdown('Select Player', playerNames)
        .textField("Reason", "Type reason here")
        .submitButton("Submit");

    kickForm.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.main")

        const [a, reason] = res.formValues;

        let tryingtoKick = vPlayers[res.formValues[0]];
        let targetPlayer;
        for (const player of mc.world.getPlayers()) {
            if (player.name.toLowerCase() == tryingtoKick.name.toLowerCase()) targetPlayer = player;
        }
        if (!targetPlayer) return error("That is not an online player!", player)
        if (targetPlayer.name == (`${player.name}`)) return error("You can't kick yourself, silly!", player)
        try {
            scriptEngine.runCommandAsync(`kick ${targetPlayer.name} Kicked by: ${player.name}. Reason: ${reason}`)
        } catch (error) {
            mc.world.sendMessage(`Error: ${error.message}`)
        }
    });
}

export { openKickMenu }
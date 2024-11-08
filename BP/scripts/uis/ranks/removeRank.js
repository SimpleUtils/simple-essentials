import { scriptEngine } from "../../functions";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { error, success } from "../../functions";
import uiManager from '../../uiManager';
import { ModalForm } from '../../lib/form_func.js';


uiManager.addUI("admin.rank.remove | admin.ranks.remove", "Ranks Remove", (player) => {
    let playerList = mc.world.getPlayers();
    let playerListDisplay = playerList.map(_ => _.name);

    let modalForm = new ModalForm();
    modalForm.title("Remove Rank");
    modalForm.dropdown("Player", playerListDisplay.map(_ => {
        return {
            option: _,
            callback() { }
        }
    }))
    modalForm.textField("Rank", "Example: Admin", undefined);
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response) => {

        const [a, reason] = response.formValues;

        if (!reason) return error("You must enter a rank!", player)
        let tryingtoKick = playerList[a]
        let allTags = tryingtoKick.getTags();

        if (!allTags.includes(`simplerank:${reason}`)) return error("Player does not have tag", player)

        let targetPlayer;
        for (const player of mc.world.getPlayers()) {
            if (player.name.toLowerCase() == tryingtoKick.name.toLowerCase()) targetPlayer = player;
        }
        if (!targetPlayer) return error("That is not an online player!", player)
        try {
            mc.system.run(() => {
                player.removeTag(`simplerank:${reason}`)
            });
            success(`Successfully removed rank "${reason}§7" from ${targetPlayer.name}`, player)
        } catch (error) {
            mc.world.sendMessage(`Error: ${error.message}`)
        }
    })
})
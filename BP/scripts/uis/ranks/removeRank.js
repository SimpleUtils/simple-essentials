import { scriptEngine } from "../../functions.js";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'
import { error, success } from "../../functions.js";
import uiManager from '../../uiManager.js';
import { ModalForm } from '../../lib/form_func.js';


uiManager.addUI("admin.rank.remove | admin.ranks.remove", "Ranks Remove", (player) => {
    let playerList = mc.world.getPlayers();
    let playerListDisplay = playerList.map(_ => _.name);
    mc.world.sendMessage(`${playerList.map(_ => _.name)}`)

    let allRanks = playerList.map(player => {
        return {
            name: player.name,
            tags: player.getTags().filter(tag => tag.startsWith("simplerank:"))
        };
    });
    
    let allRanksDisplay = allRanks.map(playerData => {
        return `${playerData.tags.join(",") || "No Tags"}`;
    })
    

    let modalForm = new ModalForm();
    modalForm.title("Remove Rank");
    modalForm.dropdown("Player", playerListDisplay.map(_ => {
        return {
            option: _,
            callback() { }
        }
    }))
    modalForm.dropdown("Rank", allRanksDisplay.map(_ => {
        return {
            option: _,
            callback() { }
        }
    }))
    modalForm.submitButton("Send");
    modalForm.show(player, false, (player, response) => {

        const [a, rank] = response.formValues;
        
        mc.world.sendMessage(`${rank}`)
        let reason = allRanksDisplay[rank]
        mc.world.sendMessage(`${reason}`)
        let tryingtoKick = playerList[a]
        let allTags = tryingtoKick.getTags();

        if (!allTags.includes(`${reason}`)) return error("Player does not have tag", player)

        let targetPlayer;
        for (const player of mc.world.getPlayers()) {
            if (player.name.toLowerCase() == tryingtoKick.name.toLowerCase()) targetPlayer = player;
        }
        if (!targetPlayer) return error("That is not an online player!", player)
            scriptEngine.runCommandAsync(`tag ${targetPlayer.name} remove "${reason}"`)
            success(`Successfully removed rank "${reason}§r§7" from ${targetPlayer.name}`, player)
        
    })
})
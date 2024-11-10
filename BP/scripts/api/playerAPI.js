import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'

class simplePlayers {
    constructor() {
        this.world = mc.world
        this.scoreboard = mc.ScoreboardIdentity
        this.tpDB = prismarineDb.table("tpaAPI")
    }
    verifyPlayer(player) {
        let targetPlayer = player
        console.log(`${player}`)
        for (const plr of mc.world.getPlayers()) {
            if (plr.name.toLowerCase() === player.toLowerCase()) {
                targetPlayer = plr;  
                break;               
            }
        }
        if (targetPlayer) {
            return targetPlayer;
        } else {
            return false;
        }
    }    
    handlePlayerLeave(player) {
        let tpaRequestsTable = this.tpDB
        const requests = tpaRequestsTable.findDocuments({
            $or: [
                { requester: player },
                { target: player }
            ]
        });

        for (const request of requests) {
            tpaRequestsTable.deleteDocumentByID(request.id);
        }

        console.log(`All TPA requests involving ${player.name} have been deleted.`);
    }

}

export default new simplePlayers();
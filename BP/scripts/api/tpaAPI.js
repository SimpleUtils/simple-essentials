import simplePlayers from './playerAPI'
import * as simple from '../functions'
import { prismarineDb } from '../lib/prismarinedb'
import * as config from '../config'

class tpaAPI {
    constructor() {
        this.players = simplePlayers
        this.db = prismarineDb.table("tpaAPI")
        this.playerStorage = prismarineDb.keyval("playerstorage")
    };
    requestTo(player, target) {
        if (!config.TPASystem === true) return simple.error("TPA System is disabled by the server admins", player)
        let verifiedPlayer = this.players.verifyPlayer(target)
        if (verifiedPlayer === false) return simple.error("Invalid player!", player)
        if (!verifiedPlayer === false) {
            this.db.insertDocument({
                requester: player,
                target: verifiedPlayer,
                timestamp: Date.now(),
                status: "pending"
            });
            verifiedPlayer.sendMessage(`${player.name} has requested to teleport to you!`)

            simple.success(`Sent TPA Request to ${verifiedPlayer.name}`, player) 
        } else {
            simple.error(`verifiedPlayer.name returned ${verifiedPlayer.name}. Please report this as a bug!`, player)
        }
    }
    acceptRequest(player) {
        if (!config.TPASystem === true) return simple.error("TPA System is disabled by the server admins", player)
        const requests = this.db.findDocuments({
            target: player, 
            status: "pending"    
        });
    
        if (!requests) return simple.error("No requests found", player)
        console.log(`${requests}`)
        for (const request of requests) {
            let targetRequester = request.data.requester
            simple.success(`${player.name} has accepted your TPA Request!`, targetRequester)
            let x = player.location.x
            let y = player.location.y
            let z = player.location.z
            console.log(`${x}, ${y}, ${z} from ${targetRequester.name} to ${player.name}`)
            simple.commandFeedback("off")
            targetRequester.runCommandAsync(`tp ${x} ${y} ${z}`);
            simple.commandFeedback("on")
            simple.success(`Accepted tpa from ${targetRequester.name}`, player)

            request.status = "completed";
            this.db.deleteDocumentByID(request.id)
        }
    }
}

export default new tpaAPI();
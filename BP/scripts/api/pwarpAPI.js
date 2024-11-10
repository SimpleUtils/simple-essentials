import { prismarineDb } from "../lib/prismarinedb";
import * as simple from "../functions"

class pwarpAPI {
    constructor() {
        this.db = prismarineDb.table("pwarpAPI")
    }
    set(player, name) {
        const documentswithname = this.db.findDocuments({
            name: name
        })

        if (documentswithname && documentswithname.length > 0) return simple.error("You can't set a player warp's name the same as another player warp's name!", player)
        this.db.insertDocument({
            player: player,
            playername: player.name,
            location: player.location,
            date: Date.now(),
            name: name
        })
        simple.success(`Successfully set player warp name: ${name}`, player)
    }
    remove(player, name) {
        const playersPlayerWarps = this.db.findDocuments({
            playername: player.name,
            name: name
        })

        for (const warp of playersPlayerWarps) {
            simple.success(`Deleted warp: ${warp.data.name}`, player)
            this.db.deleteDocumentByID(warp.id)
        }
    }
    getAll() {
        const allpwarps = this.db.findDocuments();
        return allpwarps;
    }
    getAllfromPlayer(player) {
        const allfromPlayer = this.db.findDocuments({
            playername: player.name
        })

        return allfromPlayer
    }
    teleport(player, name) {
        const pwarp = this.db.findDocuments({
            name: name
        })

        for (const warp of pwarp) {
            player.teleport({
                x: warp.data.location.x,
                y: warp.data.location.y,
                z: warp.data.location.z
            })
            simple.success(`Successfully teleported to ${warp.data.name}`, player)
        }
    }
}

export default new pwarpAPI();
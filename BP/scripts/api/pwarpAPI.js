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
    async getAllfromPlayer(player) {
        const allfromPlayer = await this.db.findDocuments({
            playername: player.name
        })

        return allfromPlayer
    }
    async getAllfromPlayerName(player) {
        const allfromPlayer = await this.db.findDocuments({
            playername: player
        })

        return allfromPlayer
    }
    async getAllPlayers() {
        const allPlayers = await this.db.findDocuments({});
        
        const uniquePlayers = [...new Set(allPlayers.map(playerDoc => playerDoc.data.playername))];
        
        return uniquePlayers;
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
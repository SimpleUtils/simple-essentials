import * as mc from "@minecraft/server"
import { prismarineDb } from "../lib/prismarinedb"
import * as simple from "../functions"

class homeAPI {
    constructor() {
        this.db = prismarineDb.table("homeAPI")
    }
    set(player, name) {
        const checkifname = this.db.findFirst({
            name: name,
            playername: player.name
        })
        if (checkifname) return simple.error("You cannot have 2 of the same home names", player)
        this.db.insertDocument({
            player: player,
            playername: player.name,
            name: `${name}`,
            location: player.location
        })
        simple.success(`Created home with name: ${name}`, player)
    }
    teleport(player, name) {
        const homes = this.db.findDocuments({
            playername: player.name,
            name: `${name}`
        })
        for (const home of homes) {
            if (!home.data.name === name) return simple.error("You don't have a home with this name!", player);
            player.teleport({
                x: home.data.location.x,
                y: home.data.location.y,
                z: home.data.location.z
            })
            simple.success(`Teleported to home with name: ${name}`, player)
        }
    }
    delete(player, name) {
        const homes = this.db.findDocuments({
            playername: player.name,
            name: `${name}`
        })
        for (const home of homes) {
            if (!home.data.name === name) return simple.error("You don't have a home with this name!", player);
            this.db.deleteDocumentByID(home.id)
            simple.success(`Deleted home: ${home.data.name}`, player)
        }
    }
    getHomes(player) {
        const allHomes = this.db.findDocuments({
            playername: player.name
        })
        return allHomes
    }
}

export default new homeAPI();
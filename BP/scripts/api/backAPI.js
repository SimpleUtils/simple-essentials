import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'
import * as simple from '../functions'

class backAPI {
    constructor() {
        this.db = prismarineDb.table("backAPI")
    }
    
    insertLocation(player) {
        this.db.insertDocument({
            player: player,
            location: player.location,
        })
    }
    
    async goBack(player) {
        console.log("Attempting to retrieve last death location...");

        const lastDeath = await this.db.findDocuments({
            player: player
        });

        console.log("Documents found:", lastDeath);

        if (lastDeath.length === 0) {
            simple.error("You do not have any deaths you have not already teleported to!", player)
            return;
        }

        for (const doc of lastDeath) {
            console.log(`Location found at x: ${doc.data.location.x}, y: ${doc.data.location.y}, z: ${doc.data.location.z}`);

            console.log("Teleporting player to last death location...");
            await player.runCommandAsync(`tp ${doc.data.location.x} ${doc.data.location.y} ${doc.data.location.z}`);
            console.log("Teleportation command executed.");
            this.db.deleteDocumentByID(doc.id)
        }
    }
}


export default new backAPI();
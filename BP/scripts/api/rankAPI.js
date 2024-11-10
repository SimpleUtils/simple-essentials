import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'

class rankAPI {
    constructor() {
        // this.db = prismarinedb.table("rankAPI")
    }
    getAllRanks(player) {
        // Get all tags from the player
        let allTags = player.getTags();

        // Filter tags that start with "simplerank:"
        let simpleRankTags = allTags.filter(tag => tag.startsWith("simplerank:"));

        // Send a message with the filtered tags
        mc.world.sendMessage(`${simpleRankTags}`);
    }
}

export default new rankAPI();
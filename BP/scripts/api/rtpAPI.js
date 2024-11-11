import * as mc from "@minecraft/server"
import * as s from "../functions"
import { prismarineDb } from "../lib/prismarinedb"

export default class rtpAPI {
    constructor() {
        this.db = prismarineDb.table("rtpAPI")
    }
    randomTeleport(player) {
        
    }
    goBack(player) {

    }
}
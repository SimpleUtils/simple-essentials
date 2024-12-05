import { prismarineDb } from "../lib/prismarinedb";
import { system, world } from "@minecraft/server"
import { scriptEngine } from "../functions";
import playerStorage from "./playerStorage";

class banAPI {
    constructor() {
        this.db = prismarineDb.table("BanDB");
    }
    banPlayer(player) {
        let uuid = playerStorage.getID(player)
        let doc = this.db.findFirst({ uuid });
        if (doc) {
            throw new Error("UUID is already in the database")
        } else {
            this.db.insertDocument({
                uuid,
                name: player.name
            })
        }
        return true;
    }
    unbanPlayer(name) {
        let doc = this.db.findFirst({ name });

        world.sendMessage(`${name}`)
        if (doc) {
            this.db.deleteDocumentByID(doc.id);
            return true;
        } else {
            throw new Error("Player is not banned!")
        }
    }
    getBanbyUsername(username) {
        return this.db.findFirst({ name: username });
    }
    getBanbyID(uuid) {
        return this.db.findFirst(uuid)
    }
    getBans() {
        return this.db.data;
    }
    kickPlayer(player) {
        let uuid = playerStorage.getID(player)
        let ban = this.getBanbyID(uuid);
        if (!ban) throw new Error("Player is not banned")
        system.run(() => {
            scriptEngine.runCommand(`kick ${player.name} You are banned from this server`)
        })
        return true;
    }
    //unbanPlayer(name) {
    //    let ban = this.getBan(name);
    //    if(!ban) return true;
    //    this.db.deleteDocumentByID(ban.id)
    //}
}

export default new banAPI();
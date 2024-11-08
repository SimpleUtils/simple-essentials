import { prismarineDb } from "../lib/prismarinedb";
import { system, world } from "@minecraft/server"
import { scriptEngine } from "../functions";

class banAPI {
    constructor() {
        this.db = prismarineDb.table("BanDB");
    }
    banPlayer(name) {
        let doc = this.db.findFirst({name});
        if(doc) {
            return false;
        } else {
            this.db.insertDocument({
                name
            })
        }
        return true;
    }
    unbanPlayer(name) {
        let doc = this.db.findFirst({name});
        world.sendMessage(`${name}`)
        if(doc) {
            this.db.deleteDocumentByID(doc.id);
            return true;
        } else {
            return false;
        }
    }
    getBan(username) {
        return this.db.findFirst({username});
    }
    getBans() {
        return this.db.data;
    }
    kickPlayer(player) {
        let ban = this.getBan(player);
        if(!ban) return false;
        system.run(()=>{
        scriptEngine.runCommand(`kick ${player}`)
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
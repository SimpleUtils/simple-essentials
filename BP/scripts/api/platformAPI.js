import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'

class platformAPI {
    constructor() {
        this.mobile = "platform_mobile"
        this.console = "platform_console"
        this.desktop = "platform_desktop"
        this.db = prismarineDb.table("platformAPI")
        this.joinMessages = prismarineDb.table("joinMessages")
    }
    addConsoleTag(player) {
        player.runCommandAsync(`tag @s add ${this.console}`)
    }
    addDesktopTag(player) {
        player.runCommandAsync(`tag @s add ${this.desktop}`)
    }
    addMobileTag(player) {
        player.runCommandAsync(`tag @s add ${this.mobile}`)
    }
    clearAllPlatformTags(player) {
        player.runCommandAsync(`tag @s remove ${this.mobile}`)
        player.runCommandAsync(`tag @s remove ${this.desktop}`)
        player.runCommandAsync(`tag @s remove ${this.console}`)
    }
    addToWhitelist(name) {
        this.db.insertDocument({name})
        return true;
    }
    getDocbyName(name) {
        let doc = this.db.findFirst({name})
        if (!doc) return false;
        return doc;
    }
    getAllDocs() {
        let allDocs = this.db.findDocuments()
        if (!allDocs) return false;
        return allDocs;
    }
    removeFromWhitelist(name) {
        let doc = this.getDocbyName(name)
        if (doc === false) return false;
        this.db.deleteDocumentByID(doc.id)
        return true;
    }
    changeMobileMessages(jmessage, lmessage) {
        let doc = this.joinMessages.findFirst({platform: "mobile"})
        doc.data.joinMessage = jmessage
        doc.data.leaveMessage = lmessage
        this.joinMessages.overwriteDataByID(doc.id, doc.data)
    }
    changeDesktopMessages(jmessage, lmessage) {
        let doc = this.joinMessages.findFirst({platform: "desktop"})
        doc.data.joinMessage = jmessage
        doc.data.leaveMessage = lmessage
        this.joinMessages.overwriteDataByID(doc.id, doc.data)
    }
    changeConsoleMessages(jmessage, lmessage) {
        let doc = this.joinMessages.findFirst({platform: "console"})
        doc.data.joinMessage = jmessage
        doc.data.leaveMessage = lmessage
        this.joinMessages.overwriteDataByID(doc.id, doc.data)
    }
}

export default new platformAPI();
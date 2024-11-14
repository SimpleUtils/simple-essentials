import * as mc from '@minecraft/server'
import { prismarineDb } from '../lib/prismarinedb'

class rankAPI {
    constructor() {
        // this.db = prismarinedb.table("rankAPI")
    }
    getAllRanks(player) {
        let allTags = player.getTags();
        let simpleRankTags = allTags
            .filter(tag => tag.startsWith("simplerank:"))
            .map(tag => tag.replace("simplerank:", ""));
        return simpleRankTags;
    }
    
    
    getNameColor(player) {
        let allTags = player.getTags();
        let nameColorTags = allTags.find(tag => tag.startsWith("simple-nc:"));
        if (nameColorTags) {
            return nameColorTags.split("simple-nc:")[1];
        }
        return null;
    }
    
    getMessageColor(player) {
        let allTags = player.getTags();
        let messageColorTags = allTags.find(tag => tag.startsWith("simple-cc:"));
        if (messageColorTags) {
            return messageColorTags.split("simple-cc:")[1]; 
        }
        return null;
    }
    
    formatMessage(msg) {
        let newMsg = msg.replaceAll("{nl}", "\n");
        return newMsg;
    }
    
    createMessage(player, msg) {
        let ranks = this.getAllRanks(player);
        let nameColor = this.getNameColor(player) || "§7";
        let messageColor = this.getMessageColor(player) || "§7";
        let newMsg = this.formatMessage(msg);
    
        if (ranks.length === 0) {
            ranks.push("§bMember");
        }
        
        let joined = ranks.join('§r§8] [§r');

        mc.world.sendMessage(`§8[§r${joined}§r§8]§7 ${nameColor}${player.name}§8 >>§7 ${messageColor}${newMsg}`);
    }
    
    /**
     * Old code:
     * if (!msg.sender.getTags().find(tag => tag.startsWith('simplerank:')) && chatRankToggle === true) {
        msg.cancel = true;
        if (msg.message.startsWith(`${commandPrefix}`)) return;
        mc.world.sendMessage(`§8[${config.memberRankColour}Member§r§8]§7 ${msg.sender.name} §8>>§7 ${msg.message}`);
    }
    const player = msg.sender
    let ranks = player.getTags()
        .filter(tag => tag.startsWith('simplerank:'))
        .map(tag => tag.substring(11));

    if (ranks.length > 0 && chatRankToggle === true) {

        let joined = ranks.join('§r§8] [§r')

        const simpleNcTag = msg.sender.getTags().find(tag => tag.startsWith('simple-nc:'));
        let simpleNcDisplay = '';

        if (simpleNcTag) {
            simpleNcDisplay = simpleNcTag.split('simple-nc:')[1];
        }
        const simpleCCTag = msg.sender.getTags().find(tag => tag.startsWith('simple-cc:'));
        let simpleCCDisplay = '';

        if (simpleCCTag) {
            simpleCCDisplay = simpleCCTag.split('simple-cc:')[1];
        }

        msg.cancel = true;
        let newMessage = msg.message.replaceAll("{nl}", "\n")
        if (msg.message.startsWith(`${commandPrefix}`)) return;
        mc.world.sendMessage(`§8[§r${joined}§r§8]§7 ${simpleNcDisplay}${msg.sender.name} §8>>§7${simpleCCDisplay} ${newMessage}`);
    } */
}

export default new rankAPI();
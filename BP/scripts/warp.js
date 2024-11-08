import translation from "./api/translation";
import warpAPI from "./api/warpAPI";
import banAPI from "./api/banAPI";
import { prismarineDb } from "./lib/prismarinedb";

function warpTo(msg, args, params) {
    if (!params.length) {
        let text = [`§7-----> §2Warps §7<-----`];
        let warps = warpAPI.getWarps();
        for (const warp of warps) {
            text.push(`§8> §a${warp.data.name}`);
        }
        msg.sender.sendMessage(text.join('\n§r'));
    } else {
        let result = warpAPI.tpToWarp(msg.sender, params.join(' '));
        if (!result) {
            msg.sender.sendMessage(translation.getTranslation(msg.sender, 'error', "Warp not found"))
        } else {
            msg.sender.sendMessage(translation.getTranslation(msg.sender, 'success', "Teleported to warp!"))
        }
    }
}
function setWarp(msg, args, params) {
    if (!prismarineDb.permissions.hasPermission(msg.sender, "warps.set"))
        return msg.sender.sendMessage(translation.getTranslation(msg.sender, "error", translation.getTranslation(msg.sender, "commands.errors.noperms", "warps.set")))

    let result = warpAPI.setWarpAtVec3(msg.sender.location, params.join(' '));
    msg.sender.sendMessage(translation.getTranslation(msg.sender, "success", "Successfully set warp!"))
}
function removeWarp(msg, args, params) {
    if (!prismarineDb.permissions.hasPermission(msg.sender, "warps.remove"))
        return msg.sender.sendMessage(translation.getTranslation(msg.sender, "error", translation.getTranslation(msg.sender, "commands.errors.noperms", "warps.remove")))

    let result = warpAPI.deleteWarp(params.join(' '));
    if (!result) {
        msg.sender.sendMessage(translation.getTranslation(msg.sender, 'error', "Warp not found"))
    } else {
        msg.sender.sendMessage(translation.getTranslation(msg.sender, 'success', "Deleted warp"))
    }
}
function setWarpwithUi(player, params) {
    if (!prismarineDb.permissions.hasPermission(player, "warps.set"))
        return player.sendMessage(translation.getTranslation(player, "error", translation.getTranslation(player, "commands.errors.noperms", "warps.set")))

    let result = warpAPI.setWarpAtVec3(player.location, params);
    player.sendMessage(translation.getTranslation(player, "success", "Successfully set warp!"))
}
function removeWarpwithUI(player, params) {
    if (!prismarineDb.permissions.hasPermission(player, "warps.remove"))
        return player.sendMessage(translation.getTranslation(player, "error", translation.getTranslation(player, "commands.errors.noperms", "warps.remove")))

    let result = warpAPI.deleteWarp(params);
    if (!result) {
        player.sendMessage(translation.getTranslation(player, 'success', "Deleted warp"))
    } else {
        player.sendMessage(translation.getTranslation(player, 'error', "Warp not found"))
    }
}

export { removeWarp, setWarp, warpTo, setWarpwithUi, removeWarpwithUI }

import * as mc from '@minecraft/server'
import { commandPrefix, changeCommandPrefix } from './main.js'
import { scriptEngine, error, success, commandFeedback, broadcast } from './functions.js'
import { clearChat } from './clearChat.js'
import * as uiManager from './uis/uiManager.js'
import { openCredits } from './uis/credits.js'
import * as config from './config.js'
import * as warps from './warp.js'
import { playerAPI } from './lib/prismarinedb.js'
import { openRedeem } from './openRedeem.js'
import banAPI from './api/banAPI.js'
import translation from './api/translation.js'

function runCommand(player, command, msg) {

    let args = command.trim().split(" ");

    let commandName = args[0].toLowerCase();
    let params = args.slice(1);
    
    switch (commandName) {
        case "help":
            player.sendMessage(`§bCommands:
§e============
§bto: §aTeleport to someone without them knowing!
§bprefix: §aChange the command prefix!
§bhelp: §aHelp command!
§bbc: §aBroadcast anything to players!
§bcredits: §aView the credits of the addon!
§bconfig: §aOpen the config UI/Admin UI
§bcc: §aClear the chat!
§bchatranks: §aToggle chat ranks!
§bloreadd: §aAdd lore to any item!
§bloreremove: §aRemove lore from any item!
§bbind: §aBind any item to a command!
§b- bindremove: Remove bind
§bwarp: §aWarp to any server warp
§b- setwarp: Set server warp
§b- removewarp: Remove server warp
§bredeem: §aRedeem codes set by admins in the server
§bban: §aBan troublemakers from your server!
§b- unban: Unban people if the ban was wrongful.
§b- bans: List of all people banned
§e============
§aYou can also do /scriptevent simple:run <command>`)
            break;

        case "ban":
            if (!config.banSystem === true) return error("the Ban System is disabled!", player)
            if (!player.hasTag('admin')) return error("You are not an admin!", player)
            if (player.name === params.join(' ')) return error("You can't ban yourself, why would anyone ever do that lol...", player)
            banAPI.banPlayer(params.join(' '))
            success(`Successfully banned ${params.join(' ')}`, player)
            scriptEngine.runCommandAsync(`kick ${params.join(' ')} You are banned from this server!`)
            break;
        case "unban":
            if (!config.banSystem === true) return error("the Ban System is disabled!", player)
            if (!player.hasTag('admin')) return error("You are not an admin!", player)
            banAPI.unbanPlayer(params.join(' '))
            success(`Successfully unbanned ${params.join(' ')}`, player)
            break;
        case "checkban":
            if (!config.banSystem === true) return error("the Ban System is disabled!", player)
            let bans = banAPI.getBans();
            let checkbanOfTargetPlayerResult;
            for (const ban of bans) {
                if (player.name === ban.data.name) {
                    checkbanOfTargetPlayerResult = ban.data.name
                } else {
                    checkbanOfTargetPlayerResult = null
                }
            }
            if (!checkbanOfTargetPlayerResult) {
                player.sendMessage(translation.getTranslation(player, 'error', "Not in ban API"))
            } else {
                player.sendMessage(translation.getTranslation(player, 'success', `Is in ban API, with return ${checkbanOfTargetPlayerResult}`))
            }
        break;
        case "bans":
            if (!config.banSystem === true) return error("the Ban System is disabled!", player)
            let text = [`§7-----> §cBans §7<-----`];
            let allBans = banAPI.getBans();
            for (const ban of allBans) {
                text.push(`§8> §a${ban.data.name}`);
            }
            msg.sender.sendMessage(text.join('\n§r'));
           break;              

        case "to":
            if (!player.hasTag('admin')) return error("You are not an admin!", player)
            if (!args[1]) return error("That is not a player!", player)
            let targetPlayer;
            for (const player of mc.world.getPlayers()) {
                if (player.name.toLowerCase() == args[1].toLowerCase()) targetPlayer = player;
            }
            if (!targetPlayer) return error("That is not an online player!", player)
            if (targetPlayer.name == (`${player.name}`)) return error("You can't teleport to yourself, silly!", player)

            const targetLocation = targetPlayer.location;
            const targetDimension = targetPlayer.dimension;

            commandFeedback("off")
            scriptEngine.runCommandAsync(`tp ${player.name} ${targetLocation.x} ${targetLocation.y} ${targetLocation.z}`)
            commandFeedback("on")
            success(`Successfully teleported to ${targetPlayer.name}!`, player)
            break;
        case "prefix":
            if (!player.hasTag('admin')) return error("You can't do this!", player)
            if (!args[1]) return error("Enter a prefix!", player)
            changeCommandPrefix(`${args[1]}`)
            mc.world.setDynamicProperty("prefix", `${args[1]}`)
            success(`Changed prefix to ${commandPrefix}`, player)
            break;
        case "warp":
            if (!config.warpSystem === true) return error("Warp System is disabled!", player)
        warps.warpTo(msg, args, params);
        break;
        case "setwarp":
            if (!config.warpSystem === true) return error("Warp System is disabled!", player)
            warps.setWarp(msg, args, params)
            break;
        case "removewarp":
            if (!config.warpSystem === true) return error("Warp System is disabled!", player)
            warps.removeWarp(msg, args, params)
            break;
        case `credits`: // Assuming you want the command to have a prefix
            const system = mc.system
            success("Close chat and move to open UI.", player); // Notify the player

            let ticks = 0; // Track time in ticks (20 ticks = 1 second)
            let initialLocation = { x: player.location.x, y: player.location.y, z: player.location.z }; // Capture player's initial location

            // Run an interval every tick (20 ticks per second)
            let interval = system.runInterval(() => {
                ticks++;

                // Check if 10 seconds (200 ticks) have passed
                if (ticks >= (20 * 10)) {
                    system.clearRun(interval); // Stop the interval
                    error("Timed out. You didn't move!", player); // Send a timeout message
                }

                // Check if the player has moved from their initial location
                if (player.location.x !== initialLocation.x ||
                    player.location.y !== initialLocation.y ||
                    player.location.z !== initialLocation.z) {

                    system.clearRun(interval); // Stop the interval
                    openCredits(player);
                }
            }, 1); // Execute every tick

            break;
            case `config`:
                if (!player.hasTag('admin')) return error("You can't run this command!", player)
                player.runCommandAsync("scriptevent simple:open_admin")
            break;
            case `cc`:
                if (!player.hasTag('admin')) return error("You can't run this command!", player)
                clearChat(player)
            break;
            case `bc`:
                if (!player.hasTag('admin')) return error("You don't have permission!", player)
                if (config.broadcasting === false) return error("Broadcasting is disabled", player)
                if (!args[1]) return error("You must enter a message!", player)
                broadcast(`${args.slice(1).join(" ")}`)
            break;
            case `chatranks`:
                    error("This command is deprecated in favour of Modules in the Admin UI", player)
            break;
            case `loreadd`:
                player.runCommandAsync(`scriptevent simple:add_lore ${args.slice(1).join(" ")}`)
            break;
            case `loreremove`:
                player.runCommandAsync(`scriptevent simple:remove_lore ${args.slice(1).join(" ")}`)
            break;
            case `bind`:
                if (!player.hasTag('admin')) return error("Binding system is admin only!", player)
                if (config.bindSystem === false) return error("Binding system is off.", player)
                let inventoryComponent = player.getComponent("inventory");
            
                if (!inventoryComponent) {
                    error("Inventory component is not available.", player);
                    return;
                }
            
                let container = inventoryComponent.container;
                if (!container.getItem(player.selectedSlotIndex)) return error("You need to be holding an item", player);
                let item = container.getItem(player.selectedSlotIndex);
                if (item.typeId === "essentials:admin") return error("You cannot change the Admin UI's binded command!", player)
                if (item.typeId === "simple:redeem") return error("You cannot change the Redeem Code UI's binded command!", player)
                mc.world.setDynamicProperty(`${item.typeId}`, `${args.slice(1).join(' ')}`)
                success(`Set ${item.typeId} to ${args.slice(1).join(' ')}`, player)
                break;
            case `uis`:
                player.sendMessage(`§aUseful UIS:
§b- admin.codes.redeem
§b- admin.main
======================
Open UIs with /scriptevent simple:open_ui <ui>
Open Custom UIs with /scriptevent simple:open <ui>`)
break;
            case `bindremove`:
                if (!player.hasTag('admin')) return error("Binding system is admin only!", player)
                    if (config.bindSystem === false) return error("Binding system is off.", player)
                    let inv = player.getComponent("inventory");
                
                    if (!inv) {
                        error("Inventory component is not available.", player);
                        return;
                    }
                
                    let cont = inv.container;
                    if (!cont.getItem(player.selectedSlotIndex)) return error("You need to be holding an item", player);
                    let invitem = cont.getItem(player.selectedSlotIndex);
                    if (invitem.typeId === "essentials:admin") return error("You cannot change the Admin UI's binded command!", player)
                    mc.world.setDynamicProperty(`${invitem.typeId}`, ``)
                    success(`Deleted ${invitem.typeId}'s bind`, player)
                    break;
            case `redeem`:
                if (!config.codeSystem === true) return error("Code system is disabled", player)
                openRedeem(player)
            break 
        default:
            error(`Unknown command: ${commandName}`, player);
            break;
    }
}

export { runCommand }

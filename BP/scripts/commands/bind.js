import { world } from "@minecraft/server";
import commandManager from "../api/commands/commandManager";
import * as simple from "../functions"
import * as config from "../config"
import * as mc from "@minecraft/server"

commandManager.addCommand("bind", {description:"Bind items to commands", category:"Setup"}, ({msg,args})=>{
    const player = msg.sender
    if (!player.hasTag('admin')) return simple.error("Binding system is admin only!", player)
        if (config.bindSystem === false) return simple.error("Binding system is off.", player)
        let inventoryComponent = player.getComponent("inventory");
    
        if (!inventoryComponent) {
            simple.error("Inventory component is not available.", player);
            return;
        }
    
        let container = inventoryComponent.container;
        if (!container.getItem(player.selectedSlotIndex)) return simple.error("You need to be holding an item", player);
        let item = container.getItem(player.selectedSlotIndex);
        if (item.typeId === "essentials:admin") return simple.error("You cannot change the Admin UI's binded command!", player)
        if (item.typeId === "simple:redeem") return simple.error("You cannot change the Redeem Code UI's binded command!", player)
        mc.world.setDynamicProperty(`${item.typeId}`, `${args.join(' ')}`)
        success(`Set ${item.typeId} to ${args.join(' ')}`, player)
})

commandManager.addSubcommand("bind", "remove", {description:"Remove binds"}, ({msg,args})=>{
    const player = msg.sender
    const error = simple.error
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
        simple.success(`Removed ${item.typeId}'s bind!`, player)
})
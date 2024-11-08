import { system } from '@minecraft/server';
import * as simple from './functions'

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, sourceEntity: player, message } = event;

    if (!player?.typeId === 'minecraft:player') return;

    const inventory = player.getComponent("inventory").container;
    const item = inventory.getItem(player.selectedSlotIndex);

    if (id === 'simple:add_lore') {
        let addLore = message ? message.trim() : null;

        if (!addLore) {
            simple.error("No lore provided.", player);
            return;
        }

        addLore = addLore.replace(/_/g, ' ');

        if (item) {
            let currentLore = item.getLore();
            currentLore.push(`§r${addLore}`);
            item.setLore(currentLore);
            inventory.setItem(player.selectedSlotIndex, item);
            simple.success(`Added lore: ${addLore}`, player)
        } else {
            simple.error("You're not holding an item.", player);
        }
    }

    if (id === 'simple:remove_lore') {
        let removeLore = message ? message.trim() : null;

        if (!removeLore) {
            simple.error("No lore provided to remove.", player);
            return;
        }

        removeLore = removeLore.replace(/_/g, ' ');

        if (item) {
            let currentLore = item.getLore();
            const filteredLore = currentLore.filter(lore => lore !== `§r${removeLore}`);
            if (filteredLore.length === currentLore.length) {
                simple.error(`Lore: "${removeLore}" not found.`, player);
                return;
            }
            item.setLore(filteredLore);
            inventory.setItem(player.selectedSlotIndex, item);
            simple.success(`Removed lore: ${removeLore}`, player);
        } else {
            simple.error("You're not holding an item.", player);
        }
    }
});
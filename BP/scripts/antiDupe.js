import { world } from '@minecraft/server'

world.beforeEvents.playerLeave.subscribe(evd => {
    const player = evd.player;
    const inv = player.getComponent('inventory').container;
    const itemAmts = [];
    for (let i = 0; i < inv.size; i++) {
        itemAmts.push(inv.getItem(i)?.amount ?? 0);
    }; player.setDynamicProperty('item_amounts', JSON.stringify(itemAmts));
});
world.afterEvents.playerSpawn.subscribe(evd => {
    if (!evd.initialSpawn) return;
    const player = evd.player;
    if (!player.getDynamicProperty('item_amounts')) {
        player.getComponent('cursor_inventory').clear()
    }
    else {
        const inv = player.getComponent('inventory').container;
        const itemAmts = JSON.parse(player.getDynamicProperty('item_amounts') ?? '[]');
        itemAmts.forEach((amt, slot) => {
            const existingAmt = inv.getItem(slot)?.amount ?? 0;
            if (existingAmt === amt) return;
            const item = inv.getItem(slot)
            item.amount = amt
            return inv.setItem(slot, item);
        }); player.setDynamicProperty('item_amounts');
    }
});
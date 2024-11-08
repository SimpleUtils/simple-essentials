import * as mc from "@minecraft/server";
import * as config from './config'
import uiManager from "./uiManager";

mc.world.afterEvents.itemUse.subscribe((event) => {
    const { source, itemStack } = event;
    if (!config.bindSystem === true) return;
    mc.world.getDynamicPropertyIds().forEach((id) => {
        const value = mc.world.getDynamicProperty(id);

        if (id === `${itemStack.typeId}`) {
                source.runCommandAsync(`${value}`);
        }
      });
});
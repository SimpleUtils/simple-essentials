import * as config from '../../config'
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import platformAPI from '../../api/platformAPI';

uiManager.addUI("admin.platform.whitelist.add | admin.addPlatformWhitelist", "Platform Config", (player)=>{
    let form = new ModalFormData()
    .title("§bPlatform Whitelist")
    .textField("Player", "Example: FruitKitty7041", undefined)
    .submitButton("Add")
    form.show(player).then(res => {
        if (res.canceled) uiManager.open(player, "admin.platform")

        const [Player] = res.formValues;

        if(!Player) return player.error("You need to enter Player");

        try {
            platformAPI.addToWhitelist(`${Player}`)
        } catch (err) {
            player.error(`${err.message}`)
        }
    });
})
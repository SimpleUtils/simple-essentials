import { scriptEngine } from "../functions";
import * as ui from '@minecraft/server-ui'
import * as mc from '@minecraft/server'

function openCredits(player) {
    const creditsForm = new ui.ActionFormData()
        .title("Credits")
        .button("FruitKitty\nMain dev", "icons/FruitKitty.png")
        .button("TrashyKitty\nHelped me with stuff", "icons/TrashyKitty.png")
    // .button("SUPERCALEB6\nEmotional support", "icons/custom.png")
    //  .button("Rosspaul460\nJoined and annoyed me at a random time", "icons/custom.png");

    creditsForm.show(player).then(({ selection }) => {
        switch (selection) {
            case 0:
                scriptEngine.runCommandAsync("reload");
                break;
        }
    });
}
export { openCredits }
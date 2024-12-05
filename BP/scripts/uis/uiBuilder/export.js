import uiBuilder from "../../api/uiBuilder";
import { scriptEngine } from "../../functions";
import { blossom } from "../../lib/blossomAPI";
import { ActionForm } from "../../lib/prismarinedb";
import uiManager from "../../uiManager";


uiManager.addUI("admin.uibuilder.export | admin.uibuilder.export", "Export UIs to Blossom Essentials", (player) => {
    let form = new ActionForm();
    form.title("Export UIs")
    form.button("§cBack\n§7Back to UI Builder", `textures/azalea_icons/2.png`, (player) => {
        uiManager.open(player, "admin.uibuilder.root")
    })
    for (const ui of uiBuilder.getUIs()) {
        form.button(`§b${ui.data.name}\n§7Scriptevent: ${ui.data.scriptevent}`, null, (player) => {
            console.log(JSON.stringify(ui))
            blossom.insertDocument("UIBuilderV2", {
                name: ui.data.name,
                scriptevent: ui.data.scriptevent,
                buttons: ui.data.buttons,
                subuis: {},
                layout: ui.data.layout,
                type: ui.data.type
            })
        })
    }
    form.show(player)
})
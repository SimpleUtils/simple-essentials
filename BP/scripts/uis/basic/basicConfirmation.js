import actionParser from "../../api/actionParser";
import { ActionForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI("basic.confirm | basic.confirm", "Basic Confirmation UI", (player, actionLabel, actionYes, actionNo)=>{
    let form = new ActionForm();
    form.title("Confirmation");
    form.body(actionLabel);
    form.button("§aYes", null, player=>{
        if(typeof actionYes === "function") {
            actionYes(player);
        } else if(typeof actionYes === "string") {
            actionParser.runAction(player, actionYes)
        }
    })
    form.button("§cNo", null, player=>{
        if(typeof actionNo === "function") {
            actionNo(player);
        } else if(typeof actionNo === "string") {
            actionParser.runAction(player, actionNo)
        }
    })
    form.show(player, false, (player, response)=>{})
})
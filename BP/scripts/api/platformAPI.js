import * as mc from '@minecraft/server'

class platformAPI {
    constructor() {
        this.mobile = "platform_mobile"
        this.console = "platform_console"
        this.desktop = "platform_desktop"
    }
    addConsoleTag(player) {
        player.runCommandAsync(`tag @s add ${this.console}`)
    }
    addDesktopTag(player) {
        player.runCommandAsync(`tag @s add ${this.desktop}`)
    }
    addMobileTag(player) {
        player.runCommandAsync(`tag @s add ${this.mobile}`)
    }
    clearAllPlatformTags(player) {
        player.runCommandAsync(`tag @s remove ${this.mobile}`)
        player.runCommandAsync(`tag @s remove ${this.desktop}`)
        player.runCommandAsync(`tag @s remove ${this.console}`)
    }
}

export default new platformAPI();
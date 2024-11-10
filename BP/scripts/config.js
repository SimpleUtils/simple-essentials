import * as mc from '@minecraft/server'
import * as main from './main'

let memberRankColour = "§b"

let broadcasting = mc.world.getDynamicProperty("broadcastEnabled")

let consoleBanned = mc.world.getDynamicProperty("consoleBanned")
let mobileBanned = mc.world.getDynamicProperty("mobileBanned")
let desktopBanned = mc.world.getDynamicProperty("desktopBanned")

if (consoleBanned === undefined) {
    consoleBanned = false 
}
if (consoleBanned === "true") {
    consoleBanned = true
}
if (consoleBanned === "false") {
    consoleBanned = false
}

if (mobileBanned === undefined) {
    mobileBanned = false 
}
if (mobileBanned === "true") {
    mobileBanned = true
}
if (mobileBanned === "false") {
    mobileBanned = false
}

if (desktopBanned === undefined) {
    desktopBanned = false 
}
if (desktopBanned === "true") {
    desktopBanned = true
}
if (desktopBanned === "false") {
    desktopBanned = false
}

if (broadcasting === undefined) {
    broadcasting = true 
}
if (broadcasting === "true") {
    broadcasting = true
}
if (broadcasting === "false") {
    broadcasting = false
}
let bindSystem = mc.world.getDynamicProperty("bindingSystem")

if (bindSystem === undefined) {
    bindSystem = true 
}
if (bindSystem === "true") {
    bindSystem = true
}
if (bindSystem === "false") {
    bindSystem = false
}

let platformSystem = mc.world.getDynamicProperty("platformSystem")

if (platformSystem === undefined) {
    platformSystem = true 
}
if (platformSystem === "true") {
    platformSystem = true
}
if (platformSystem === "false") {
    platformSystem = false
}
let kickMenuEnabled = mc.world.getDynamicProperty("kickMenuEnabled")

if (kickMenuEnabled === undefined) {
    kickMenuEnabled = true
}
if (kickMenuEnabled === "true") {
    kickMenuEnabled = true
}
if (kickMenuEnabled === "false") {
    kickMenuEnabled = false
}

let chatRankToggle = mc.world.getDynamicProperty("chatranks");

if (chatRankToggle === undefined) {
    chatRankToggle = true
}
if (chatRankToggle === "true") {
    chatRankToggle = true
}
if (chatRankToggle === "false") {
    chatRankToggle = false
}

let codeSystem = mc.world.getDynamicProperty("codeSystem");

if (codeSystem === undefined) {
    codeSystem = true
}
if (codeSystem === "true") {
    codeSystem = true
}
if (codeSystem === "false") {
    codeSystem = false
}

let TPASystem = mc.world.getDynamicProperty("TPASystem");

if (TPASystem === undefined) {
    TPASystem = true
}
if (TPASystem === "true") {
    TPASystem = true
}
if (TPASystem === "false") {
    TPASystem = false
}

let warpSystem = mc.world.getDynamicProperty("warpSystem");

if (warpSystem === undefined) {
    warpSystem = true
}
if (warpSystem === "true") {
    warpSystem = true
}
if (warpSystem === "false") {
    warpSystem = false
}
let banSystem = mc.world.getDynamicProperty("banSystem");

if (banSystem === undefined) {
    banSystem = true
}
if (banSystem === "true") {
    banSystem = true
}
if (banSystem === "false") {
    banSystem = false
}
let uiBuilderSystem = mc.world.getDynamicProperty("uiBuilderSystem");

if (uiBuilderSystem === undefined) {
    uiBuilderSystem = true
}
if (uiBuilderSystem === "true") {
    uiBuilderSystem = true
}
if (uiBuilderSystem === "false") {
    uiBuilderSystem = false
}


//mc.world.sendMessage(`${kickMenuEnabled}`)
//mc.world.sendMessage(`${broadcasting}`)
//mc.world.sendMessage(`${chatRankToggle}`)

function kickMenuUpdate(status) {
    kickMenuEnabled = status
    mc.world.setDynamicProperty("kickMenuEnabled", `${status}`)
}
function broadcastUpdate(status) {
    broadcasting = status
    mc.world.setDynamicProperty("broadcastEnabled", `${status}`)
}
function banUpdate(status) {
    banSystem = status
    mc.world.setDynamicProperty("banSystem", `${status}`)
}
function uiBuilderUpdate(status) {
    uiBuilderSystem = status
    mc.world.setDynamicProperty("uiBuilderSystem", `${status}`)
}
function warpUpdate(status) {
    warpSystem = status
    mc.world.setDynamicProperty("warpSystem", `${status}`)
}
function codeUpdate(status) {
    codeSystem = status
    mc.world.setDynamicProperty("codeSystem", `${status}`)
}
function bindUpdate(status) {
    bindSystem = status
    mc.world.setDynamicProperty("bindingSystem", `${status}`)
}
function TPASystemToggle(status) {
    TPASystem = status
    mc.world.setDynamicProperty("TPASystem", `${status}`)
}
function chatRanksOff() {
    mc.world.setDynamicProperty("chatranks", false)
    chatRankToggle = false
}
function chatRanksOn() {
    mc.world.setDynamicProperty("chatranks", true)
    chatRankToggle = true
}
function platformSystemUpdate(status) {
    mc.world.setDynamicProperty("platformSystem", status)
    platformSystem = status
}
function platformban_console(status) {
    mc.world.setDynamicProperty("consoleBanned", status)
    consoleBanned = status
}
function platformban_mobile(status) {
    mc.world.setDynamicProperty("mobileBanned", status)
    mobileBanned = status
}
function platformban_desktop(status) {
    mc.world.setDynamicProperty("desktopBanned", status)
    desktopBanned = status
}

// Chat rank is in main.js because yes

export { uiBuilderSystem, platformban_console, TPASystem, TPASystemToggle, platformban_desktop, platformban_mobile, mobileBanned, consoleBanned, desktopBanned, uiBuilderUpdate, platformSystem, banSystem, banUpdate, memberRankColour, kickMenuEnabled, broadcasting, broadcastUpdate, kickMenuUpdate, chatRankToggle, chatRanksOn, chatRanksOff, bindSystem, bindUpdate, warpSystem, warpUpdate, codeSystem, codeUpdate, platformSystemUpdate }
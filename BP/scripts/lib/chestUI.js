import { ActionFormData } from '@minecraft/server-ui';
import { typeIdToDataId, typeIdToID } from "./typeIds.js";

const number_of_1_16_100_items = 6;
// world.afterEvents.item
const sizes = new Map([
	['single', ['§c§h§e§s§t§2§7§r', 27]], ['small', ['§c§h§e§s§t§2§7§r', 27]],
	['double', ['§c§h§e§s§t§5§4§r', 54]], ['large', ['§c§h§e§s§t§5§4§r', 54]],
	['5', ['§c§h§e§s§t§0§5§r', 5]],
	['9', ['§c§h§e§s§t§0§9§r', 9]],
	['18', ['§c§h§e§s§t§1§8§r', 18]],
	['27', ['§c§h§e§s§t§2§7§r', 27]],
	['36', ['§c§h§e§s§t§3§6§r', 36]],
	['45', ['§c§h§e§s§t§4§5§r', 45]],
	['54', ['§c§h§e§s§t§5§4§r', 54]],
	['72', ['§c§h§e§s§t§7§2§r', 72]],
	['88', ['§c§h§e§s§t§8§8§r', 88]],
	['63', ['§c§h§e§s§t§6§3§r', 63]],
	['81', ['§c§h§e§s§t§8§1§r', 81]],
	['90', ['§c§h§e§s§t§9§0§r', 90]],
	['RW', ['§c§h§e§s§t§r§w', 9]],
]);
class ChestFormData {
	#titleText; #buttonArray; #callbackObject;
	constructor(size = 'small') {
		const sizing = sizes.get(size) ?? [`§c§h§e§s§t§s§m§a§l§l§r`, 27];
		/** @internal */
		this.#titleText = sizing[0];
		/** @internal */
		this.#buttonArray = [];
		/** @internal */
		this.#callbackObject = {};
		for (let i = 0; i < sizing[1]; i++)
			this.#buttonArray.push(['', undefined]);
		this.slotCount = sizing[1];
	}
	title(text) {
		this.#titleText += text;
		return this;
	}
	button(slot, itemName, itemDesc, iconPath, stackSize = 1, enchanted = false, callback = undefined) {
		if (callback !== undefined)
			this.#callbackObject[slot] = callback;
		const ID = typeIdToID.get(iconPath.includes(':') ? iconPath : 'minecraft:' + iconPath)
		this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName ?? ''}§r${itemDesc?.length ? `\n§r${itemDesc.join('\n§r')}` : ''}`,
		(((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (!!enchanted * 32768)) || iconPath
		]);
		return this;
	}
	pattern(pattern, key) {
		if (pattern.some(row => row.length !== 9)) return console.error(`Invalid pattern! All rows must be 9 characters long!`);
		if (pattern.length !== this.slotCount / 9) return console.error(`Invalid pattern! Expected ${this.slotCount / 9} rows, got ${pattern.length}!`);
		for (let i = 0; i < pattern.length; i++) {
			const row = pattern[i];
			for (let j = 0; j < row.length; j++) {
				const letter = row.charAt(j);
				if (key[letter]) {
					const slot = j + i * 9; // Calculate slot index
					const data = key[letter];
					const icon = key[letter].iconPath;
					const ID = typeIdToID.get(icon.includes(':') ? icon : 'minecraft:' + icon);
					if (data.callback !== undefined)
						this.#callbackObject[slot] = data.callback;
					this.#buttonArray.splice(slot, 1, [`stack#${Math.min(Math.max(data?.stackAmount ?? 1, 1) || 1, 99).toString().padStart(2, '0')}§r${data?.itemName ?? ''}§r${data?.itemDesc?.length ? `\n§r${data?.itemDesc.join('\n§r')}` : ''}`,
					(((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (!!data?.enchanted * 32768)) || icon
					])
				}
			}
		}
		return this;
	}
	range(from, to, callback = (loopIndex, slotID) => { console.warn(`No callback function provided for slot ${slotID} | ${loopIndex}!`) }, step = [1, 1]) {
		let i = 0;
		for (let y = from[1]; y <= to[1]; y += step[1]) {
			for (let x = from[0]; x <= to[0]; x += step[0]) {
				const slot = x + y * 9;
				callback(i, slot);
				i++;
			}
		}
	}
	async show(player) {
		const form = new ActionFormData()
			.title(this.#titleText);
		this.#buttonArray.forEach(button => {
			form.button(button[0], button[1]?.toString());
		})
		const r = await form.show(player);
		if (this.#callbackObject[r.selection] !== undefined)
			this.#callbackObject[r.selection](r);
		return r;
	}
}

export { ChestFormData };
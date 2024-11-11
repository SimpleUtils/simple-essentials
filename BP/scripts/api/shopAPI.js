import * as mc from "@minecraft/server"
import * as simple from "../functions"
import { prismarineDb } from "../lib/prismarinedb"
import { SegmentedStoragePrismarine } from "../prismarineDbStorages/segmented"

class shopAPI {
    constructor() {
        this.db = prismarineDb.customStorage("shopAPI", SegmentedStoragePrismarine);
    }
    createCategory(name, admin) {
        if (name.length < 2) return simple.error(`You cannot have a name under 2 letters`, admin);
        if (name.length > 7) return simple.error(`You cannot have a name over 7 letters!`, admin);
        if (this.db.findFirst({type:"CATEGORY",name:name})) return simple.error("Name must be unique", admin);
        this.db.insertDocument({
            name: name,
            type: "CATEGORY",
            createdAt: Date.now(),
            items: []
        })
    }
    getCategory(name) {
        let category = this.db.findFirst({type:"CATEGORY",name:name})
        if (!category) return false;
        return category;
    }
    getCategories() {
        let categories = this.db.findDocuments({
            type: "CATEGORY"
        })
        return categories;
    }
    deleteCategory(name, admin) {
        let category = this.getCategory(name);
        if (category === false) return simple.error(`Not a valid category`, admin);
        this.db.deleteDocumentByID(category.id);
    }
    getItemsinCategory(name, user) {
        let category = this.getCategory(name)
        if (!category) return false;
        if (!category.data.items.length > 0) return simple.error(`No items in category`, user)
        return category.data.items;
    }
    addItem(typeId, admin, categoryName, price) {
        let category = this.getCategory(categoryName)
        category.data.items.push({
            typeId,
            displayName: typeId,
            price,
            admin: admin.name
        })
        this.db.overwriteDataByID(category.id, category.data)
    }
}

export default new shopAPI();
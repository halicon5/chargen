CM.inventorySetSVC = function(aInventorySetDAT, parChar) {
	this.d = aInventorySetDAT;
	this.parChar = parChar;
	
	this.items = {};
	
	this.initialize();
}

	CM.inventorySetSVC.prototype.initialize = function() {
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.initialize = function()" );
		this.clearAllGroups();	// helps keep the groups clean as items are deleted and added.
		this.initializeInventorySvcs();
	}

	CM.inventorySetSVC.prototype.initializeInventorySvcs = function() {
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.initialize = function()" );
		if (this.d && this.d.items) {
			for (var item in this.d.items) {
				this.items[item] = new CM.inventoryItemSVC(this.d.items[item], this.parChar);
				this.assignToGroups(this.d.items[item]);
			}
		}
	}

	CM.inventorySetSVC.prototype.clearAllGroups = function() {
		for (var g in this.d.groups) {
			for (var sg in this.d.groups[g]) {
				delete this.d.groups[g][sg];
			}
			delete this.d.groups[g];
		}
	}

	CM.inventorySetSVC.prototype.addReplaceItem = function(itemName, eq, qty, writeIn, itemStats) { 
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.addReplaceItem = function(" + itemName + ", " + eq + ", " + qty + ", " + writeIn +")");	

		this.d.items[itemName] = new CM.inventoryItemDAT(itemName, eq, qty, writeIn, itemStats);
		this.items[itemName] = new CM.inventoryItemSVC(this.d.items[itemName], this.parChar);

		this.assignToGroups(this.d.items[itemName]);
	}

	CM.inventorySetSVC.prototype.addItem = CM.inventorySetSVC.prototype.addReplaceItem;
	
	CM.inventorySetSVC.prototype.removeItem = function(itemName) {
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.removeItem = function(" + itemName + ")" );
		
		this.removeFromGroups(itemName);
		
		if (this.items[itemName] && this.items[itemName].removeItem) {
			this.items[itemName].removeItem();
		}
		delete this.d.items[itemName];
		delete this.items[itemName];
	}
	
	// edit hash format: {key: newValue, key2: newValue2, and so on.}
	CM.inventorySetSVC.prototype.renameItem = function(itemName, newItemName) {
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.renameItem = function(" + itemName + ", " + newItemName + ")" );
		if (itemName && newItemName && this.d.items[itemName]) {

			this.d.items[newItemName] = this.d.items[itemName];
			this.d.items[newItemName].name = newItemName;
			this.items[newItemName] = new CM.inventoryItemSVC(this.d.items[newItemName], this.parChar);
			this.assignToGroups(this.d.items[newItemName]);
			
			this.removeItem(itemName);
		}
	}
	
	CM.inventorySetSVC.prototype.assignToGroups = function(itemDat) {
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.assignToGroups = function(itemDat)");
		// if the grouping doesn't already exist, create it
		if (itemDat.name) {
			if (!this.d.groups[itemDat.group]) {
				this.d.groups[itemDat.group] = {};
			}
	
			if (!this.d.groups[itemDat.group][itemDat.subGroup]) {
				this.d.groups[itemDat.group][itemDat.subGroup] = {};
			}
	
			this.d.groups[itemDat.group][itemDat.subGroup][itemDat.name] = true;
		}
	}
	
	CM.inventorySetSVC.prototype.removeFromGroups = function(itemName) {
		if (CM.debug) CM.log("[CALL] CM.inventorySetSVC.prototype.removeFromGroups = function(" + itemName + ")");
		if (itemName) {
			for (var g in this.d.groups) {
				for (var sg in this.d.groups[g]) {
					delete this.d.groups[g][sg][itemName];
				}
			}
		}
	}
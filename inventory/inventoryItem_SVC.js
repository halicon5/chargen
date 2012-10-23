CM.inventoryItemSVC = function(aInventoryItemDAT, parChar) {
	this.d = aInventoryItemDAT;
	this.parChar = parChar;
	
}
	
	CM.inventoryItemSVC.prototype.removeItem = function() {
		if (CM.debug) CM.log("[CALL] CM.inventoryItemSVC.prototyp.removeItem = function()" );

		delete this.d.stats;
	}
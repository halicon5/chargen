CM.inventoryItemDAT = function(itemName, eq, qty, writeIn, itemStats) {
	this.name = itemName;
	this.writeIn = writeIn;
	this.eq = eq;	// boolean whether or not the item is equippable
	this.qty = qty;
	this.stats = CM.deepCopy(itemStats); // object

	this.group = (itemStats.group) ? itemStats.group : "stuff";
	this.subGroup = (itemStats.subGroup) ? itemStats.subGroup : "stuff";
}
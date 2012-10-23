CM.armorDAT = function(aName) {
	this.name = aName;
	
	this.zones = {};
	this.zoneMods = {};
	for (var k in kantiaDefs.armorZones) {
		this.zones[k] = null;
		this.zoneMods[k] = {};
	}
	
	this.adjustments = {};
	for (var i = 0; i < kantiaDefs.armorAdjustmentTypes.length; i++) {
		this.adjustments[kantiaDefs.armorAdjustmentTypes[i]] = 0;
		this.adjustments[kantiaDefs.armorAdjustmentTypes[i] + "_adj"] = 0;
		this.adjustments[kantiaDefs.armorAdjustmentTypes[i] + "_tot"] = 0;
	}
}
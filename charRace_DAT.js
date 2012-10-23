CM.charRaceDAT = function(raceDef) {
	this.name = undefined;
	this.mods = {};

	if (raceDef) {
		this.name = (raceDef.name) ? raceDef.name : undefined;
		this.mods = (raceDef.mods) ? raceDef.mods : {};
	}
}
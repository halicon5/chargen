kantiaDefs.armorDefs = {};
// head pieces
kantiaDefs.armorDefs["Chain coif"] = new CM.armorDef( {name: "Chain coif", subGroup: "head", deflect: 0, called_shot: 20, defStaging: 5, absorb: 3, 
													damTrans: 0, bypass: 10, blockDiff: 0, init: 0,  AGL_limit: -5,
													adjusts: { AGL: -5, REF: -5, PER: -5, ranged: -5, spell: -10, psion: -20 },
													notes: "vulnerable to bludgeon"
													}
												);
kantiaDefs.armorDefs["Light helm"] = new CM.armorDef( {name: "Light helm", subGroup: "head", deflect: 5, called_shot: 30, defStaging: 5, absorb: 6, 
													damTrans: 0, bypass: 20, blockDiff: 0, init: -1,  AGL_limit: -5, 
													adjusts: { AGL: -5, REF: -5, PER: -10, ranged: -10, spell: -10, psion: -20}
													}
												);
kantiaDefs.armorDefs["Battle helm"] = new CM.armorDef( {name: "Battle helm", subGroup: "head", deflect: 5, called_shot: 40, defStaging: 10, absorb: 10, 
													damTrans: 0, bypass: 40, blockDiff: 0, init: -2,  AGL_limit: -10,
													adjusts: { AGL:  -10, REF: -10, PER: -40, ranged: -20, spell: -20, psion: -40 }
													}
												);
kantiaDefs.armorDefs["Microchain coif"] = new CM.armorDef( {name: "Microchain coif", subGroup: "head", deflect: 0, called_shot: 20, defStaging: 5, absorb: 3, 
													damTrans: 6, bypass: 10, blockDiff: 0, init: 0,  AGL_limit: 0,
													adjusts: { PER: -5, ranged: -5, spell: -5, psion: -10 },
													notes: "vulnerable to bludgeon"
													}
												);


// hand pieces
kantiaDefs.armorDefs["Leather gloves"] = new CM.armorDef( 
		{ name: "Leather gloves", subGroup: "hands", deflect: 0, called_shot: 5, defStaging: 2, absorb: 1, damTrans: 0, bypass: 5, blockDiff: 0, 
		init: 0, AGL_limit: 0,  adjusts: { spell: -5 }
													}
												);
kantiaDefs.armorDefs["Chain gloves"] = new CM.armorDef( {name: "Chain gloves", subGroup: "hands", deflect: 0, called_shot: 20, defStaging: 5, absorb: 3, 
													damTrans: 0, bypass: 5, blockDiff: 0, init: 0, AGL_limit: 0,
													adjusts: { ranged: -10, spell: -30},
													notes: "vulnerable to bludgeon, -30 AV to fine motor control with hands"
													}
												);
kantiaDefs.armorDefs["Gauntlets"] = new CM.armorDef( {name: "Gauntlets", subGroup: "hands", deflect: 0, called_shot: 30, defStaging: 8, absorb: 6, 
													damTrans: 0, bypass: 5, blockDiff: 0, init: 0, AGL_limit: 0, 
													adjusts: { ranged: -30, spell: -40 }
													}
												);
kantiaDefs.armorDefs["Microchain gloves"] = new CM.armorDef( {name: "Microchain gloves", subGroup: "hands", deflect: 0, called_shot: 20, defStaging: 5, absorb: 3, 
													damTrans: 6, bypass: 5, blockDiff: 0, init: 0, AGL_limit: 0,
													adjusts: { ranged: -10, spell: -5 },
													notes: "vulnerable to bludgeon, -5 AV to fine motor control with hands",
													mods: [ {id: "armor hands", name: "Fine control -5", mass: 1, target: ["skills.list","magicSkills.list"], subGroup: {"arcanum": 1}, adj_mod: -5, include: {"Lock Picking": 1, "First Aid": 1}  } ]
													}
												);

// leg pieces
kantiaDefs.armorDefs["Leather greaves"] = new CM.armorDef(
		{ name: "Leather greaves", subGroup: "legs", deflect: 0, called_shot: 5, defStaging: 2, absorb: 1, damTrans: 0, bypass: -10, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { } } 
		);
kantiaDefs.armorDefs["Hard leather greaves"] = new CM.armorDef(
		{ name: "Hard leather greaves", subGroup: "legs", deflect: 0, called_shot: 10, defStaging: 4, absorb: 2, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -1, AGL_limit: -5, adjusts: { AGL: -5, REF: -5 } } 
		);
kantiaDefs.armorDefs["Chain greaves"] = new CM.armorDef(
		{ name: "Chain greaves", subGroup: "legs", deflect: 0, called_shot: 20, defStaging: 5, absorb: 3, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -1, AGL_limit: -5, adjusts: { AGL: -5, REF: -5 } } 
		);
kantiaDefs.armorDefs["Scale greaves"] = new CM.armorDef(
		{ name: "Scale greaves", subGroup: "legs", deflect: 5, called_shot: 25, defStaging: 7, absorb: 4, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -2, AGL_limit: -5, adjusts: { AGL: -5, REF: -5 } } 
		);
kantiaDefs.armorDefs["Plate greaves"] = new CM.armorDef(
		{ name: "Plate greaves", subGroup: "legs", deflect: 5, called_shot: 30, defStaging: 8, absorb: 6, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -2, AGL_limit: -10, adjusts: { AGL: -10, REF: -10 } } 
		);
kantiaDefs.armorDefs["Microchain leggings"] = new CM.armorDef(
		{ name: "Microchain leggings", subGroup: "legs", deflect: 0, called_shot: 15, defStaging: 5, absorb: 3, damTrans: 6, bypass: -10, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { } } 
		);


// arm pieces
kantiaDefs.armorDefs["Leather vambrace"] = new CM.armorDef(
		{ name: "Leather vambrace", subGroup: "arms", deflect: 0, called_shot: 5, defStaging: 2, absorb: 1, damTrans: 0, bypass: -10, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { } } 
		);
kantiaDefs.armorDefs["Hard leather vambrace"] = new CM.armorDef(
		{ name: "Hard leather vambrace", subGroup: "arms", deflect: 0, called_shot: 10, defStaging: 4, absorb: 2, damTrans: 0, bypass: -10, blockDiff: 0,
		init: 0, AGL_limit: -5,  adjusts: { AGL: -5, REF: -5, spell: -5 } } 
		);
kantiaDefs.armorDefs["Chain vambrace"] = new CM.armorDef(
		{ name: "Chain vambrace", subGroup: "arms", deflect: 5, called_shot: 20, defStaging: 5, absorb: 3, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -1, AGL_limit: -5, adjusts: { AGL: -5, REF: -5, ranged: -5, spell: -5} } 
		);
kantiaDefs.armorDefs["Scale vambrace"] = new CM.armorDef(
		{ name: "Scale vambrace", subGroup: "arms", deflect: 5, called_shot: 25, defStaging: 7, absorb: 4, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -1,  AGL_limit: -5, adjusts: { AGL: -5, REF: -5, ranged: -10,  spell: -15} } 
		);
kantiaDefs.armorDefs["Plate vambrace"] = new CM.armorDef(
		{ name: "Plate vambrace", subGroup: "arms", deflect: 5, called_shot: 30, defStaging: 8, absorb: 6, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -2, AGL_limit: -10, adjusts: { AGL: -10, REF: -10, ranged: -20, spell: -20 } } 
		);
kantiaDefs.armorDefs["Microchain sleeves"] = new CM.armorDef(
		{ name: "Microchain sleeves", subGroup: "arms", deflect: 5, called_shot: 15, defStaging: 5, absorb: 3, damTrans: 6, bypass: -10, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { } } 
		);


// torso pieces
kantiaDefs.armorDefs["Leather jerkin"] = new CM.armorDef(
		{ name: "Leather jerkin", subGroup: "torso", deflect: 5, called_shot: 0, defStaging: 2, absorb: 1, damTrans: 0, bypass: -40, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { } } 
		);
kantiaDefs.armorDefs["Hard leather cuirass"] = new CM.armorDef(
		{ name: "Hard leather cuirass", subGroup: "torso", deflect: 5, called_shot: 10, defStaging: 4, absorb: 2, damTrans: 0, bypass: -40, blockDiff: 0,
		init: 0, AGL_limit: -5, adjusts: { AGL: -5, REF: -5 } } 
		);
kantiaDefs.armorDefs["Chain shirt"] = new CM.armorDef(
		{ name: "Chain shirt", subGroup: "torso", deflect: 10, called_shot: 20, defStaging: 5, absorb: 3, damTrans: 0, bypass: -40, blockDiff: 0,
		init: -2, AGL_limit: -10, adjusts: { AGL: -10, REF: -10, spell: -5 } } 
		);
kantiaDefs.armorDefs["Scale breastplate"] = new CM.armorDef(
		{ name: "Scale breastplate", subGroup: "torso", deflect: 10, called_shot: 25, defStaging: 7, absorb: 4, damTrans: 0, bypass: -40, blockDiff: 0,
		init: -2, AGL_limit: -15,  adjusts: { AGL: -15, REF: -15, spell: -15 } } 
		);
kantiaDefs.armorDefs["Breastplate"] = new CM.armorDef(
		{ name: "Breastplate", subGroup: "torso", deflect: 10, called_shot: 30, defStaging: 8, absorb: 6, damTrans: 0, bypass: -10, blockDiff: 0,
		init: -4, AGL_limit: -20, adjusts: { AGL: -20, REF: -20, ranged: -10, spell: -20 } } 
		);
kantiaDefs.armorDefs["Microchain shirt"] = new CM.armorDef(
		{ name: "Microchain shirt", subGroup: "torso", deflect: 10, called_shot: 15, defStaging: 5, absorb: 3, damTrans: 6, bypass: -10, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { } } 
		);


// shields and blockDiff gear
kantiaDefs.armorDefs["Leather bracers"] = new CM.armorDef(
		{ name: "Leather bracers", subGroup: "shield", deflect: 0, called_shot: 0, defStaging: 2, absorb: 2, damTrans: 0, bypass: 0, blockDiff: 0,
		init: 0, AGL_limit: 0, adjusts: { }, hands: 0, skillOpts: kantiaDefs.skillHashes["melee"] } 
		);
kantiaDefs.armorDefs["Reinforced bracers"] = new CM.armorDef(
		{ name: "Reinforced bracers", subGroup: "shield", deflect: 0, called_shot: 0, defStaging: 8, absorb: 6, damTrans: 0, bypass: 0, blockDiff: -5,
		init: 0, AGL_limit: 0, adjusts: { }, hands: 0, skillOpts: kantiaDefs.skillHashes["melee"] } 
		);
kantiaDefs.armorDefs["Buckler"] = new CM.armorDef(
		{ name: "Buckler", subGroup: "shield", deflect: 0, called_shot: 0, defStaging: 10, absorb: 12, damTrans: 0, bypass: 0, blockDiff: -10, attackDiff: 10,
		init: 0, AGL_limit: 0, adjusts: { }, hands: 0, skillOpts: kantiaDefs.skillHashes["melee"] } 
		);
kantiaDefs.armorDefs["Small shield"] = new CM.armorDef(
		{ name: "Small shield", subGroup: "shield", deflect: 5, called_shot: 0, defStaging: 10, absorb: 12, damTrans: 0, bypass: 0, blockDiff: -20, attackDiff: 15,
		init: 0, AGL_limit: 0, adjusts: { spell: -5 }, hands: 1, skillOpts: kantiaDefs.skillHashes["melee"] } 
		);
kantiaDefs.armorDefs["Medium shield"] = new CM.armorDef(
		{ name: "Medium shield", subGroup: "shield", deflect: 5, called_shot: 0, defStaging: 10, absorb: 16, damTrans: 0, bypass: 0, blockDiff: -30, attackDiff: 15,
		init: -1, AGL_limit: -5, adjusts: { AGL: -5, REF: -5, spell: -10 }, hands: 1, skillOpts: kantiaDefs.skillHashes["melee"] } 
		);
kantiaDefs.armorDefs["Full shield"] = new CM.armorDef(
		{ name: "Full shield", subGroup: "shield", deflect: 10, called_shot: 0, defStaging: 15, absorb: 24, damTrans: 0, bypass: 0, blockDiff: -40, attackDiff: 20,
		init: -3, AGL_limit: -15, adjusts: { AGL: -15, REF: -15, spell: -20 }, hands: 1, skillOpts: kantiaDefs.skillHashes["melee"] } 
		);




kantiaDefs.itemGroups = {};
kantiaDefs.itemGroups["armor"] = {};
kantiaDefs.itemGroups["armor"]["head"] = CM.createListByGroup(kantiaDefs.armorDefs, "name", "subGroup", "head");
kantiaDefs.itemGroups["armor"]["torso"] = CM.createListByGroup(kantiaDefs.armorDefs, "name", "subGroup", "torso");
kantiaDefs.itemGroups["armor"]["arms"] = CM.createListByGroup(kantiaDefs.armorDefs, "name", "subGroup", "arms");
kantiaDefs.itemGroups["armor"]["hands"] = CM.createListByGroup(kantiaDefs.armorDefs, "name", "subGroup", "hands");
kantiaDefs.itemGroups["armor"]["legs"] = CM.createListByGroup(kantiaDefs.armorDefs, "name", "subGroup", "legs");
kantiaDefs.itemGroups["armor"]["shield"] = CM.createListByGroup(kantiaDefs.armorDefs, "name", "subGroup", "shield");

kantiaDefs.itemGroups["melee weapons"] = {};
kantiaDefs.itemGroups["melee weapons"]["axe"] = CM.createListByGroup(kantiaDefs.meleeWeapons, "name", "subGroup", "axe");
kantiaDefs.itemGroups["melee weapons"]["chain"] = CM.createListByGroup(kantiaDefs.meleeWeapons, "name", "subGroup", "chain");
kantiaDefs.itemGroups["melee weapons"]["fist"] = CM.createListByGroup(kantiaDefs.meleeWeapons, "name", "subGroup", "fist");

kantiaDefs.itemGroups["ranged weapons"] = {};
kantiaDefs.itemGroups["ranged weapons"]["bow"] = CM.createListByGroup(kantiaDefs.rangedWeapons, "name", "subGroup", "bow");
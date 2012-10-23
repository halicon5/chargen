var ruleinc = 0; // an incrementer variable
var kantiaDefs = {};


kantiaDefs.attributes = {};
kantiaDefs.attributes.STR = {name: "STR", fullname: "Strength"};
kantiaDefs.attributes.SIZ = {name: "SIZ", fullname: "Size"};
kantiaDefs.attributes.AGL = {name: "AGL", fullname: "Agility"};
kantiaDefs.attributes.REF = {name: "REF", fullname: "Reflexes"};
kantiaDefs.attributes.CON = {name: "CON", fullname: "Constitution"};
kantiaDefs.attributes.FORT = {name: "FORT", fullname: "Fortitude"};
kantiaDefs.attributes.REA = {name: "REA", fullname: "Reasoning"};
kantiaDefs.attributes.WILL = {name: "WILL", fullname: "Willpower"};
kantiaDefs.attributes.SPIR = {name: "SPIR", fullname: "Spirit"};
kantiaDefs.attributes.PER = {name: "PER", fullname: "Perception"};

kantiaDefs.attributeOrder = ["STR", "SIZ", "AGL", "REF", "CON", "FORT", "REA", "WILL", "SPIR", "PER"];


kantiaDefs.mixTypes = new Array();
ruleinc = 0;
kantiaDefs.mixTypes[ruleinc++] = {label: "standard", mixType: "+"};
kantiaDefs.mixTypes[ruleinc++] = {label: "greatest", mixType: ">"};
kantiaDefs.mixTypes[ruleinc++] = {label: "Add 1st, Subtract 2nd", mixType: "+-"};
kantiaDefs.mixTypes[ruleinc++] = {label: "Subtract 1st, Add 2nd", mixType: "-+"};


// each iteration is a human readable/number of minutes calculation.
kantiaDefs.healing_rates = new Array();
ruleinc=0;
kantiaDefs.healing_rates[ruleinc++] = {text: "16 days", minutes: 16 * 24 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "8 days", minutes: 8 * 24 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "4 days", minutes: 4 * 24 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "2 days", minutes: 2 * 24 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "1 day", minutes: 24 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "16 hours", minutes: 16 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "8 hours", minutes: 8 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "4 hours", minutes: 4 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "2 hours", minutes: 2 * 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "1 hour", minutes: 60};
kantiaDefs.healing_rates[ruleinc++] = {text: "40 min.", minutes: 40};
kantiaDefs.healing_rates[ruleinc++] = {text: "20 min.", minutes: 20};
kantiaDefs.healing_rates[ruleinc++] = {text: "10 min.", minutes: 10};
kantiaDefs.healing_rates[ruleinc++] = {text: "5 min.", minutes: 5};
kantiaDefs.healing_rates[ruleinc++] = {text: "3 min.", minutes: 3};
kantiaDefs.healing_rates[ruleinc++] = {text: "1 min.", minutes: 1};
kantiaDefs.healing_rates[ruleinc++] = {text: "3 rounds", minutes: .5 };
kantiaDefs.healing_rates[ruleinc++] = {text: "1 round", minutes: 1/6};
kantiaDefs.healing_rates[ruleinc++] = {text: "2/round", minutes: 1/12};
kantiaDefs.healing_rates[ruleinc++] = {text: "4/round", minutes: 1/24};
kantiaDefs.healing_rates[ruleinc++] = {text: "8/round", minutes: 1/48};
kantiaDefs.healing_rates[ruleinc++] = {text: "16/round", minutes: 1/96};
kantiaDefs.healing_rates[ruleinc++] = {text: "32/round", minutes: 1/192};
kantiaDefs.healing_rates[ruleinc++] = {text: "64/round", minutes: 1/386};

kantiaDefs.armorZones = { head: "Head", torso: "Torso", arms: "Arms", legs: "Legs", hands: "Hands", shield: "Shield/Blocking"};
kantiaDefs.armorZoneOrder = ["head", "torso", "arms", "legs", "hands", "shield"];
kantiaDefs.armorAdjustmentTypes = ["AGL", "REF", "PER", "spell", "psion", "ranged", "init"];

kantiaDefs.hitZones =	[	{name: "head", label: "Head", penalty: 80, armorZone: "head", percent: 1}, 
							{name: "eyes", label: "Eyes", penalty: 100, armorZone: "head", percent: .05},
							{name: "torso", label: "Body", penalty: 0, armorZone: "torso", percent: 1},
							{name: "heart", label: "Heart", penalty: 100, armorZone: "torso", percent: 1},	
							{name: "vitals", label: "Vitals", penalty: 60, armorZone: "torso", percent: 1},
							{name: "arms", label: "Arms", penalty: 50, armorZone: "arms", percent: .25},
							{name: "hands", label: "Hands", penalty: 80, armorZone: "hands", percent: .05},
							{name: "legs", label: "Legs", penalty: 30, armorZone: "legs", percent: .3},
							{name: "knees", label: "Knees", penalty: 80, armorZone: "legs", percent: .1}
							]


kantiaDefs.modTypeDefs = {};
// these are sequencial arrays of key/value sets, key being the data field and the value being the set() function
kantiaDefs.modTypeDefs.attribute = [ {mod: "setAttribMod"}, {adj_mod: "setAttribMod"}, {AV_mod: "setAttribMod"} ]; 
kantiaDefs.modTypeDefs.skill = [ {mod: "setModifier"}, {adj_mod: "setAdjMod"}, {cost: "setCost"} ];
kantiaDefs.modTypeDefs.defense = [ {DR_mod: "setDRmod"}, {staging_mod: "setStagingMod"}, {absorb_mod: "setAbsorbMod"}, {damTrans_mod: "setDamTransMod"} ];
kantiaDefs.modTypeDefs.discipline = [ {mod: "setModifier"}, {cost: "setCost"} ];
kantiaDefs.modTypeDefs.spell = [ {mod: "setModifier"}, {cost: "setCost"} ];
kantiaDefs.modTypeDefs.armorAdjust = [ {adj_adj: "setAdjAdj"} ];

kantiaDefs.modTypeDefs.defense = [ {natSize_mod: "setDefMod"}, {natAgl_mod: "setDefMod"}, {natDeflect_mod: "setDefMod"}, {natStaging_mod: "setDefMod"},
									{natAbsorb_mod: "setDefMod"}, {natDamTrans_mod: "setDefMod"}, {shieldDef_mod: "setDefMod"},
									{base_mod: "setDefMod"}, {armorDef_mod: "setDefMod"}, {noAgl_mod: "setNoAglMod"}, {still_mod: "setStillMod"}, {touch_mod: "setTouchMod"} ]
kantiaDefs.modTypeDefs.hitZone = [ {calledShot_mod: "setValue"}, {staging_mod: "setValue"}, {absorb_mod: "setValue"}, {damTrans_mod: "setValue"} ];
kantiaDefs.modTypeDefs.masteries = [ {rank_mod: "setRankMod"} ];
kantiaDefs.modTypeDefs.combatStats = [ {init_mod: "setValue"} ];
kantiaDefs.modTypeDefs.combatAV = [ {damage_mod: "setValue"}, {offStaging_mod: "setValue"}, {baseAV_mod: "setValue"}, {actAdj_mod: "setValue"},
									{sceneAdj_mod: "setValue"}, {AV1_mod: "setValue"}, {AV2_mod: "setValue"}, {AV3_mod: "setValue"}
									, {AV4_mod: "setValue"}, {AV5_mod: "setValue"}, {AV6_mod: "setValue"}];


kantiaDefs.defaultCombatActions = {};
kantiaDefs.defaultCombatActions["Unarmed"] = { name: "Unarmed", skillOpts: {"Brawling": 1, "Martial Arts": 1, "Shou Spirit Way": 1}, diff: 0, hands: "1", minActions: 2 };
kantiaDefs.defaultCombatActions["Dodge"] = { name: "Dodge", skillOpts: {"Dodge": 1}, diff: 0, hands: "1", minActions: 2 };
kantiaDefs.defaultCombatActions["Feint"] = { name: "Feint", skillOpts: {"Feint": 1}, diff: 0, hands: "1", minActions: 1 };

var testObj = kantiaDefs.defaultCombatActions["Unarmed"];

kantiaDefs.actionScenarios = {};
kantiaDefs.actionScenarios["primary"] = {standard: 0, ambidex: 0};
kantiaDefs.actionScenarios["offhand"] = {standard: -30, ambidex: 0};
kantiaDefs.actionScenarios["dual primary"] = {standard: -30, ambidex: -25};
kantiaDefs.actionScenarios["dual offhand"] = {standard: -50, ambidex: -25};
kantiaDefs.actionScenarios["two handed"] = {standard: 0, ambidex: 0};
kantiaDefs.actionScenarios["double attack"] = {standard: 0, ambidex: 0};
kantiaDefs.actionScenarios["shield bash"] = {standard: 0, ambidex: 0};
kantiaDefs.actionScenarios["shield block"] = {standard: 0, ambidex: 0};

kantiaDefs.actions = {};
kantiaDefs.actions["attack"] = {};
kantiaDefs.actions["block"] = {};
kantiaDefs.actions["dodge"] = {};
kantiaDefs.actions["disarm"] = {};


kantiaDefs.masteryTables = {};
kantiaDefs.masteryTables.staging =	new Array(0,	0,	1,	1,	1,	2,	2,	2,	3,	3,	3,	4,	4,	4,	5,	5,	5);
kantiaDefs.masteryTables.damage = 	new Array(0,	0,	0,	0,	1,	1,	1,	1,	2,	2,	2,	2,	3,	3,	3,	3,	4);
kantiaDefs.masteryTables.AV		=	new Array(0,	0,	5,	5,	10,	10,	15,	15,	20,	20,	25,	25,	30,	30,	35,	35,	40);
kantiaDefs.masteryTables.disarm	=	kantiaDefs.masteryTables.AV;
kantiaDefs.masteryTables.diffRedux	=	kantiaDefs.masteryTables.AV;
kantiaDefs.masteryTables.blockBonus	=	kantiaDefs.masteryTables.AV;
kantiaDefs.masteryTables.DRbonus	=	new Array(0,	0,	0,	0,	0,	5,	5,	5,	5,	5,	10,	10,	10,	10,	10,	15,	15);
kantiaDefs.masteryTables.goodHandRedux	= new Array(0,	0,	5,	5,	10,	10,	15,	15,	20,	20,	25,	25,	30,	30,	30,	30,	30);
kantiaDefs.masteryTables.offHandRedux	= new Array(0,	0,	5,	5,	10,	10,	15,	15,	20,	20,	25,	25,	30,	30,	35,	35,	40);
kantiaDefs.masteryTables.ambiRedux		= new Array(0,	0,	5,	5,	10,	10,	15,	15,	20,	20,	25,	25,	25,	25,	25,	25,	25);
kantiaDefs.masteryTables.dualBlock		= new Array(0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	5,	5,	10);
kantiaDefs.masteryTables.ambiBlock		= new Array(0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	5,	5,	10,	10,	15,	15);

kantiaDefs.masteryMatrix = {};
kantiaDefs.masteryMatrix.staging =	{path: "combatStats.combatAVs", modKey: "offStaging_mod", useAV: 1, useID: 1};
kantiaDefs.masteryMatrix.damage = 	{path: "combatStats.combatAVs", modKey: "damage_mod", useAV: 1, useID: 1};
kantiaDefs.masteryMatrix.disarm =	{path: "combatStats.combatAVs", modKey: "actAdj_mod", useAV: 1, useID: 1};
kantiaDefs.masteryMatrix.blockBonus = {path: "combatStats.combatAVs", modKey: "actAdj_mod", useAV: 1, useID: 1};
kantiaDefs.masteryMatrix.DRbonus =	{path: "defense", modKey: "shieldDef_mod", useAV: 0, useID: 0};
kantiaDefs.masteryMatrix.goodHandRedux = {path: "combatStats.combatAVs", modKey: "sceneAdj_mod", useAV: 1, useID: 1};
kantiaDefs.masteryMatrix.offHandRedux = kantiaDefs.masteryMatrix.goodHandRedux;
kantiaDefs.masteryMatrix.ambiRedux = kantiaDefs.masteryMatrix.goodHandRedux;
kantiaDefs.masteryMatrix.dualBlock = {path: "combatStats.combatAVs", modKey: "actAdj_mod", useAV: 1, useID: 1};
kantiaDefs.masteryMatrix.ambiBlock = kantiaDefs.masteryMatrix.dualBlock;


kantiaDefs.masteryDefs = {};
kantiaDefs.masteryDefs["Lethal Strike"] = {name: "Lethal Strike", minRank: 8, actions: {"attack":1},
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											tables: {"staging": kantiaDefs.masteryTables.staging,
													"damage": kantiaDefs.masteryTables.damage} };
kantiaDefs.masteryDefs["Disarm"] =	{name: "Disarm", minRank: 8, actions: {"disarm":1},
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											tables: {"disarm": kantiaDefs.masteryTables.disarm} };
kantiaDefs.masteryDefs["Shield Mastery"] =	{name: "Shield Mastery", minRank: 12, actions: {"block":1},
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1},
											tables:	{"blockBonus": kantiaDefs.masteryTables.blockBonus,
													"DRbonus": kantiaDefs.masteryTables.DRbonus} };
kantiaDefs.masteryDefs["Weapon Defense"] =	{name: "Weapon Defense", minRank: 12, actions: {"block":1},
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1},
											tables:	{"blockBonus": kantiaDefs.masteryTables.blockBonus,
											"DRbonus": kantiaDefs.masteryTables.DRbonus} };
kantiaDefs.masteryDefs["Two-Weapon"] =	{name: "Two-Weapon", minRank: 8, actions: { "attack": 1, "block": 1, "disarm":1 },
											scenarios: {"dual offhand":1, "two handed":1},
											tables:	{"goodHandRedux": kantiaDefs.masteryTables.goodHandRedux,
													"offHandRedux": kantiaDefs.masteryTables.offHandRedux,
													"ambiRedux": kantiaDefs.masteryTables.ambiRedux,
													"dualBlock": kantiaDefs.masteryTables.dualBlock,
													"ambiBlock": kantiaDefs.masteryTables.ambiBlock} };
kantiaDefs.masteryDefs["Mult Attack x2"] = {name: "Mult Attack x2", minRank: 8, actions: { "attack": 1, "block": 1, "disarm":1, "dodge":1 }, 
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											};
kantiaDefs.masteryDefs["Mult Attack x3"] = {name: "Mult Attack x3", minRank: 8, actions: { "attack": 1, "block": 1, "disarm":1, "dodge":1 },
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											};
kantiaDefs.masteryDefs["Mult Attack x4"] = {name: "Mult Attack x4", minRank: 8, actions: { "attack": 1, "block": 1, "disarm":1, "dodge":1 },
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											};
kantiaDefs.masteryDefs["Mult Attack x5"] = {name: "Mult Attack x5", minRank: 8, actions: { "attack": 1, "block": 1, "disarm":1, "dodge":1 },
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											};
kantiaDefs.masteryDefs["Mult Attack x6"] = {name: "Mult Attack x6", minRank: 8, actions: { "attack": 1, "block": 1, "disarm":1, "dodge":1 },
											scenarios: {"primary": 1, "offhand":1, "dual primary":1, "dual offhand":1, "two handed":1, "double attack":1, "shield bash":1},
											};


kantiaDefs.commonOneHandMeleeMasteryOpts = new Array("Lethal Strike",
													"Disarm", "Shield", "Weapon Defense", "Two-Weapon",
													"Mult Attack x2", "Mult Attack x3", "Mult Attack x3",
													"Mult Attack x4", "Mult Attack x5", "Mult Attack x6"
													);
													
kantiaDefs.commonTwoHandMeleeMasteryOpts = new Array("Lethal Strike",
													"Disarm", "Weapon Defense",
													"Mult Attack x2", "Mult Attack x3", "Mult Attack x3",
													"Mult Attack x4", "Mult Attack x5", "Mult Attack x6"
													); 

kantiaDefs.commonOneHandRangedMasteryOpts = new Array("Lethal Strike", "Two-Weapon",
													"Mult Attack x2", "Mult Attack x3", "Mult Attack x3",
													"Mult Attack x4", "Mult Attack x5", "Mult Attack x6"
													); 
													
kantiaDefs.commonTwoHandRangedMasteryOpts = new Array("Lethal Strike", 
													"Mult Attack x2", "Mult Attack x3", "Mult Attack x3",
													"Mult Attack x4", "Mult Attack x5", "Mult Attack x6"
													);




kantiaDefs.meleeWeapons = {};
kantiaDefs.meleeWeapons["Brass knuckles"] = new CM.meleeWeaponDef( 
	{ 	name: "Brass knuckles", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:5, weapCat: "fist", stagingSource: "STR", offStaging: 4, offStaging2: 4, damage: "+1", dam_type:"B", group: "melee", subGroup: "fist",
		skillOpts: {"Brawling":1, "Martial Arts":1, "Shou Spirit Way":1} }
);
kantiaDefs.meleeWeapons["Punching dagger"] = new CM.meleeWeaponDef( 
	{ 	name: "Punching dagger", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:5, weapCat: "fist", stagingSource: "STR", offStaging: 6, offStaging2: 6, damage: "+2", dam_type:"W", group: "melee", subGroup: "fist",
		skillOpts: {"Brawling":1, "Martial Arts":1, "Shou Spirit Way":1} }
);
kantiaDefs.meleeWeapons["War claws"] = new CM.meleeWeaponDef( 
	{ 	name: "War claws", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:10, blockDiff: 72, weapCat: "fist", stagingSource: "STR", offStaging: 6, offStaging2: 6, damage: "1d6", dam_type:"W", group: "melee", subGroup: "fist",
		skillOpts: {"Brawling":1, "Martial Arts":1, "Shou Spirit Way":1} }
);

kantiaDefs.meleeWeapons["Battle axe"] = new CM.meleeWeaponDef( 
	{ 	name: "Battle axe", skillName: "Battle axe", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:30, weapCat: "axe", stagingSource: "STR", offStaging: 12, offStaging2: 16, damage: "1d10+2", dam_type:"W", group: "melee", subGroup: "axe",
		skillOpts: {"Battle axe":1, "Melee Group: Axes":1, "Melee Group: Dwarven Military Set":1, "Melee Group: Primitive Set":1} }
);
kantiaDefs.meleeWeapons["Footman's pick"] = new CM.meleeWeaponDef( 
	{ 	name: "Footman's pick", skillName: "Footman's pick", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:30, weapCat: "axe", stagingSource: "STR", offStaging: 12, offStaging2: 16, damage: "2d6+1", dam_type:"W",  group: "melee", subGroup: "axe",
		skillOpts: {"Footman's pick":1, "Melee Group: Common Military Set":1} }
);
kantiaDefs.meleeWeapons["Great axe"] = new CM.meleeWeaponDef( 
	{ 	name: "Great axe", skillName: "Great axe", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonTwoHandMeleeMasteryOpts,
		hands: "2", diff:45, weapCat: "axe", stagingSource: "STR", offStaging:0, offStaging2: 20, damage: "2d6+2", dam_type:"W",  group: "melee", subGroup: "axe",
		skillOpts: {"Great axe":1, "Melee Group: Axes":1} }
);
kantiaDefs.meleeWeapons["Hand axe"] = new CM.meleeWeaponDef( 
	{ 	name: "Hand axe", skillName: "Hand axe", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1", diff:45, weapCat: "axe", stagingSource: "STR", offStaging:12, offStaging2: null, damage: "1d6+2", dam_type:"W",  group: "melee", subGroup: "axe",
		skillOpts: {"Hand axe":1, "Melee Group: Axes":1, "Melee Group: Dwarven Military Set":1, "Melee Group: Primitive Set":1, "Melee Group: Woodland Set":1} }
);
kantiaDefs.meleeWeapons["Pick-axe"] = new CM.meleeWeaponDef( 
	{ 	name: "Pick-axe", skillName: "Pick-axe", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonTwoHandMeleeMasteryOpts,
		hands: "2", diff:50, weapCat: "axe", stagingSource: "STR", offStaging:0, offStaging2: 20, damage: "2d6+3", dam_type:"W",  group: "melee", subGroup: "axe",
		skillOpts: {"Pick-axe":1} }
);
kantiaDefs.meleeWeapons["Wood axe"] = new CM.meleeWeaponDef( 
	{ 	name: "Wood axe", skillName: "Wood axe", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonTwoHandMeleeMasteryOpts,
		hands: "2", diff:30, weapCat: "axe", stagingSource: "STR", offStaging:0, offStaging2: 16, damage: "1d8+2", dam_type:"W",  group: "melee", subGroup: "axe",
		skillOpts: {"Wood axe":1, "Melee Group: Axes":1, "Melee Group: Woodland Set":1} }
);
kantiaDefs.meleeWeapons["Wood sledge"] = new CM.meleeWeaponDef( 
	{ 	name: "Wood sledge", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonTwoHandMeleeMasteryOpts,
		hands: "2", diff:40, weapCat: "axe", stagingSource: "STR", offStaging:0, offStaging2: 18, damage: "1d10+2", dam_type:"W",  group: "melee", subGroup: "axe",
		skillOpts: {"Wood axe":1, "Melee Group: Axes":1, "Melee Group: Woodland Set":1} }
);

kantiaDefs.meleeWeapons["Chain"] = new CM.meleeWeaponDef( 
	{ 	name: "Chain", skillName: "Chain", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:15, weapCat: "chain", stagingSource: "STR", offStaging: 2, offStaging2: 2, damage: "1d6", dam_type:"B",  group: "melee", subGroup: "chain",
		skillOpts: {"Chain":1, "Melee Group: Martial Arts Set":1} }
);
kantiaDefs.meleeWeapons["Dual flail"] = new CM.meleeWeaponDef( 
	{ 	name: "Dual flail", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonTwoHandMeleeMasteryOpts,
		hands: "2", diff:50, weapCat: "chain", stagingSource: "STR", offStaging: 0, offStaging2: 16, damage: "2d8+2", dam_type:"Mixed",  group: "melee", subGroup: "chain",
		skillOpts: {"Flail":1} }
);
kantiaDefs.meleeWeapons["Flail"] = new CM.meleeWeaponDef( 
	{ 	name: "Flail", skillName: "Flail", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "2", diff:40, weapCat: "chain", stagingSource: "STR", offStaging: 0, offStaging2: 16, damage: "2d8+2", dam_type:"Mixed",  group: "melee", subGroup: "chain",
		skillOpts: {"Flail":1} }
);
kantiaDefs.meleeWeapons["Hooked chain"] = new CM.meleeWeaponDef( 
	{ 	name: "Hooked chain", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:25, weapCat: "chain", stagingSource: "STR", offStaging: 4, offStaging2: 4, damage: "1d6", dam_type:"W",  group: "melee", subGroup: "chain",
		skillOpts: {"Chain":1, "Melee Group: Martial Arts Set":1} }
);
kantiaDefs.meleeWeapons["Weighted chain"] = new CM.meleeWeaponDef( 
	{ 	name: "Weighted chain", skillName: null, cost: null, att1: null, mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:15, weapCat: "chain", stagingSource: "STR", offStaging: 8, offStaging2: 8, damage: "1d8", dam_type:"W",  group: "melee", subGroup: "chain",
		skillOpts: {"Chain":1, "Melee Group: Martial Arts Set":1} }
);
kantiaDefs.meleeWeapons["Nunchaku"] = new CM.meleeWeaponDef( 
	{ 	name: "Nunchaku", skillName: "Nunchaku", cost: 3, att1: "AGL", mixtype: null, masteryOpts: kantiaDefs.commonOneHandMeleeMasteryOpts,
		hands: "1 or 2", diff:15, weapCat: "chain", stagingSource: "STR", offStaging: 0, offStaging2: 16, damage: "2d8+2", dam_type:"Mixed",  group: "melee", subGroup: "chain",
		skillOpts: {"Nunchaku":1, "Chain":1, "Melee Group: Martial Arts Set":1 } }
);


kantiaDefs.rangedWeapons = {};
kantiaDefs.rangedWeapons["Composite long bow"] = new CM.rangedWeaponDef(
	{	name: "Composite long bow", masteryOpts: kantiaDefs.commonTwoHandRangedMasteryOpts, weapCat: "bow", hands: "2", group: "ranged", subGroup: "bow",
		diff: 25, 	range: 24, rangeInc: 12, rangeDiff: 5, recoil: 0, damage: "1d10+1", stagingSource: "STR", offStaging: 12, stagingLimit: 16, dam_type: "W", failRate: 1,
		skillOpts: {"Archery":1} }
);
kantiaDefs.rangedWeapons["Recurve long bow"] = new CM.rangedWeaponDef(
	{	name: "Recurve long bow", masteryOpts: kantiaDefs.commonTwoHandRangedMasteryOpts, weapCat: "bow", hands: "2", group: "ranged", subGroup: "bow",
		diff: 30, 	range: 24, rangeInc: 12, rangeDiff: 5, recoil: 0, damage: "1d10+1", stagingSource: "STR", offStaging: 12, stagingLimit: 16, dam_type: "W", failRate: 1, 
		skillOpts: {"Archery":1} }
);
kantiaDefs.rangedWeapons["Long bow"] = new CM.rangedWeaponDef(
	{	name: "Long bow", masteryOpts: kantiaDefs.commonTwoHandRangedMasteryOpts, weapCat: "bow", hands: "2", group: "ranged", subGroup: "bow",
		diff: 25, 	range: 24, rangeInc: 12, rangeDiff: 5, recoil: 0, damage: "1d10+1", stagingSource: "STR", offStaging: 8, stagingLimit: 16, dam_type: "W",  failRate: 1,
		skillOpts: {"Archery":1} }
);
kantiaDefs.rangedWeapons["Composite short bow"] = new CM.rangedWeaponDef(
	{	name: "Composite short bow", masteryOpts: kantiaDefs.commonTwoHandRangedMasteryOpts, weapCat: "bow", hands: "2", group: "ranged", subGroup: "bow",
		diff: 20, 	range: 20, rangeInc: 10, rangeDiff: 5, recoil: 0, damage: "1d8+1", stagingSource: "STR", offStaging: 12, stagingLimit: 13, dam_type: "W",  failRate: 1,
		skillOpts: {"Archery":1} }
);
kantiaDefs.rangedWeapons["Recurve short bow"] = new CM.rangedWeaponDef(
	{	name: "Recurve short bow", masteryOpts: kantiaDefs.commonTwoHandRangedMasteryOpts, weapCat: "bow", hands: "2", group: "ranged", subGroup: "bow",
		diff: 25, 	range: 20, rangeInc: 10, rangeDiff: 5, recoil: 0, damage: "1d8+1", stagingSource: "STR", offStaging: 12, stagingLimit: 13, dam_type: "W",  failRate: 1,
		skillOpts: {"Archery":1} }
);
kantiaDefs.rangedWeapons["Short bow"] = new CM.rangedWeaponDef(
	{	name: "Short bow", masteryOpts: kantiaDefs.commonTwoHandRangedMasteryOpts, weapCat: "bow", hands: "2", group: "ranged", subGroup: "bow",
		diff: 20, 	range: 20, rangeInc: 10, rangeDiff: 5, recoil: 0, damage: "1d8+1", stagingSource: "STR", offStaging: 8, stagingLimit: 13, dam_type: "W",  failRate: 1,
		skillOpts: {"Archery":1} }
);



kantiaDefs.skillDefs = {};
// common skills
kantiaDefs.skillDefs["Spot"] = 	new CM.skillDef( {name: "Spot", group: "common",	cost: 1, att1: "PER"} );
kantiaDefs.skillDefs["Listen"] =	new CM.skillDef( {name: "Listen", group: "common",	cost: 1, att1: "PER"} );
kantiaDefs.skillDefs["Smell"] =		new CM.skillDef( {name: "Smell", group: "common",	cost: 1, att1: "PER"} );
kantiaDefs.skillDefs["Search"] =	 new CM.skillDef( {name: "Search",	group: "common", cost: 1, att1: "PER"} );
kantiaDefs.skillDefs["Resist Magic"] = new CM.skillDef( {name: "Resist Magic", group: "common", cost: 2, att1: "SPIR"} );
kantiaDefs.skillDefs["Resist Mental"] = new CM.skillDef( {name: "Resist Mental", group: "common", cost: 2, att1: "WILL"} );
kantiaDefs.skillDefs["Resist Fear"] = new CM.skillDef( {name: "Resist Fear", group: "common", cost: 2, att1: "STR", att2: "FORT", att3: "WILL", att4: "SPIR", mixtype: ">" } );
kantiaDefs.skillDefs["Concentration"] = new CM.skillDef( {name: "Concentration", group: "common", cost: 1, att1: "WILL"} );

// physical skills
kantiaDefs.skillDefs["Climbing"] = 	new CM.skillDef( {name: "Climbing",	group: "physical",	cost: 1, att1: "AGL" } );
kantiaDefs.skillDefs["Fast Draw"] = new CM.skillDef( {name: "Fast Draw", group: "physical",	cost: 2, att1: "AGL" } );
kantiaDefs.skillDefs["Gymnastics"] = new CM.skillDef( {name: "Gymnastics", group: "physical",	cost: 2, att1: "AGL" } );
kantiaDefs.skillDefs["Hide"] = 			new CM.skillDef( {name: "Hide", group: "physical", cost: 2, att1: "AGL", att2: "SIZ", mixtype: "+-" } );
kantiaDefs.skillDefs["Move Silently"] = new CM.skillDef( {name: "Move Silently", group: "physical", cost: 2, att1: "AGL", att2: "SIZ", mixtype: "+-" } );
kantiaDefs.skillDefs["Sleight of Hand"] = new CM.skillDef( {name: "Sleight of Hand",  group: "physical", cost: 2, att1: "AGL" } );
kantiaDefs.skillDefs["Speed Load"] = 	new CM.skillDef( {name: "Speed Load",  group: "physical", cost: 2, att1: "AGL" } );
kantiaDefs.skillDefs["Swimming"] = 		new CM.skillDef( {name: "Swimming",	 group: "physical", cost: 1, att1: "STR" } );

// social skills
kantiaDefs.skillDefs["Deceit"] = 			new CM.skillDef( {name: "Deceit", group: "social",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Determine Motivation"] = 	new CM.skillDef( {name: "Determine Motivation", group: "social",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Disguise"] = 			new CM.skillDef( {name: "Disguise", group: "social",	cost: 2, att1: "PER" } );
kantiaDefs.skillDefs["Information Gathering"] = 	new CM.skillDef( {name: "Information Gathering", group: "social",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Intimidation"] = 		new CM.skillDef( {name: "Intimidation", group: "social",	cost: 2, att1: "STR", att2: "WILL", mixtype: ">" } );
kantiaDefs.skillDefs["Persuasion"] = 		new CM.skillDef( {name: "Persuasion", group: "social",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Street Savvy"] = 		new CM.skillDef( {name: "Street Savvy", group: "social",	cost: 2, att1: "REA" } );

// academic/education skills
kantiaDefs.skillDefs["Alchemy"] = 			new CM.skillDef( {name: "Alchemy",  group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Appraisal"] = 		new CM.skillDef( {name: "Appraisal", group: "practical",	cost: 1, att1: "PER" } );
kantiaDefs.skillDefs["Art"] = 				new CM.skillDef( {name: "Art", group: "practical",	cost: 1, att1: "PER" } );
kantiaDefs.skillDefs["Animal Handling"] = 	new CM.skillDef( {name: "Animal Handling", group: "practical",	cost: 2, att1: "WILL" } );
kantiaDefs.skillDefs["Bowyer/Fletcher"] = 	new CM.skillDef( {name: "Bowyer/Fletcher",group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Disarm/Create Trap"] = new CM.skillDef( {name: "Disarm/Create Trap",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["First Aid"] = 		new CM.skillDef( {name: "First Aid", group: "practical",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Flora/Fauna"] = 		new CM.skillDef( {name: "Flora/Fauna", group: "practical",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Forgery"] = 			new CM.skillDef( {name: "Forgery", group: "practical",	cost: 2, att1: "PER" } );
kantiaDefs.skillDefs["Gunsmith"] = 			new CM.skillDef( {name: "Gunsmith",	group: "practical", cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Herbalism"] = 		new CM.skillDef( {name: "Herbalism", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Hunting/Fishing"] = 	new CM.skillDef( {name: "Hunting/Fishing", group: "practical",	cost: 1, att1: "PER" } );
kantiaDefs.skillDefs["Investigations"] = 	new CM.skillDef( {name: "Investigations", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Lock Picking"] = 		new CM.skillDef( {name: "Lock Picking", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Medicine"] = 			new CM.skillDef( {name: "Medicine", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Meditation"] = 		new CM.skillDef( {name: "Meditation", group: "practical",	cost: 2, att1: "WILL" } );
kantiaDefs.skillDefs["Mechanics"] = 		new CM.skillDef( {name: "Mechanics", group: "practical",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Research"] = 			new CM.skillDef( {name: "Research", group: "practical",	cost: 1, att1: "REA" } );
kantiaDefs.skillDefs["Siege Weapon"] = 		new CM.skillDef( {name: "Siege Weapon", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Smithing"] = 			new CM.skillDef( {name: "Smithing", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Spellcraft"] = 		new CM.skillDef( {name: "Spellcraft", group: "practical",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Survival"] = 			new CM.skillDef( {name: "Survival", group: "practical",	cost: 2, att1: "PER" } );
kantiaDefs.skillDefs["Tracking"] = 			new CM.skillDef( {name: "Tracking", group: "practical",	cost: 2, att1: "PER" } );

// common combat skills
kantiaDefs.skillDefs["Dodge"] = 	new CM.skillDef( {name: "Dodge", group: "common combat",	cost: 2, att1: "REF" } );
kantiaDefs.skillDefs["Feint"] = 	new CM.skillDef( {name: "Feint", group: "common combat",	cost: 2, att1: "REA" } );
kantiaDefs.skillDefs["Throw"] = 	new CM.skillDef( {name: "Throw", group: "common combat",	cost: 2, att1: "AGL" } );
kantiaDefs.skillDefs["Brawling"] = 	new CM.skillDef( {name: "Brawling", group: "common combat", subGroup: "unarmed",	cost: 2, att1: "AGL" } );

// unarmed martial skills
kantiaDefs.skillDefs["Martial Arts"] = new CM.skillDef( {name: "Martial Arts", group: "combat", cost: 3, att1: "AGL", subGroup: "unarmed" } );
kantiaDefs.skillDefs["Shou Spirit Way"] = new CM.skillDef( {name: "Shou Spirit Way", group: "combat", cost: 4, att1: "SPIR", subGroup: "unarmed" } );

// single weapon skills not tied to a specific weapon and not dynamically generated.
kantiaDefs.skillDefs["Archery"] =	new CM.skillDef( {name: "Archery",  group: "combat", subGroup: "ranged", cost: 3, att1: "AGL" } );
kantiaDefs.skillDefs["Crossbow"] =	new CM.skillDef( {name: "Crossbow",  group: "combat", subGroup: "ranged", cost: 3, att1: "PER" } );
kantiaDefs.skillDefs["Rifle"] =		new CM.skillDef( {name: "Rifle",  group: "combat", subGroup: "ranged", cost: 3, att1: "PER" } );
kantiaDefs.skillDefs["Handgun"] =	new CM.skillDef( {name: "Handgun",  group: "combat", subGroup: "ranged", cost: 3, att1: "AGL"} );

kantiaDefs.skillDefs["Elemental Form"] = new CM.skillDef( { name: "Elemental Form", group: "combat", subGroup: "shapeshift", cost: 3, att1: "SPIR", att1: "WILL" } );
kantiaDefs.skillDefs["Animal Form"] = new CM.skillDef( { name: "Animal Form", group: "combat", subGroup: "shapeshift", cost: 3, att1: "SPIR", att1: "AGL" } );

// dynamically generate individual weapon skills based on weapon definitions.  This helps keep names in sync
for (var weap in kantiaDefs.meleeWeapons) {
	if (kantiaDefs.meleeWeapons[weap].skillName && !kantiaDefs.skillDefs[kantiaDefs.meleeWeapons[weap].skillName]) {
		kantiaDefs.skillDefs[kantiaDefs.meleeWeapons[weap].skillName] = new CM.skillDef( kantiaDefs.meleeWeapons[weap] );
		kantiaDefs.skillDefs[kantiaDefs.meleeWeapons[weap].skillName].group = "combat";
		kantiaDefs.skillDefs[kantiaDefs.meleeWeapons[weap].skillName].subGroup = kantiaDefs.meleeWeapons[weap].weapCat;
	}
}


kantiaDefs.disciplineDefs = {};
kantiaDefs.disciplineDefs["Abjuration"] = new CM.skillDef( {name: "Abjuration", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Arcane"] = new CM.skillDef( {name: "Arcane", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Conjuring"] = new CM.skillDef( {name: "Conjuring", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Divination"] = new CM.skillDef( {name: "Divination", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Enchantment"] = new CM.skillDef( {name: "Enchantment", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Holy"] = new CM.skillDef( {name: "Holy", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Illusion"] = new CM.skillDef( {name: "Illusion", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Nature"] = new CM.skillDef( {name: "Nature", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Necromancy"] = new CM.skillDef( {name: "Necromancy", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Profane"] = new CM.skillDef( {name: "Profane", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Shadowmancy"] = new CM.skillDef( {name: "Shadowmancy", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Transmutation"] = new CM.skillDef( {name: "Transmutation", group: "disciplines", subGroup: "arcanum", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Air"] = new CM.skillDef( {name: "Air", group: "disciplines", subGroup: "elemental", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Earth"] = new CM.skillDef( {name: "Earth", group: "disciplines", subGroup: "elemental", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Fire"] = new CM.skillDef( {name: "Fire", group: "disciplines", subGroup: "elemental", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Thunder"] = new CM.skillDef( {name: "Thunder", group: "disciplines", subGroup: "elemental", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Water"] = new CM.skillDef( {name: "Water", group: "disciplines", subGroup: "elemental", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Manipulation"] = new CM.skillDef( {name: "Manipulation", group: "disciplines", subGroup: "manipulation", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Shou Spirit Way"] = new CM.skillDef( {name: "Shou Spirit Way", group: "disciplines", subGroup: "manipulation", cost: 4, att1: "SPIR" } );
kantiaDefs.disciplineDefs["Channelling"] = new CM.skillDef( {name: "Channelling", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Domination"] = new CM.skillDef( {name: "Domination", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Electrokinesis"] = new CM.skillDef( {name: "Electrokinesis", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Photokinesis"] = new CM.skillDef( {name: "Photokinesis", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Pyrokinesis"] = new CM.skillDef( {name: "Pyrokinesis", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Sensitivity"] = new CM.skillDef( {name: "Sensitivity", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Telekinesis"] = new CM.skillDef( {name: "Telekinesis", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Telepathy"] = new CM.skillDef( {name: "Telepathy", group: "disciplines", subGroup: "psychic", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Avian"] = new CM.skillDef( {name: "Avian", group: "disciplines", subGroup: "shuri", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Feline"] = new CM.skillDef( {name: "Feline", group: "disciplines", subGroup: "shuri", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Lupine"] = new CM.skillDef( {name: "Lupine", group: "disciplines", subGroup: "shuri", cost: 4, att1: "WILL" } );
kantiaDefs.disciplineDefs["Reptilian"] = new CM.skillDef( {name: "Reptilian", group: "disciplines", subGroup: "shuri", cost: 4, att1: "WILL" } );


kantiaDefs.magicSkillDefs = {};
// dynamically generate individual casting skills based on discipline definitions.  This helps keep names in sync
for (var discp in kantiaDefs.disciplineDefs) {
	if (kantiaDefs.disciplineDefs[discp].name) {
		kantiaDefs.magicSkillDefs[discp + ": Casting"] = new CM.skillDef( kantiaDefs.disciplineDefs[discp] );
		kantiaDefs.magicSkillDefs[discp + ": Casting"].name = discp + ": Casting";
		kantiaDefs.magicSkillDefs[discp + ": Casting"].group = "casting";
	}
}
kantiaDefs.magicSkillDefs["Ethereal Accuracy"] = new CM.skillDef( {name:"Ethereal Accuracy", group: "magic utility", cost: 4, att1: "WILL" } );
kantiaDefs.magicSkillDefs["Countering: WILLPOWER"] = new CM.skillDef( {name:"Countering: WILLPOWER", group: "magic utility", subGroup: "countering", cost: 3, att1: "SPIR" } );
kantiaDefs.magicSkillDefs["Countering: SPIRIT"] = new CM.skillDef( {name:"Countering: SPIRIT", group: "magic utility", subGroup: "countering", cost: 3, att1: "WILL" } );

kantiaDefs.skillGroups = {};
kantiaDefs.skillHashes = {};
kantiaDefs.skillGroups["common"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "common");
kantiaDefs.skillGroups["physical"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "physical");
kantiaDefs.skillGroups["social"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "social");
kantiaDefs.skillGroups["practical"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "practical");
kantiaDefs.skillGroups["common combat"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "common combat");
// melee weapon groups
kantiaDefs.skillGroups["combat"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "combat");
kantiaDefs.skillGroups["unarmed"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "combat", "subGroup", "unarmed");
kantiaDefs.skillGroups["ranged"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "combat", "subGroup", "ranged");
kantiaDefs.skillGroups["axe"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "combat", "subGroup", "axe");
kantiaDefs.skillGroups["chain"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "combat", "subGroup", "chain");
kantiaDefs.skillGroups["shapeshift"] = CM.createListByGroup(kantiaDefs.skillDefs, "name", "group", "combat", "subGroup", "shapeshift");
kantiaDefs.skillGroups["melee"] = [];
kantiaDefs.skillGroups["melee"] = kantiaDefs.skillGroups["melee"].concat( ["Brawling"], kantiaDefs.skillGroups["unarmed"], kantiaDefs.skillGroups["axe"],
										kantiaDefs.skillGroups["chain"], kantiaDefs.skillGroups["shapeshift"]
										);
kantiaDefs.skillHashes["melee"] = CM.createBitHash(kantiaDefs.skillGroups["melee"]);

kantiaDefs.magicGroups = {};
kantiaDefs.magicGroups["disciplines"] = CM.createListByGroup(kantiaDefs.disciplineDefs, "name", "group", "disciplines");
kantiaDefs.magicGroups["casting"] = CM.createListByGroup(kantiaDefs.magicSkillDefs, "name", "group", "casting");
kantiaDefs.magicGroups["magic utility"] = CM.createListByGroup(kantiaDefs.magicSkillDefs, "name", "group", "magic utility");
kantiaDefs.magicGroups["arcanum"] = CM.createListByGroup(kantiaDefs.disciplineDefs, "name", "group", "disciplines", "subGroup", "arcanum");
kantiaDefs.magicGroups["elemental"] = CM.createListByGroup(kantiaDefs.disciplineDefs, "name", "group", "disciplines", "subGroup", "elemental");
kantiaDefs.magicGroups["manipulation"] = CM.createListByGroup(kantiaDefs.disciplineDefs, "name", "group", "disciplines", "subGroup", "manipulation");
kantiaDefs.magicGroups["shuri"] = CM.createListByGroup(kantiaDefs.disciplineDefs, "name", "group", "disciplines", "subGroup", "shuri");
kantiaDefs.magicGroups["psychic"] = CM.createListByGroup(kantiaDefs.disciplineDefs, "name", "group", "disciplines", "subGroup", "psychic");

// dynamically generate collections of skills based on attribute name;  Used for update lists.
kantiaDefs.attributeSkills = {};
kantiaDefs.attributeMagicSkills = {};

//CM.createAttributeSkillList = function(indexList, source, target) {
CM.createAttributeSkillList(kantiaDefs.attributeOrder, kantiaDefs.skillDefs, kantiaDefs.attributeSkills);
CM.createAttributeSkillList(kantiaDefs.attributeOrder, kantiaDefs.magicSkillDefs, kantiaDefs.attributeMagicSkills);

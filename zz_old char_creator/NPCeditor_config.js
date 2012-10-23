/******************************
objNameSort is a config utility function that will automatically
alphabetize arrays containing objects with a name property.
*******************************/
function objNameSort(a, b) {
	if (a.name && b.name) {
	
	}
}

var ainc = 0; // array incrementer used only during config

var NPC_ATTRIB_LIST = new Array();
NPC_ATTRIB_LIST[0] = "STR";
NPC_ATTRIB_LIST[1] = "SIZ";
NPC_ATTRIB_LIST[2] = "AGL";
NPC_ATTRIB_LIST[3] = "REF";
NPC_ATTRIB_LIST[4] = "CON";
NPC_ATTRIB_LIST[5] = "FORT";
NPC_ATTRIB_LIST[6] = "REA";
NPC_ATTRIB_LIST[7] = "WILL";
NPC_ATTRIB_LIST[8] = "SPIR";
NPC_ATTRIB_LIST[9] = "PER";


var NPC_HEALING_RATES = new Array();
ainc=0;
NPC_HEALING_RATES[ainc++] = "16 days";
NPC_HEALING_RATES[ainc++] = "8 days";
NPC_HEALING_RATES[ainc++] = "4 days";
NPC_HEALING_RATES[ainc++] = "2 days";
NPC_HEALING_RATES[ainc++] = "1 day";
NPC_HEALING_RATES[ainc++] = "16 hours";
NPC_HEALING_RATES[ainc++] = "8 hours";
NPC_HEALING_RATES[ainc++] = "4 hours";
NPC_HEALING_RATES[ainc++] = "2 hours";
NPC_HEALING_RATES[ainc++] = "1 hour";
NPC_HEALING_RATES[ainc++] = "40 min.";
NPC_HEALING_RATES[ainc++] = "20 min.";
NPC_HEALING_RATES[ainc++] = "10 min.";
NPC_HEALING_RATES[ainc++] = "5 min.";
NPC_HEALING_RATES[ainc++] = "3 min.";
NPC_HEALING_RATES[ainc++] = "1 min.";
NPC_HEALING_RATES[ainc++] = "3 rounds";
NPC_HEALING_RATES[ainc++] = "1 round";
NPC_HEALING_RATES[ainc++] = "2/round";
NPC_HEALING_RATES[ainc++] = "4/round";
NPC_HEALING_RATES[ainc++] = "8/round";
NPC_HEALING_RATES[ainc++] = "16/round";
NPC_HEALING_RATES[ainc++] = "32/round";
NPC_HEALING_RATES[ainc++] = "64/round";



var NPC_SKILL_LIST = new Array();
var ATT1 = 3;
var ATT2 = 4;
ainc = 0;
NPC_SKILL_LIST[ainc++] = ["Spot", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Listen", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Smell", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Search", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Resist Magic", 2, 0, "SPIR"];
NPC_SKILL_LIST[ainc++] = ["Resist Mental", 2, 0, "WILL"];
NPC_SKILL_LIST[ainc++] = ["Resist Fear", 2, 0, "WILL", "STR", ">"];
NPC_SKILL_LIST[ainc++] = ["Concentration", 1, 0, "WILL"];

NPC_SKILL_LIST[ainc++] = ["Climbing", 1, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Fast Draw", 2, 0, "REF"];
NPC_SKILL_LIST[ainc++] = ["Gymnastics", 2, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Hide", 2, 0, "AGL", "SIZ", "+-"];
NPC_SKILL_LIST[ainc++] = ["Move Silently", 2, 0, "AGL", "SIZ", "+-"];
NPC_SKILL_LIST[ainc++] = ["Sleight of Hand", 2, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Speed Load", 2, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Swimming", 1, 0, "STR"];

NPC_SKILL_LIST[ainc++] = ["Deceit", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Determine Motivation", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Disguise", 2, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Information Gathering", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Intimidation", 2, 0, "STR", "WILL", ">"];
NPC_SKILL_LIST[ainc++] = ["Persuasion", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Street Savvy", 2, 0, "REA"];

NPC_SKILL_LIST[ainc++] = ["Alchemy", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Appraisal", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Art", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Animal Handling", 2, 0, "WILL"];
NPC_SKILL_LIST[ainc++] = ["Bowyer/Fletcher", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Disarm/Create Trap", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["First Aid", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Flora/Fauna", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Forgery", 2, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Gunsmith", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Herbalism", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Hunting/Fishing", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Investigations", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Lock Picking", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Medicine", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Meditation", 2, 0, "WILL"];
NPC_SKILL_LIST[ainc++] = ["Mechanics", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Research", 1, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Siege Weapon", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Smithing", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Spellcraft", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Survival", 1, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Tracking", 2, 0, "PER"];

NPC_SKILL_LIST[ainc++] = ["Dodge", 2, 0, "REF"];
NPC_SKILL_LIST[ainc++] = ["Feint", 2, 0, "REA"];
NPC_SKILL_LIST[ainc++] = ["Throw", 2, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Brawling", 2, 0, "AGL"];

NPC_SKILL_LIST[ainc++] = ["Martial Arts", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Shou Spirit Way", 4, 0, "SPIR"];

NPC_SKILL_LIST[ainc++] = ["Archery", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Crossbow", 3, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Rifle", 3, 0, "PER"];
NPC_SKILL_LIST[ainc++] = ["Battle axe", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Footman's pick", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Great axe", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Hand axe", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Footman's Pick", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Pick-axe", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Wood axe", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Chain", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Flail", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Nunchaku", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Heavy club", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Light club", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Medium club", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Sledge hammer", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["War hammer", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Butcher knife", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Dagger", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Mace", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Glaive", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Halberd", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Spear", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Naginata", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Scythe", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Staff", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Bastard sword", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Broadsword", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Cane sword", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Cavalry saber", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Claymore", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Falchion", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Greatsword", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Katana", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Long sword", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Nodachi", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Rapier", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Scimitar", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Short sword", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Tulwar", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Wakizashi", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Kama", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Whip", 3, 0, "AGL"];

NPC_SKILL_LIST[ainc++] = ["Melee Group: Simple Weapons", 3, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Common Swords", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Heavy Swords", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Light Swords", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Exotic Blades", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Axes", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Bludgeons", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Primitive Set", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Polearms", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Common Military Set", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Martial Arts Set", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Dwarven Military Set", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Shou Set", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Melee Group: Woodland Set", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Ranged Group: Bows/Crossbows", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Ranged Group: Handguns", 4, 0, "AGL"];
NPC_SKILL_LIST[ainc++] = ["Ranged Group: Rifles", 4, 0, "AGL"];



NPC_COMMON_SKILLS = ["Spot", "Listen", "Smell", "Search", "Resist Magic", "Resist Mental", "Resist Fear", "Concentration"];
NPC_PHYSICAL_SKILLS = ["Climbing", "Fast Draw", "Gymnastics", "Hide", "Move Silently", "Sleight of Hand", "Speed Load", "Swimming"];
NPC_SOCIAL_SKILLS = ["Deceit", "Determine Motivation", "Disguise", "Information Gathering", "Intimidation", "Persuasion", "Street Savvy"];
NPC_EDUCATION_SKILLS = ["Alchemy", "Appraisal", "Art", "Animal Handling", "Bowyer/Fletcher", "Disarm/Create Trap", "First Aid",
						"Flora/Fauna", "Forgery", "Gunsmith", "Herbalism", "Hunting/Fishing", "Investigations", "Lock Picking",
						"Medicine", "Meditation", "Mechanics", "Research", "Siege Weapon", "Smithing", "Spellcraft", "Survival", "Tracking"];
NPC_COMMON_COMBAT = ["Dodge", "Feint", "Throw", "Brawling"];
NPC_WEAPON_SKILLS = ["Martial Arts", "Shou Spirit Way", "Archery", "Crossbow", "Rifle",
					"Battle axe", "Footman's Pick", "Great axe", "Hand axe", "Pick-axe", "Wood axe", "Wood sledge",
					"Chain", "Dual flail", "Flail", "Hooked chain", "Nunchaku", "Weighted chain",
					"Cane", "Crowar", "Heavy club", "Le pip", "Light club", "Medium club",
					"Claw hammer", "Sledge hammer", "War hammer",
					"Butcher knife", "Dagger",
					"Mace",
					"Glaive", "Halberd", "Spear", "Naginata", "Scythe", "Staff",
					"Claymore", "Falchion", "Greatsword", "Katana", "Longsword", "Nadochi", "Rapier", "Scimitar", "Short sword", "Tulwar", "Wakizashi",
					"Kama", "Whip"];
NPC_WEAPON_GROUPS = ["Melee Group: Simple Weapons", "Melee Group: Common Swords", "Melee Group: Heavy Swords", "Melee Group: Light Swords",
					"Melee Group: Exotic Blades", "Melee Group: Axes", "Melee Group: Bludgeons", "Melee Group: Primitive Set", "Melee Group: Polearms", 
					"Melee Group: Common Military Set", "Melee Group: Dwarven Military Set", "Melee Group: Shou Set", "Melee Group: Woodland Set"];
NPC_WEAPON_SKILLS.sort();
NPC_WEAPON_GROUPS.sort();


ainc = 0;
var NPC_MELEE_WEAPONS = new Array();
NPC_MELEE_WEAPONS[ainc++] = { name: "Brass knuckles", hands: "1 or 2", diff:0, staging: "+4", damage: "+1", dam_type:"B", skills: ["Brawling", "Martial Arts", "Shou Spirit Way"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Punching dagger", hands: "1 or 2", diff: 5, staging: "+6", damage: "+2", dam_type:"W", skills: ["Brawling", "Martial Arts", "Shou Spirit Way"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "War claws", hands: "1 or 2", diff: 10, staging: "+6", damage: "1d6", dam_type:"W", skills: ["Brawling", "Martial Arts", "Shou Spirit Way"]};

NPC_MELEE_WEAPONS[ainc++] = { name: "Battle axe", hands: "1 or 2", diff: 30, staging: "+12/+16", damage: "1d10+2", dam_type:"W", skills: ["Battle axe", "Melee Group: Axes", "Melee Group: Dwarven Military Set", "Melee Group: Primitive Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Footman's pick", hands: "1 or 2", diff: 30, staging: "+12/+16", damage: "2d6+1", dam_type:"W", skills: ["Footman's pick", "Melee Group: Common Military Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Great axe", hands: "2", diff: 45, staging: "+20", damage: "2d6+2", dam_type:"W", skills: ["Great axe", "Melee Group: Axes"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Hand axe", hands: "1", diff: 20, staging: "+12", damage: "1d6+2", dam_type:"W", skills: ["Hand axe", "Melee Group: Axes", "Melee Group: Dwarven Military Set", "Melee Group: Primitive Set", "Melee Group: Woodland Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Pick-axe", hands: "2", diff: 50, staging: "+20", damage: "2d6+3", dam_type:"W", skills: ["Pick-axe"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Wood axe", hands: "2", diff: 30, staging: "+12", damage: "1d8+2", dam_type:"W", skills: ["Wood axe", "Melee Group: Axes", "Melee Group: Woodland Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Wood sledge", hands: "2", diff: 40, staging: "+16", damage: "1d10+2", dam_type:"W", skills: ["Wood axe", "Melee Group: Axes"]};

NPC_MELEE_WEAPONS[ainc++] = { name: "Chain", hands: "1 or 2", diff: 15, staging: "+2/+2", damage: "1d6", dam_type:"B", skills: ["Chain", "Melee Group: Martial Arts Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Dual flail", hands: "2", diff: 50, staging: "+16", damage: "2d8+2", dam_type:"Mixed", skills: ["Flail"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Flail", hands: "1 or 2", diff: 40, staging: "+12/+16", damage: "2d8+2", dam_type:"Mixed", skills: ["Flail"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Hooked chain", hands: "1 or 2", diff: 25, staging: "+4/+4", damage: "1d6", dam_type:"W", skills: ["Chain", "Melee Group: Martial Arts Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Nunchaku", hands: "1 or 2", diff: 15, staging: "+4/+4", damage: "1d6", dam_type:"B", skills: ["Nunchaku", "Chain", "Melee Group: Martial Arts Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Weighted chain", hands: "1 or 2", diff: 15, staging: "+8/+8", damage: "1d8", dam_type:"B", skills: ["Chain", "Melee Group: Martial Arts Set"]};

NPC_MELEE_WEAPONS[ainc++] = { name: "Cane", hands: "1 or 2", diff: 5, staging: "+2/+6", damage: "1d6", dam_type:"B", skills: ["Light club", "Medium club", "Melee Group: Simple Weapons", "Melee Group: Bludgeons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Crowbar", hands: "1 or 2", diff: 15, staging: "+8/+12", damage: "1d8", dam_type:"B", skills: ["Medium club", "Melee Group: Simple Weapons", "Melee Group: Bludgeons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Heavy club", hands: "2", diff: 20, staging: "+12", damage: "1d8+3", dam_type:"B", skills: ["Heavy club",  "Melee Group: Bludgeons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Le pip", hands: "1", diff: 10, staging: "+6", damage: "1d6+1", dam_type:"B", skills: ["Light club", "Medium club", "Melee Group: Simple Weapons", "Melee Group: Bludgeons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Light club", hands: "1", diff: 10, staging: "+6", damage: "1d6", dam_type:"B", skills: ["Light club", "Medium Club", "Melee Group: Simple Weapons", "Melee Group: Bludgeons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Medium club", hands: "1 or 2", diff: 15, staging: "+8/+12", damage: "1d8", dam_type:"B", skills: ["Medium club", "Heavy club", "Melee Group: Simple Weapons", "Melee Group: Bludgeons"]};

NPC_MELEE_WEAPONS[ainc++] = { name: "Claw hammer", hands: "1", diff: 15, staging: "+8", damage: "1d8", dam_type:"B or W", skills: ["Footman's pick", "Melee Group: Simple Weapons", "Melee Group: Bludgeons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Sledge hammer", hands: "2", diff: 40, staging: "+20", damage: "2d8", dam_type:"B", skills: ["Sledge hammer"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "War hammer", hands: "1", diff: 15, staging: "+8", damage: "2d6", dam_type:"B", skills: ["War hammer",  "Melee Group: Bludgeons", "Melee Group: Dwarven Military Set"]};

NPC_MELEE_WEAPONS[ainc++] = { name: "Butcher knife", hands: "1", diff: 20, staging: "+6", damage: "1d8", dam_type:"W", skills: ["Melee Group: Simple Weapons", "Hand axe"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Dagger", hands: "1", diff: 10, staging: "+4", damage: "1d6", dam_type:"W", skills: ["Dagger", "Melee Group: Simple Weapons", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set", "Melee Group: Common Swords", "Melee Group: Light Swords", "Melee Group: Exotic Blades", "Melee Group: Primitive Set", "Melee Group: Martial Arts Set", "Melee Group: Shou Set", "Melee Group: Woodland Set"]};

NPC_MELEE_WEAPONS[ainc++] = { name: "Heavy mace", hands: "1 or 2", diff: 30, staging: "+12/+16", damage: "2d8", dam_type:"B", skills: ["Mace", "Melee Group: Simple Weapons", "Melee Group: Bludgeons", "Melee Group: Primitive Set", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Light mace", hands: "1", diff: 15, staging: "+8", damage: "1d10+1", dam_type:"B", skills: ["Mace", "Melee Group: Simple Weapons", "Melee Group: Bludgeons", "Melee Group: Primitive Set", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Light morning star", hands: "1", diff: 20, staging: "+8", damage: "2d6", dam_type:"Mixed", skills: ["Mace", "Melee Group: Simple Weapons", "Melee Group: Bludgeons", "Melee Group: Primitive Set", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Morning star", hands: "1 or 2", diff: 30, staging: "+12/+16", damage: "2d8", dam_type:"Mixed", skills: ["Mace", "Melee Group: Simple Weapons", "Melee Group: Bludgeons", "Melee Group: Primitive Set", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set"]};


NPC_MELEE_WEAPONS[ainc++] = { name: "Bayonette", hands: "2", diff: 15, staging: "+10", damage: "1d6+1", dam_type:"W", skills: ["Spear", "Melee Group: Simple Weapons", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set", "Melee Group: Woodland Set", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Glaive", hands: "2", diff: 15, staging: "+8", damage: "1d8+1", dam_type:"B or W", skills: ["Glaive", "Staff", "Naginata", "Melee Group: Common Military Set", "Melee Group: Martial Arts Set", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Halberd", hands: "2", diff: 30, staging: "+10", damage: "2d6+1", dam_type:"W", skills: ["Halberd", "Melee Group: Dwarven Military Set", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Long spear", hands: "1 or 2", diff: 25, staging: "+12/+14", damage: "2d6", dam_type:"W", skills: ["Spear", "Melee Group: Polearms", "Melee Group: Primitive Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Naginata", hands: "2", diff: 15, staging: "+8", damage: "1d8+1", dam_type:"B or W", skills: ["Staff", "Glaive", "Naginata", "Melee Group: Martial Arts Set", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Naginata, double", hands: "2", diff: 25, staging: "+8", damage: "1d8+1", dam_type:"W", skills: ["Glaive", "Staff", "Naginata", "Melee Group: Martial Arts Set", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Pike", hands: "1 or 2", diff: 20, staging: "+8/+8", damage: "2d6", dam_type:"W", skills: ["Spear", "Melee Group: Simple Weapons", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set", "Melee Group: Woodland Set", "Melee Group: Polearms", "Melee Group: Primitive Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Ranseur", hands: "2", diff: 25, staging: "+16", damage: "2d6", dam_type:"W", skills: ["Spear", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Scythe", hands: "2", diff: 40, staging: "+12", damage: "2d8", dam_type:"W", skills: ["Scythe"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Short spear", hands: "1 or 2", diff: 20, staging: "+8/+10", damage: "1d10+1", dam_type:"W", skills: ["Spear", "Melee Group: Simple Weapons", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set", "Melee Group: Woodland Set", "Melee Group: Polearms", "Melee Group: Primitive Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Staff", hands: "2", diff: 10, staging: "+8", damage: "1d8", dam_type:"B", skills: ["Staff", "Glaive", "Naginata", "Melee Group: Martial Arts Set", "Melee Group: Polearms"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Trident", hands: "1 or 2", diff: 25, staging: "+12/+16", damage: "1d10+1", dam_type:"W", skills: ["Spear", "Melee Group: Polearms"]};


NPC_MELEE_WEAPONS[ainc++] = { name: "Bastard sword", hands: "1 or 2", diff: 25, staging: "+8/+12", damage: "2d6", dam_type:"W", skills: ["Bastard sword", "Katana", "Melee Group: Common Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Broadsword", hands: "1 or 2", diff: 30, staging: "+12/+16", damage: "2d6", dam_type:"W", skills: ["Broadsword", "Melee Group: Common Swords", "Melee Group: Heavy Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Cane sword", hands: "1", diff: 20, staging: "+8", damage: "1d8+1", dam_type:"W", skills: ["Short sword", "Rapier", "Melee Group: Light Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Cavalry sabre", hands: "1", diff: 15, staging: "+8", damage: "1d8+1", dam_type:"W", skills: ["Short sword", "Wakizashi", "Melee Group: Common Swords", "Melee Group: Light Swords", "Melee Group: Simple Weapons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Claymore", hands: "2", diff: 40, staging: "+20", damage: "2d8", dam_type:"W", skills: ["Greatsword", "Claymore", "Nodachi", "Melee Group: Heavy Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Falchion", hands: "2", diff: 30, staging: "+16", damage: "1d10+1", dam_type:"W", skills: ["Falchion", "Melee Group: Exotic Blades", "Melee Group: Heavy Swords", "Melee Group: Shou Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Greatsword", hands: "2", diff: 40, staging: "+20", damage: "2d8", dam_type:"W", skills: ["Greatsword", "Claymore", "Nodachi", "Melee Group: Heavy Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Katana", hands: "1 or 2", diff: 25, staging: "+8/+12", damage: "2d6", dam_type:"W", skills: ["Bastard sword", "Katana", "Melee Group: Exotic Blades"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Long sword", hands: "1 or 2", diff: 20, staging: "+8/+12", damage: "1d10+1", dam_type:"W", skills: ["Long sword", "Melee Group: Common Swords", "Melee Group: Common Military Set", "Melee Group: Light Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Nodachi", hands: "2", diff: 40, staging: "+20", damage: "2d8", dam_type:"W", skills: ["Greatsword", "Claymore", "Nodachi", "Melee Group: Heavy Swords", "Melee Group: Exotic Blades"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Rapier", hands: "1", diff: 20, staging: "+8", damage: "1d8+2", dam_type:"W", skills: ["Rapier", "Melee Group: Light Swords"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Scimitar", hands: "1 or 2", diff: 20, staging: "+12/+16", damage: "1d8+1", dam_type:"W", skills: ["Scimitar", "Melee Group: Exotic Blades", "Melee Group: Shou Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Short sword", hands: "1", diff: 15, staging: "+8", damage: "1d8+1", dam_type:"W", skills: ["Short sword", "Wakizashi", "Melee Group: Common Swords", "Melee Group: Dwarven Military Set", "Melee Group: Common Military Set", "Melee Group: Woodland Set", "Melee Group: Light Swords", "Melee Group: Simple Weapons"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Wakizashi", hands: "1", diff: 15, staging: "+8", damage: "1d8+1", dam_type:"W", skills: ["Short sword", "Wakizashi",  "Melee Group: Exotic Blades"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Tulwar", hands: "1 or 2", diff: 30, staging: "+12/+16", damage: "2d6", dam_type:"W", skills: ["Tulwar", "Melee Group: Exotic Blades", "Melee Group: Heavy Swords", "Melee Group: Shou Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Kama", hands: "1", diff: 15, staging: "+8", damage: "1d8", dam_type:"W", skills: ["Kama",  "Melee Group: Martial Arts Set"]};
NPC_MELEE_WEAPONS[ainc++] = { name: "Whip", hands: "1", diff: 20, staging: "+0", damage: "1d3-1", dam_type:"W", skills: ["Whip"]};



// define melee weapon subgroups
NPC_WEAPONS_MISC = ["Brass knuckles", "War claws", "Kama", "Whip"];
NPC_WEAPONS_AXES = ["Battle axe", "Great axe", "Hand axe", "Pick-axe", "Wood axe", "Wood sledge"];
NPC_WEAPONS_CHAINS = ["Chain", "Dual flail", "Flail", "Hooked chain", "Nunchaku", "Weighted chain"];
NPC_WEAPONS_CLUBS = ["Cane", "Crowbar", "Heavy club", "Le pip", "Light club", "Medium club"];
NPC_WEAPONS_HAMMERS = ["Claw hammer", "Sledge hammer", "War hammer"];
NPC_WEAPONS_KNIVES = ["Butcher knife", "Dagger", "Punching dagger"];
NPC_WEAPONS_MACES = ["Heavy mace", "Light mace", "Light morning star", "Morning star"];
NPC_WEAPONS_POLEARMS = ["Bayonette", "Glaive", "Halberd", "Long spear", "Naginata", "Naginata, double", "Pike", "Ranseur", "Scythe", "Short spear", "Staff", "Trident"];
NPC_WEAPONS_SWORDS = ["Bastard sword", "Broadsword", "Cane sword", "Cavalry sabre", "Claymore", "Falchion", "Greatsword", "Katana", "Long sword", "Nodachi", "Rapier", "Scimitar", "Short sword", "Wakizashi", "Tulwar"];



NPC_RANGED_BOWS = ["Long bow", "Long bow, composite", "Long bow, recurve", "Short bow", "Short bow, composite", "Short bow, recurve"];
NPC_RANGED_CROSSBOWS = ["Hand crossbow", "Hand crossbow, repeating", "Heavy crossbow", "Light crossbow", "Repeating crossbow"];
NPC_RANGED_THROWN = ["Dagger", "Javelin", "Long spear", "Short spear", "Shurikan"];

ainc = 0;
var NPC_RANGED_WEAPONS = new Array();
NPC_RANGED_WEAPONS[ainc++] = { name: "Long bow", 			range:"24(+12)", hands: 2, diff: 25, diff_inc: 5, recoil: 0, staging:"+8 (16 STR limit)", damage: "1d10+1", dam_type:"W", failure: 1, ammo_type: "arrow", ammo_cap: "n/a", ROF: 2, skills: ["Archery"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Long bow, composite",	range:"24(+12)", hands: 2, diff: 25, diff_inc: 5, recoil: 0, staging:"+12 (16 STR limit)", damage: "1d10+1", dam_type:"W", failure: 1, ammo_type: "arrow", ammo_cap: "n/a", ROF: 2, skills: ["Archery"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Long bow, recurve",	range:"24(+12)", hands: 2, diff: 30, diff_inc: 5, recoil: 0, staging:"+16 (16 STR limit)", damage: "1d10+1", dam_type:"W", failure: 1, ammo_type: "arrow", ammo_cap: "n/a", ROF: 2, skills: ["Archery"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Short bow", 			range:"20(+10)", hands: 2, diff: 20, diff_inc: 5, recoil: 0, staging:"+8 (13 STR limit)", damage: "1d8+1", dam_type:"W", failure: 1, ammo_type: "arrow", ammo_cap: "n/a", ROF: 2, skills: ["Archery"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Short bow, composite",range:"20(+10)", hands: 2, diff: 20, diff_inc: 5, recoil: 0, staging:"+12 (13 STR limit)", damage: "1d8+1", dam_type:"W", failure: 1, ammo_type: "arrow", ammo_cap: "n/a", ROF: 2, skills: ["Archery"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Short bow, recurve",	range:"20(+10)", hands: 2, diff: 25, diff_inc: 5, recoil: 0, staging:"+16 (13 STR limit)", damage: "1d8+1", dam_type:"W", failure: 1, ammo_type: "arrow", ammo_cap: "n/a", ROF: 2, skills: ["Archery"]};

NPC_RANGED_WEAPONS[ainc++] = { name: "Hand crossbow",	range:"8(+4)", hands: 1, diff: 15, diff_inc: 5, recoil: 0, staging:"18", damage: "1d6+1", dam_type:"W", failure: 1, ammo_type: "dart", ammo_cap: 1, ROF: 1, skills: ["Crossbow", "Handgun"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Hand crossbow, repeating",	range:"8(+4)", hands: 1, diff: 15, diff_inc: 5, recoil: 5, staging:"18", damage: "1d6+1", dam_type:"W", failure: 5, ammo_type: "dart", ammo_cap: 6, ROF: 6, skills: ["Crossbow", "Handgun"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Heavy crossbow",	range:"30(+15)", hands: 1, diff: 30, diff_inc: 5, recoil: 0, staging:"28", damage: "2d8+2", dam_type:"W", failure: 1, ammo_type: "bolt", ammo_cap: 1, ROF: 1, skills: ["Crossbow"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Light crossbow",	range:"20(+10)", hands: 1, diff: 20, diff_inc: 5, recoil: 0, staging:"22", damage: "1d8+2", dam_type:"W", failure: 1, ammo_type: "bolt", ammo_cap: 1, ROF: 1, skills: ["Crossbow"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Repeating crossbow",	range:"20(+10)", hands: 1, diff: 20, diff_inc: 5, recoil: 0, staging:"22", damage: "1d8+2", dam_type:"W", failure: 5, ammo_type: "bolt", ammo_cap: 6, ROF: 6, skills: ["Crossbow"]};


NPC_RANGED_WEAPONS[ainc++] = { name: "Dagger", 	range:"4(+2)", hands: 1, diff: 10, diff_inc: 5, recoil: 0, staging:"+4", damage: "1d6", dam_type:"W", failure: 0, ammo_type: "", ammo_cap: "", ROF: 4, skills: ["Throw"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Javelin", range:"6(+3)", hands: 1, diff: 20, diff_inc: 5, recoil: 0, staging:"+10", damage: "1d10+1", dam_type:"W", failure: 0, ammo_type: "", ammo_cap: "", ROF: 3, skills: ["Throw"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Long spear", range:"4(+2)", hands: 1, diff: 25, diff_inc: 5, recoil: 0, staging:"+12", damage: "2d6", dam_type:"W", failure: 0, ammo_type: "", ammo_cap: "", ROF: 2, skills: ["Throw"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Short spear", range:"4(+2)", hands: 1, diff: 20, diff_inc: 5, recoil: 0, staging:"+8", damage: "1d10+1", dam_type:"W", failure: 0, ammo_type: "", ammo_cap: "", ROF: 2, skills: ["Throw"]};
NPC_RANGED_WEAPONS[ainc++] = { name: "Shurikan", range:"4(+2)", hands: 1, diff: 10, diff_inc: 5, recoil: 0, staging:"+4", damage: "1d6", dam_type:"W", failure: 0, ammo_type: "", ammo_cap: "", ROF: 6, skills: ["Throw"]};




NPC_ARMOR_TORSO = [ "Leather jerkin", "Leather cuirass", "Chain shirt", "Scale breastplate", "Breastplate", "Microchain shirt"];
NPC_ARMOR_HANDS = ["Leather gloves", "Chain gloves", "Gauntlets", "Microchain gloves"];
NPC_ARMOR_LEGS = [ "Leather greaves", "Hard leather greaves", "Chain greaves", "Scale greaves", "Plate greaves", "Microchain leggings"];
NPC_ARMOR_ARMS = ["Leather vambrace", "Hard leather vambrace", "Chain vambrace", "Scale vambrace", "Plate vambrace", "Microchain sleeves"];
NPC_ARMOR_HEAD = [ "Chain coif", "Light helm", "Battle helm", "Microchain coif"];
NPC_ARMOR_SHIELDS = ["Leather bracers", "Reinforced bracers", "Buckler", "Small shield", "Medium shield", "Full shield"];
NPC_ARMOR_NATURAL = ["Ogre", "Troll", "Lizardman", "Gatorman"];

ainc = 0;
var NPC_ARMOR = new Array();

// hand zone
NPC_ARMOR[ainc++] = {name: "Leather gloves", 		deflect: 0, called_shot: 5, staging: 2, absorb: 1, ballistic: 0, bypass: -5, blocking: 0, 		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: -5, pen_psion: 0,	 	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Chain gloves", 			deflect: 0, called_shot: 20, staging: 5, absorb: 3, ballistic: 0, bypass: -5, blocking: 0, 		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: -30, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Gauntlets", 			deflect: 0, called_shot: 30, staging: 8, absorb: 6, ballistic: 0, bypass: -5, blocking: 0,	 	pen_init: 0, pen_ranged: -30, pen_per: 0, pen_aglref: 0, pen_spell: -40, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Microchain gloves", 	deflect: 0, called_shot: 20, staging: 5, absorb: 3, ballistic: 6, bypass: -5, blocking: 0, 		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: -5, pen_psion: 0,	 	bonus_agl: 0};

// leg zone
NPC_ARMOR[ainc++] = {name: "Leather greaves", 		deflect: 0, called_shot: 5, staging: 2, absorb: 1, ballistic: 0, bypass: -10, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Hard leather greaves", 	deflect: 0, called_shot: 10, staging: 4, absorb: 2, ballistic: 0, bypass: -10, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Chain greaves", 		deflect: 0, called_shot: 20, staging: 5, absorb: 3, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: -1, pen_ranged: 0, pen_per: 0, pen_aglref: -5, pen_spell: 0, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Scale greaves", 		deflect: 5, called_shot: 25, staging: 7, absorb: 4, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: -2, pen_ranged: 0, pen_per: 0, pen_aglref: -5, pen_spell: 0, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Plate greaves", 		deflect: 5, called_shot: 30, staging: 8, absorb: 6, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: -2, pen_ranged: 0, pen_per: 0, pen_aglref: -10, pen_spell: 0, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Microchain leggings", 	deflect: 0, called_shot: 15, staging: 5, absorb: 3, ballistic: 6, bypass: -10, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,		bonus_agl: 0};

// arms/shoulders zone
NPC_ARMOR[ainc++] = {name: "Leather vambrace", 		deflect: 0, called_shot: 5, staging: 2, absorb: 1, ballistic: 0, bypass: -10, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Hard leather vambrace", deflect: 5, called_shot: 10, staging: 4, absorb: 2, ballistic: 0, bypass: -10, blocking: 0,		pen_init: -1, pen_ranged: 0, pen_per: 0, pen_aglref: -5, pen_spell: -5, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Chain vambrace", 		deflect: 5, called_shot: 20, staging: 5, absorb: 3, ballistic: 0, bypass: -5, blocking: 0,		pen_init: -1, pen_ranged: -5, pen_per: 0, pen_aglref: -5, pen_spell: -5, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Scale vambrace", 		deflect: 5, called_shot: 25, staging: 7, absorb: 4, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: -1, pen_ranged: -10, pen_per: 0, pen_aglref: -5, pen_spell: -15, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Plate vambrace", 		deflect: 5, called_shot: 30, staging: 8, absorb: 6, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: -2, pen_ranged: -20, pen_per: 0, pen_aglref: -10, pen_spell: -20, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Microchain sleeves", 	deflect: 5, called_shot: 15, staging: 5, absorb: 3, ballistic: 6, bypass: -10, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,		bonus_agl: 0};

// torso zone
NPC_ARMOR[ainc++] = {name: "Leather jerkin", 		deflect: 5, called_shot: 0, staging: 2, absorb: 1, ballistic: 0, bypass: -40, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Leather cuirass", 		deflect: 5, called_shot: 10, staging: 2, absorb: 1, ballistic: 0, bypass: -40, blocking: 0,		pen_init: -1, pen_ranged: 0, pen_per: 0, pen_aglref: -5, pen_spell: 0, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Chain shirt", 			deflect: 10, called_shot: 20, staging: 5, absorb: 3, ballistic: 0, bypass: -40, blocking: 0,	pen_init: -2, pen_ranged: 0, pen_per: 0, pen_aglref: -10, pen_spell: -5, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Scale breastplate", 	deflect: 10, called_shot: 25, staging: 7, absorb: 4, ballistic: 0, bypass: -40, blocking: 0,	pen_init: -2, pen_ranged: 0, pen_per: 0, pen_aglref: -15, pen_spell: -15, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Breastplate", 			deflect: 10, called_shot: 30, staging: 8, absorb: 6, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: -4, pen_ranged: -10, pen_per: 0, pen_aglref: -20, pen_spell: -20, pen_psion: 0,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Microchain shirt", 		deflect: 10, called_shot: 15, staging: 5, absorb: 3, ballistic: 6, bypass: -10, blocking: 0,	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 	bonus_agl: 0};

// head zone
NPC_ARMOR[ainc++] = {name: "Chain coif", 			deflect: 0, called_shot: 20, staging: 5, absorb: 3, ballistic: 0, bypass: -10, blocking: 0, 	pen_init: 0, pen_ranged: -5, pen_per: -5, pen_aglref: -5, pen_spell: -10, pen_psion: -20,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Light helm", 			deflect: 5, called_shot: 30, staging: 5, absorb: 6, ballistic: 0, bypass: -20, blocking: 0, 	pen_init: -1, pen_ranged: -10, pen_per: -10, pen_aglref: -5, pen_spell: -10, pen_psion: -20,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Battle helm", 			deflect: 5, called_shot: 40, staging: 10, absorb: 10, ballistic: 0, bypass: -40, blocking: 0, 	pen_init: -2, pen_ranged: -20, pen_per: -40, pen_aglref: -10, pen_spell: -20, pen_psion: -40,	bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Microchain coif",		deflect: 0, called_shot: 20, staging: 5, absorb: 3, ballistic: 6, bypass: -10, blocking: 0, 	pen_init: 0, pen_ranged: -5, pen_per: -5, pen_aglref: 0, pen_spell: -5, pen_psion: -10,	 	bonus_agl: 0};

// shield zone
NPC_ARMOR[ainc++] = {name: "Leather bracers", 		deflect: 0, called_shot: 5, staging: 2, absorb: 2, ballistic: 0, bypass: 0, blocking: 0,		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Reinforced bracers", 	deflect: 0, called_shot: 20, staging: 8, absorb: 6, ballistic: 0, bypass: 0, blocking: 5, 		pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Buckler", 				deflect: 0, called_shot: 0, staging: 10, absorb: 12, ballistic: 0, bypass: 0, blocking: 10, 	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Small shield", 			deflect: 5, called_shot: 0, staging: 10, absorb: 12, ballistic: 0, bypass: 0, blocking: 20, 	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Medium shield", 		deflect: 5, called_shot: 0, staging: 10, absorb: 16, ballistic: 0, bypass: 0, blocking: 30, 	pen_init: -1, pen_ranged: 0, pen_per: 0, pen_aglref: -5, pen_spell: -10, pen_psion: 0,	 bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Full shield", 			deflect: 10, called_shot: 0, staging: 15, absorb: 24, ballistic: 0, bypass: 0, blocking: 40, 	pen_init: -3, pen_ranged: 0, pen_per: 0, pen_aglref: -15, pen_spell: -20, pen_psion: 0,	 bonus_agl: 0};


// natural armor
NPC_ARMOR[ainc++] = {name: "Ogre", 					deflect: 5, called_shot: 0, staging: 0, absorb: 2, ballistic: 0, bypass: 0, blocking: 0, 	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 5};
NPC_ARMOR[ainc++] = {name: "Troll", 				deflect: 5, called_shot: 0, staging: 0, absorb: 1, ballistic: 0, bypass: 0, blocking: 0, 	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 5};
NPC_ARMOR[ainc++] = {name: "Lizardman", 			deflect: 5, called_shot: 0, staging: 0, absorb: 2, ballistic: 0, bypass: 0, blocking: 0, 	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 0};
NPC_ARMOR[ainc++] = {name: "Gatorman", 				deflect: 10, called_shot: 0, staging: 0, absorb: 3, ballistic: 0, bypass: 0, blocking: 0, 	pen_init: 0, pen_ranged: 0, pen_per: 0, pen_aglref: 0, pen_spell: 0, pen_psion: 0,	 bonus_agl: 0};






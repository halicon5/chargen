kantiaDefs.race = {};

kantiaDefs.race["None"] = {	type: "Race", name: "None", mods: {} }

kantiaDefs.race["Human"] = { type: "Race",
							 name: "Human",
							 mods: {
							 		"Race:PsychicAptitude": {
							 			id: "Race",
							 			label: "+5 AV bonus to psionic ability",
							 			mass: true,
										subGroup: {"psychic":1},
							 			target: "magicSkills.list",
							 			mod: 0, adj_mod: 5, mult: 0,
							 			desc: "Human racial trait"
							 			}
									}
							}

kantiaDefs.race["Dwarf"] = { type: "Race",
							 name: "Dwarf",
							 mods: {	
									"Race:MagicResist": {id: "Race",
										target: "skills.list.Resist Magic",
										label: "Resist Magic +10 AV",
										mod: 0, adj_mod: 10, mult: 0,
										desc: "Dwarven Racial Trait"
										}
							 		,"Race:AGL": {id: "Race",
										target: "attributes.AGL",
										label: "AGL -2",
										mod: -2, adj_mod: 0, mult: 0,
										desc: "Dwarven racial trait"
										}
									,"Race:CON": {id: "Race",
										target: "attributes.CON",
										label: "CON +2",
										mod: 2, adj_mod: 0, mult: 0,
										desc: "Dwarven racial trait" 
										}
									,"Race:FORT": {id: "Race",
										target: "attributes.FORT",
										label: "FORT +2",
										mod: 2, adj_mod: 0, mult: 0,
										desc: "Dwarven racial trait"
										}
									,"Race:SPIR": {id: "Race",
										target: "attributes.SPIR",
										label: "SPIR -2",
										mod: -2, adj_mod: 0, mult: 0,
										desc: "Dwarven racial trait" 
										}
									, "Race:MagicDisc": { id: "Race",
										mass: true,
										target: "disciplines.list",
										subGroup: {"arcanum":1, "elemental":1},
										except: {"Faith": 1},
										label: "Arcanum and elemental magic disciplines -2",
										mod: -2, adj_mod: 0, mult: 0,
										desc: "Dwarven racial trait"
										}
									, "Race:MagicCasting": { id: "Race",
										mass: true,
										target: "magicSkills.list",
										except: {"Faith": 1},
										attribs: {"SPIR":1},
										label: "-10 AV to Spirit based magic skills",
										mod: 0, adj_mod: -10, mult: 0,
										desc: "Dwarven racial trait"
										}
									}
								
							}

kantiaDefs.race["Rom-shur"] = { type: "Race",
							 name: "Rom-shur",
							 mods: {	
							 		"Race:AGL": {id: "Race",
										target: "attributes.AGL",
										label: "AGL +2",
										mod: 2, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait"
										}
									,"Race:STR": {id: "Race",
										target: "attributes.STR",
										label: "STR -2",
										mod: -2, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait"
										}
									,"Race:SIZ": {id: "Race",
										target: "attributes.SIZ",
										label: "SIZ -2",
										mod: -2, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait"
										}
									,"Race:FORT": {id: "Race",
										target: "attributes.FORT",
										label: "FORT +2",
										mod: 2, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait"
										}
									,"Race:SPIR": {id: "Race",
										target: "attributes.SPIR",
										label: "SPIR +2",
										mod: 2, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait" 
										}
									, "Race:PsychicDisc": { id: "Race",
										mass: true,
										target: "disciplines.list",
										subGroup: {"psychic":1},
										label: "Psychic disciplines -1",
										mod: -1, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait"
										}
									, "Race:ArcanumDisc": { id: "Race",
										mass: true,
										target: "disciplines.list",
										subGroup: {"arcanum":1},
										label: "Arcanum disciplines +1",
										mod: 1, adj_mod: 0, mult: 0,
										desc: "Rom-shur racial trait"
										}
									, "Race:PsychicCasting": { id: "Race",
										mass: true,
										target: "magicSkills.list",
										subGroup: {"psychic": 1},
										label: "-5 AV to all psychic skills",
										mod: 0, adj_mod: -5, mult: 0,
										desc: "Rom-shur racial trait"
										}
									, "Race:ArcanumCasting": { id: "Race",
										mass: true,
										target: "magicSkills.list",
										subGroup: {"arcanum": 1},
										label: "+5 AV to all arcanum skills",
										mod: 0, adj_mod: 5, mult: 0,
										desc: "Rom-shur racial trait"
										}
									, "Race:Deflect": { id: "Race", 
										target: "defense",
										natAbsorb_mod: 2 }
									}
								
							}


kantiaDefs.raceOrder = new Array(kantiaDefs.race["None"], kantiaDefs.race["Human"], kantiaDefs.race["Dwarf"], kantiaDefs.race["Rom-shur"]);

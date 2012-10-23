/*
	this.name = (def.name) ? def.name : null;

	this.trait = (def.trait) ? def.trait : 0;
	this.flaw = (def.flaw) ? def.flaw : 0;
	this.merit = (def.merit) ? def.merit : 0;
	
	this.HC = (def.HC) ? def.HC : 0;
	this.xpCost = (def.xpCost) ? def.xpCost : 0;
	
	this.mult = (def.mult) ? def.mult : 0;
	this.reqIdent = (def.reqIdent) ? def.reqIdent : 0;
	this.reqDetails = (def.reqDetails) ? def.reqDetails : 0;
	
	
	this.desc = (def.desc) ? def.desc : "";
	this.summ = (def.summ) ? def.summ : "";
	this.mods = (def.mods) ? def.mods : {};
*/

kantiaDefs.traitHCs = {};
kantiaDefs.traitHCs["Addiction - Mild"] = { name: "Addiction - Mild",
											reqIdent: 1,
											trait: true,
											flaw: 2,
											mult: true,
											summ: "",
											traitGroup: {"Mental": 1},
											desc: "Most mild addictions must be \"fixed\" one or two times per week or else the character suffers withdrawal symptoms. The penalty if the character misses a fix is -10 AV penalty to all skill tests. A mildly addicted character suffers a WIL(100) test to attempt to resist the objects of their addiction if tempted with them. Note, addictions are almost always impossible to break, and even if they are are kicked, the difficulty to resist temptation is always present. A character with this flaw spends at least 5% of their income on this addiction."
										};
kantiaDefs.traitHCs["Addiction - Moderate"] = { name: "Addiction - Moderate",
											reqIdent: 1,
											trait: true,
											flaw: 4,
											mult: true,
											summ: "",
											traitGroup: {"Mental": 1},
											desc: "Most fixes must happen at least once every other day. The penalty if the character misses a fix is a -20 AV penalty to all skill tests. Moderately addicted characters suffer a WIL(125) test to attempt to resist the objects of their addiction. A character with this flaw will spend at least 10% of their income on the addiction."
										};
kantiaDefs.traitHCs["Addiction - Severe"] = { name: "Addiction - Severe",
											reqIdent: 1,
											trait: true,
											flaw: 8,
											mult: true,
											summ: "",
											traitGroup: {"Mental": 1},
											desc: "Fixes must happen at least once per day, and usually more often. Penalties will gradually work up to a -40 AV penalty to all skills if a whole day passes without a fix.  Severely addicted characters suffer a WIL(150) test to attempt to resist the objects of their addiction. A character with this trait will spend at least 25% of their income on the addiction."
										};
kantiaDefs.traitHCs["Adrenaline Control"] = { name: "Adrenaline Control",
											trait: true,
											merit: 4,
											HC: true,
											summ: "",
											traitGroup: {"Mental": 1},
											desc: "Whenever the character chooses, she can induce an adrenaline surge which will increase STR, REF, and WIL (for the purposes of resisting mind affecting abilities and effects ) by +4 points. While under the effects of an adrenaline rush, she gains a bonus to pain/stun threshold of +20. Inducing an adrenaline surge requires one full round of concentration and costs 5 STAM. For every round (10 seconds) that the character uses this ability, she will spend an additional 2 STAM points. A character can choose to initiate this ability up to twice per day, but never more frequently."
										};


kantiaDefs.traitHCs["Ambidexterity"] =	{ 	name: "Ambidexterity",
											trait: true,
											merit: 2,
											HC: true,
											xpCost: 40,
											traitGroup: {"Physical": 1},
											HCGroup: {"Agility/Reflex": 1},
											desc: "Significantly reduces the penalties of off-hand and dual weapon use.",
										};

kantiaDefs.traitHCs["Animal Animosity"] =	{ 	name: "Animal Animosity",
											trait: true,
											flaw: 2,
											traitGroup: {"Misc": 1},
											desc: "For whatever reason it is, the character has the inherent ability to really irritate animals. Animals not accustomed to that character will not tolerate the character's presence and will either flee, attack or make lots of noise. The character receives a -10 AV penalty to all animal handling and animal training skill tests.",
											mods: [ {id: "Trait: Animal Animosity", target: "skills.list.Animal Handling", adj_mod: -10} ]
										};



kantiaDefs.traitGroups = {};
kantiaDefs.HCgroups = {};
for (var thcs in kantiaDefs.traitHCs) {
	if (kantiaDefs.traitHCs[thcs].traitGroup) {
		var tg = kantiaDefs.traitHCs[thcs].traitGroup;
		for (var grp in tg) {
			if (!kantiaDefs.traitGroups[grp]) {
				kantiaDefs.traitGroups[grp] = [];
			}
			kantiaDefs.traitGroups[grp].push(thcs);			
		}
	}
	
	if (kantiaDefs.traitHCs[thcs].HCGroup) {
		var hcg = kantiaDefs.traitHCs[thcs].HCGroup;
		for (var grp in hcg) {
			if (!kantiaDefs.HCgroups[grp]) {
				kantiaDefs.HCgroups[grp] = [];
			}
			kantiaDefs.HCgroups[grp].push(thcs);
		}
	}
}

for (var tg in kantiaDefs.traitGroups) {
	kantiaDefs.traitGroups[tg].sort();
}

for (var tg in kantiaDefs.HCgroups) {
	kantiaDefs.HCgroups[tg].sort();
}

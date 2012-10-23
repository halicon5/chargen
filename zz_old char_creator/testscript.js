var myNPC = new NPCCharacter();
var activeNPC = myNPC;
//myNPC.attributes.set_all(25,12,5,7,89,11,13,15,17,19);
myNPC.update();

document.write(myNPC.getEditForm());
NPCformcontrol.display_update();
/*
var AttSet = new NPCAttributeSet(9, 15, 13, 16, 7, 8, 20, 9, 10, 3);
document.write (AttSet.getHTML());

document.write ("<br /><br />\n\n");
var CompleteSkillSet = new NPCSkillSet(true, AttSet);
CompleteSkillSet.set_skill("Spot", 12);

var CommonSkillSet = new NPCSkillSet();
var PhysicalSkillSet = new NPCSkillSet();
var SocialSkillSet = new NPCSkillSet();
var EducSkillSet = new NPCSkillSet();

var VitalStats = new NPCCalculatedStats(AttSet);
document.write (VitalStats.getHTML() + '\n\n');

CommonSkillSet.addSkillsFromList(NPC_COMMON_SKILLS, CompleteSkillSet);
PhysicalSkillSet.addSkillsFromList(NPC_PHYSICAL_SKILLS, CompleteSkillSet);
SocialSkillSet.addSkillsFromList(NPC_SOCIAL_SKILLS, CompleteSkillSet);
EducSkillSet.addSkillsFromList(NPC_EDUCATION_SKILLS, CompleteSkillSet);

document.write (CommonSkillSet.getHTML() + '\n\n');
document.write (PhysicalSkillSet.getHTML() + '\n\n');
document.write (SocialSkillSet.getHTML() + '\n\n');
document.write (EducSkillSet.getHTML() + '\n\n');
*/

/*forEach(myNPC.skills, function(att, prop) {
        document.write ("<ul>");
        document.write ("<li>" + prop + ' (' + typeof att + '):'  + att);
        forEach(att, function(x, y) {
            document.write ("<ul>");
            document.write ("<li>" + y + " (" + typeof x + "):" + x + "</li>");
            document.write ("</ul>");
            }
        );
        document.write ("</li>");
        document.write ("</ul>");
    }
);*/


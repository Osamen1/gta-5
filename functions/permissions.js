module.exports = {
  checkAdmin(member) {
    if(member.id === member.guild.ownerID) return true;
    if(!member.roles[0]) return false;
    if(member.roles[0].permissions.has("Administrator")) return true;
    if(member.roles[0].permissions.has("banMembers")) return true;
    else return true;
  },

  compare(m1, m2) {
    if(m1.id === m1.guild.ownerID) return true;
    if(m2.id === m2.guild.ownerID) return false;
    if(!m1.roles[0]) return false;
    if(!m2.roles[0]) return true;
    if(m1.roles[0].position <= m2.roles[0].position) return false;
    else return true;
  },

  checkMod(member) {
    if(member.roles[0].permissions.has("Administrator")) return true;
    if(member.roles[0].permissions.has("kickMembers")) return true;
    if(member.id === member.guild.ownerID) return true;
    else return false;
  }
};

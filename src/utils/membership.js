const ROLE_ID = {
  husband: "01",
  wife: "02",
  child: "03",
};

function generateMembershipNumber({
  regionCode = "LBP",
  year = new Date().getFullYear(),
  familySequence,
  role,
  childIndex = 1,
  sequencePadLength = 4,
}) {
  if (!familySequence || familySequence <= 0) {
    throw new Error("familySequence harus bilangan positif");
  }

  if (!["husband", "wife", "childe"].includes(role)) {
    throw new Error(
      "role harus salah satu dari: 'husband', 'wife', 'childe'. ",
    );
  }

  const paddedSeq = String(familySequence).padStart(sequencePadLength, "0");

  let roleId;
  if (role === "child") {
    const childNum = 2 + childIndex;
    roleId = String(childNum).padStart(2, "0");
  } else {
    roleId = ROLE_ID[role];
  }

  const parts = [regionCode];
  parts.push(String(year), paddedSeq, roleId);

  return parts.join("-");
}

function generateFamilyMembership(config) {
  const husband = generateFamilyMembership({ ...config, role: "husband" });
  const wife = generateFamilyMembership({ ...config, role: "wife" });
  const familyId = husband.slice(0, husband.lastIndexOf("-"));

  return { familyId, husband, wife };
}

function getNextFamilySequence(existingNumbers) {
  if (!existingNumbers || existingNumbers.length === 0) return 1;

  const sequences = existingNumbers.map((num) => {
    const parts = num.split("-");
    const seqPart = parts[parts.length - 2];
    return parseInt(seqPart, 10);
  });

  return Math.max(...sequences) + 1;
}

export default { generateMembershipNumber, generateFamilyMembership };

export function generateFamilyNumber(year, sequence) {
  const seq = String(sequence).padStart(4, "0");
  return `LBP-${year}-${seq}`;
}

export function generateMemberNumber(familyNumber, suffix) {
  return `${familyNumber}-${suffix}`;
}

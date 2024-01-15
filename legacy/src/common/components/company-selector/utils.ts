import { CorporateGroupViewMember } from "@/common/database/schema";

export const createPathRecursive = (members: CorporateGroupViewMember[], entryMember: CorporateGroupViewMember): CorporateGroupViewMember[] => {
  const parent = members.find((member) => member.id === entryMember.parentCompanyId);
  if (!parent) return [entryMember];
  return [...createPathRecursive(members, parent), entryMember];
};

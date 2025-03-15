export class FamilyUsersDTO {
    id?: string | null;
    userLogin?: string | null;
    userName?: string | null;
    userRole?: string | null;
}

export class FamilyMemberToAddDTO {
    userLogin: string = "";
    familyId: string = "";
    role: string = "";
}
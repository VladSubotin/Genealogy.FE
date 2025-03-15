export class FamilyDTO {
    id: string = "";
    name?: string | null;
    profileIcon?: ArrayBuffer | null;
    membersCount: number = 0;
}

export class FamilyToCreateDTO {
    name?: string | null;
    description?: string | null;
    profileIcon?: ArrayBuffer | null;
    privacyLevel?: number | null;
    adminLogin?: string | null;
}

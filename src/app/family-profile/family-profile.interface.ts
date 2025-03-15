export class FamilyProfileDTO {
    id: string = "";
    name?: string;
    description?: string;
    profileIcon?: ArrayBuffer | null;
    privacyLevel?: number;
    myRole?: string;
    admin: FamilyUsersDTO = new FamilyUsersDTO;
  }
  
  export class FamilyUsersDTO {
    id?: string;
    userLogin?: string;
    userName?: string;
    userRole?: string;
  }

  export class FamilyToUpdateDTO {
    id: string = "";
    name?: string;
    description?: string;
    profileIcon?: ArrayBuffer | null;
    privacyLevel?: number;
}

  
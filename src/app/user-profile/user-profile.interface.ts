export class LoginDTO {
    login: string = "";
    hashPassword: string = "";
}

export class TokenDTO {
    token: string = "";
}

export class UserFullProfileDTO {
    login: string = "";
    name?: string | null;
    email?: string | null;
    profileIcon?: ArrayBuffer | null;
    birthDate?: string | null;
    description?: string | null;
}

export class UserPublicProfileDTO {
    login: string = "";
    name?: string | null;
    profileIcon?: ArrayBuffer | null;
    ageInTens?: number | null;
    description?: string | null;
    families: UserFamiliesDTO[] = [];
}

export class UserFamiliesDTO {
    id: string = "";
    familyId: string = "";
    familyName?: string | null;
    role?: string | null;
    familyProfileIcon?: ArrayBuffer | null;
}

export class User {
    login: string = "";
    name?: string | null;
    email?: string | null;
    hashPassword?: string | null;
    profileIcon?: ArrayBuffer | null;
    birthDate?: string | null;
    description?: string | null;
}

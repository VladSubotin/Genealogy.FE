export class PersonProfileDTO {
    id: string = "";
    myRole?: string;
    prefix?: string;
    suffix?: string;
    fullName?: string;
    names?: PersonNameDTO[];
    gender?: string;
    nationality?: string;
    religion?: string;
    biography?: string;
    familyId?: string;
    familyName?: string;
    facts?: PersonFactDTO[];
    images?: PersonImageDTO[];
    relatives?: PersonRelativeDTO[];
  }
  
  export class PersonNameDTO {
    id: string = "";
    nameType?: string;
    name?: string;
    isMain?: boolean;
  }
  
  export class PersonFactDTO {
    id: string = "";
    factType?: string;
    versions?: PersonFactVersionDTO[];
  }
  
  export class PersonFactVersionDTO {
    id: string = "";
    role?: string;
    place?: string;
    location?: string;
    dateFrom?: string; // You might want to use a more suitable type depending on your date handling
    dateTo?: string;
    note?: string;
    veracity?: string;
    source?: string;
    conflictVersions?: ConflictVerDTO[];
  }
  
  export class ConflictVerDTO {
    message?: string;
    conflictVersionId: string = "";
    conflictRelative?: PersonRelativeDTO;
  }
  
  export class PersonRelativeDTO {
    id: string = "";
    fullName?: string;
    relationType?: string;
    relationId: string = "";
  }
  
  export class PersonImageDTO {
    id: string = "";
    image?: ArrayBuffer | null; // or `string` if the image is base64 encoded
  }
  
  export class NameToCreateDTO {
    id: string = "";
    personId?: string | null;
    nameType?: string | null;
    name?: string | null;
    isMain?: boolean | null;
}

export class FactToCreateDTO {
  id: string = "";
  personId?: string | null;
  factType?: string | null;
}

export class VersionToCreateDTO {
  id: string = "";
  biographicalFactId?: string | null;
  role?: string | null;
  place?: string | null;
  location?: string | null;
  dateFrom?: string; // В TypeScript можно использовать string или Date в зависимости от формата даты
  dateTo?: string; // В TypeScript можно использовать string или Date в зависимости от формата даты
  note?: string | null;
  veracity?: string | null;
  source?: string | null;
}


export class HierarchicTreeNode {
    id: string = "";
    name: string = "";
    subNodes?: HierarchicTreeNode[];
    x: number = 0;
    y: number = 0;
  }
  
  export class TreeNode {
    id: string = "";
    name: string = "";
    x: number = 0;
    y: number = 0;
  }
  
  export class Line {
    startX: number = 0;
    startY: number = 0;
    endX: number = 0;
    endY: number = 0;
  }

  export class PersonOptionsDTO {
    familyId?: string | null;

    prefix?: string | null;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    suffix?: string | null;

    gender?: string | null;

    facts?: PersonFactOptionsDTO[] | null;

    relatives?: PersonRelativeOptionsDTO[] | null;
  }

    export class PersonFactOptionsDTO {
      factType: string = '';
      location?: string | null;
      dateFrom?: string | null; // здесь можно использовать строку или Date, в зависимости от формата даты
      dateTo?: string | null; // здесь можно использовать строку или Date, в зависимости от формата даты
    }

    export class PersonRelativeOptionsDTO {
      firstName?: string | null;
      middleName?: string | null;
      lastName?: string | null;
      relationType?: string | null;
    }

    export class PersonMainInfoDTO {
      id: string = "";
      fullName?: string | null;
      familyId?: string | null;
      familyName?: string | null;
      image?: ArrayBuffer | null;
      birth?: FactShortInfoDTO | null;
      death?: FactShortInfoDTO | null;
      relatives?: PersonRelativeDTO[] | null;
  }

  export class FactShortInfoDTO {
    place?: string | null;
    dateFrom?: string | null; // здесь можно использовать строку или Date, в зависимости от формата даты
    dateTo?: string | null; // здесь можно использовать строку или Date, в зависимости от формата даты
}

export class PersonRelativeDTO {
  id: string = "";
  fullName?: string | null;
  relationType?: string | null;
}

export class PersonToCreateDTO {
  familyId?: string | null;
  relationType?: string | null;
  toPersonId?: string | null;
}

export class RelationToCreateDTO {
  personIsId?: string | null;
  relationType?: string | null;
  toPersonId?: string | null;
}
export class PersonMainInfoDTO
{
    id: string = "";
    fullName?: string;
    familyId?: string;
    familyName?: string;
    image?: ArrayBuffer;
    birth?: FactShortInfoDTO;
    deth?: FactShortInfoDTO;
    relatives?: PersonRelativeDTO[];
}

export class PersonRelativeDTO
{
    id: string = "";
    fullName?: string;
    relationType?: string;
}

export class FactShortInfoDTO
{
    place?: string;
    dateFrom?: string;
    dateTo?: string;
}

export class PersonOptionsDTO {
    familyId?: string | null;
    prefix?: string | null;
    firstName?: string | null;
    midleName?: string | null;
    lastName?: string | null;
    suffix?: string | null;
    gender?: string | null;
    facts?: PersonFactOpitonsDTO[] | null = [];
    relatives?: PersonRelativeOptionsDTO[] | null;
}

export class PersonFactOpitonsDTO
{
    factType: string = "";
    location?: string;
    dateFrom?: string;
    dateTo?: string;
}

export class PersonRelativeOptionsDTO
{
    firstName?: string;
    midleName?: string;
    lastName?: string;
    relationType?: string;
}
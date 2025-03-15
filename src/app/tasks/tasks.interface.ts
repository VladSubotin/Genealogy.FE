export class TaskToCreateDTO {
    name?: string | null;
    description?: string | null;
    userLogin?: string | null;
    familyId?: string | null;
}

export class TaskToUpdateDTO {
    id: string = "";
    name?: string | null;
    description?: string | null;
    isDone?: boolean | null;
    userLogin?: string | null;
}

export class TaskOptionsDTO {
    userLogin?: string | null;
    familyId?: string | null;
    isDone?: boolean | null;
    taskName?: string | null;
}

export class TaskDTO {
    id: string = "";
    name?: string | null;
    description?: string | null;
    creationDate?: string | null;
    isDone?: boolean | null;
    userLogin?: string | null;
    userName?: string | null;
    familyId?: string | null;
    familyName?: string | null;
    steps: StepDTO[] = [];
}

export class StepDTO {
    id: string = "";
    stepNum?: number | null;
    purpose?: string | null;
    source?: string | null;
    sourceLocation?: string | null;
    term?: string | null;
    result?: string | null;
    isDone?: boolean | null;
}

export class StepToAddDTO {
    taskId?: string | null;
    purpose?: string | null;
    source?: string | null;
    sourceLocation?: string | null;
    term?: string | null;
    result?: string | null;
}

export class StepToUpdateDTO {
    id: string = "";
    purpose?: string | null;
    source?: string | null;
    sourceLocation?: string | null;
    term?: string | null;
    result?: string | null;
    isDone?: boolean | null;
}

export class TaskListsModel {
    public name: string;
    public label: string;
    list: TaskModel[];
}

export class TaskModel {
    priority: PRIORITY_ENUM;
    content: string;
    extra?: TaskExtraDataModel;

    constructor() {
        this.extra = {
            attachment: false,
            user: [],
            endDate: ''
        };
    }
}

export class ResultDataModel extends TaskModel {
    public type: ResultTypeEnum;

    constructor() {
        super();
    }
}

export enum ResultTypeEnum {
    user,
    task
}

export class TaskExtraDataModel {
    endDate?: string;
    attachment?: boolean;
    user?: string[];
}

export enum PRIORITY_ENUM {
    low,
    medium,
    high
}

export class UserModel {
    public username: string;
}

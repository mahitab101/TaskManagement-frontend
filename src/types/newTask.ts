export interface NewTask {
    title:       string;
    description: string;
    deadline:    Date;
    isCompleted: boolean;
    createdAt:   Date;
    createdBy:   string;
}

export interface ITeacherLite {
    id: number;
    staff_name: string;
    staff_id: number;
}

export interface IAssignClass {
    teacher_id: number;
    class?: string;
    division?: number;
}
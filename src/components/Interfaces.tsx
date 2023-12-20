export interface SchoolClass{
    id: number;
    name: string;
    class_teacher?: User;
    girls: number;
    boys: number;
    fees?: number;
    subjects?: Subject[];
}

export interface User{
    name: string;
    email?: string;
    password?: string;
    role?: string;
    sex?: string;
    contact?: string;
    profile_pic_filepath?: string;
    subjects?: string[];
    class?: SchoolClass;
    classes?: SchoolClass[];
    children?: Student[];
}

export interface Student{
    id: number
    name: string
    sex?: string
    dob?: string
    profile_pic_filepath?: string
    parent_id?: string
    class_id?: string
    custom_ct_comm?: string
    custom_ht_comm?: string
    times_promoted?: number
    last_promoted?: string
    parent?: User;
    class?: SchoolClass;
    marks?: Mark[];
    periods?: Period[];
    attendance?: string[]
}

export interface Subject{
    id: number;
    name: string;
    teachers: User[];
    classes: SchoolClass[];
    marks: Mark[]
}

export interface Requirement{
    id: number;
    class_id?: string;
    period_id?: string;
    name?: string;
    quantity?: string;
    price?: string;
    compulsary?: any;
    class?: SchoolClass;
    period?: Period;
}

export interface Period{
    id: number;
    name: string;
    date_from?: string;
    date_to?: string;
    nxt?: Period;
}

export interface Parent{
    id: number;
    name?: string;
    email?: string;
    sex?: string;
    contact?: string;
    password?: string;
    role?: string;
    students?: Student;
}

export interface Mark{
    id: number;
    student_id?: string
    subject_id?: string
    period_id?: string
    type?: string
    mark?: number
    year?: string
    student: Student;
    subject: Subject;
    period: Period;
    grading: Grading;
}

export interface Grading{
    id: number;
    class_id?: string
    marks_from?: number
    marks_to?: number
    grade?: string
    remark?: string
    locked?: string
    class?: SchoolClass;
}

export interface Comment{
    id?: number
    class_id?: string
    agg_from?: number
    agg_to?: number
    ht_comm?: string
    ct_comm?: string
    class?: SchoolClass;
}

export interface attendance{
    id: number;
    student_id: number;
    date: string;
    student: Student;
}

export interface NavLink {
    pathName: string;
    name: string;
    sublinks?: Array<NavLink>;
}
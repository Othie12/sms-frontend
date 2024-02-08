//most of the type checkers for objects I use(according to the app design)
export interface SchoolClass{
    id?: number;
    name: string;
    classteacher_id?: string | number;
    class_teacher?: User;
    girls?: number;
    boys?: number;
    fees_day?: number;
    fees_boarding?: number;
    subjects?: Subject[];
}

export interface User{
    id?: string;
    name: string;
    email?: string;
    password?: string;
    role?: string;
    sex?: string;
    contact?: string;
    profile_pic_filepath?: string;
    picture?: File;
    subjects?: Subject[];
    class?: SchoolClass;
    classes?: SchoolClass[];
    children?: Student[];
}

export interface Balance {
    id?: string;
    student_id?: string;
    period_id?: string;
    balance?: number;
}

export interface Student{
    id?: number
    name: string
    sex?: string
    dob?: string
    profile_pic_filepath?: string
    picture?: File;
    parent_id?: string
    section?: 'Day' | 'Boarding';
    class_id?: string
    custom_ct_comm?: string
    custom_ht_comm?: string
    times_promoted?: number
    last_promoted?: string
    parent?: User;
    class?: SchoolClass;
    marks?: Mark[];
    periods?: Period[];
    payments?: Payment[];
    attendance?: string[];
    balance?: string;
}

export interface Subject{
    id?: number;
    name: string;
    teachers?: User[];
    classes?: SchoolClass[];
    marks?: Mark[]
}

export interface Requirement{
    id?: number;
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
    id?: number;
    name?: string;
    date_from?: string;
    date_to?: string;
    nxt?: Period;
}

export interface Payment{
    id?: number;
    student_id?: number;
    period_id?: string;
    amount?: number;
    balance?: number;
    reason?: string;
    payement_method?: string;
    date_paid?: string;
    picture?: string | File;
    hash?: string;
    student?: Student;
    period?: Period;
    balance_obj?: Balance;
}

export interface Parent{
    id?: number;
    name?: string;
    email?: string;
    sex?: string;
    contact?: string;
    password?: string;
    role?: string;
    students?: Student;
}

export interface Mark{
    id?: number;
    student_id?: string
    subject_id?: string
    period_id?: string
    type?: string
    mark?: number
    year?: string
    student?: Student;
    subject?: Subject;
    period?: Period;
    grading?: Grading;
}

export interface Grading{
    id?: number;
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

export const AutoCapitalize = (word: string) => {
    word = word.toLowerCase().split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    return word;
};

//can be put in the place of any missing image
export const imgPlaceholder = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>  

//saw my self using this utility alot of times so i decided to make it inheritable
export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setter: React.Dispatch<React.SetStateAction<any>>) => {
    const {name, value} = e.target;
    setter({...obj, [name]: value});
};
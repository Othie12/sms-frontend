/******************* All positions *********************** */
/*
   'Teacher', 
    'Head Teacher', 
    'Deputy Head Teacher', 
    'DOS', 
    'Sectretary', 
    'Bursar',
    'parent',
    'Admini',
*/

export const permitted_everywhere = [
    'Admini',
    'Head Teacher', 
    'Deputy Head Teacher', 
];

export const record_payment = [
    ...permitted_everywhere,
    'Bursar',
];

export const register_student = [
    ...permitted_everywhere,
    'Sectretary', 
    'DOS',
];

export const register_staff = [
    ...permitted_everywhere,
    'DOS', 
];

export const create_calendar = [
    ...register_staff,
];
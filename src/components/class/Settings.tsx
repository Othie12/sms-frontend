import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SchoolClass, User, handleInputChange } from "../Interfaces";
import axios from "axios";
import NavBar from "../dashboard/NavBar";
const apiUrl = process.env.REACT_APP_API_URL;


export default function ClassSettings(){
    const {classId} = useParams();
    return( <NavBar chilren={<Page />} classId={classId} />)
}

function Page(){
    const [clas, setClas] =useState<SchoolClass>({name: ''});
    const {classId} = useParams();

    useEffect(() => {
        axios.get(apiUrl + '/class/' + classId)
        .then(r => setClas(r.data))
        .catch(e => console.error(e));
    }, [classId]);

    return(        
        <div className="grid md:lg:grid-cols-2 gap-2">
            <div className="default-container">
                <SetClassTeacher clas={clas} setclas={setClas} />
            </div>
            <div className="default-container">
                <SetSchoolFees clas={clas} setclas={setClas} />
            </div>
        </div>
    );
}

interface componentsProps {
    clas: SchoolClass;
    setclas: React.Dispatch<React.SetStateAction<SchoolClass>>;
}
function SetSchoolFees(p: componentsProps) {
    const [msg, setmsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(apiUrl + "/class/update/" + p.clas.id, p.clas)
        .then(r => setmsg("Updated"))
        .catch(e => console.error(e));
    };

    return (
        <form className="" onSubmit={e => handleSubmit(e)}>
            <div className="text-xl text-slate-500">Set schoolfees for {p.clas.name}</div>
            <div className="error-msg">{msg}</div>
            <div className="mt-4 flex-col">
                <label htmlFor="fees_boarding">Boarding</label>
                <input className="inputstyle" 
                    type="number" name="fees_boarding" 
                    placeholder="Bording" value={p.clas?.fees_boarding && Math.round(p.clas?.fees_boarding)} 
                    onChange={e => handleInputChange(e, p.clas, p.setclas)}
                />

                <label htmlFor="fees_day">Day</label>
                <input className="inputstyle mt-2" 
                    type="number" name="fees_day" 
                    placeholder="Day" value={p.clas?.fees_day && Math.round(p.clas?.fees_day)} 
                    onChange={e => handleInputChange(e, p.clas, p.setclas)}
                />
            </div>
            <input className="inputstyle mt-4 mb-2" type="submit" value="Change" />
        </form>
    )
}


function SetClassTeacher(p: componentsProps) {
    const [teachers, setTeachers] = useState<User[]>([]);
    const [msg, setmsg] = useState<string>('');
    useEffect(() => {
        axios.get(apiUrl + '/teachers').then(r => setTeachers(r.data))
        .catch(e => console.error(e));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(apiUrl + "/class/update/" + p.clas.id, p.clas)
        .then(r => setmsg("Updated"))
        .catch(e => console.error(e));
    };

    return (
        <form className="" onSubmit={e => handleSubmit(e)}>
            <div className="text-xl text-slate-500">Set Class teacher for {p.clas.name}</div> 
            <div className="error-msg">{msg}</div>
            <div className="mt-4 flex flex-col">
                <select className="inputstyle" name="classteacher_id" onChange={e => handleInputChange(e, p.clas, p.setclas)}>
                    <option value={p.clas.classteacher_id}>{p.clas.class_teacher?.name}</option>
                    {teachers.map(teacher => 
                        <option value={teacher.id}>{teacher.name}</option>    
                    )}
                </select>
            </div>
            <input className="inputstyle mt-4 mb-2" type="submit" value="Change" />
        </form>
    )
}
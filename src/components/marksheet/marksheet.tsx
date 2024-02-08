import { useEffect, useState } from "react";
import { Student, NavLink, Mark } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
import { LinkItem } from "../dashboard/NavBar";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import Template from "../Template";
const apiUrl = process.env.REACT_APP_API_URL;
const imgUrl = process.env.REACT_APP_IMG_URL;
const imgPlaceholder = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>  


export default function Marksheet(){
    return(<Template children={<Page />} />);
}
function Page(){
    const [students, setStudents] = useState<Student[]>();
    const {authUser} = useAuth();

    const apiUrl = process.env.REACT_APP_API_URL;
    const {classId, type} = useParams();

    console.log(type)
//links on the top navbar
const links: NavLink[] = [
    {pathName: '/marksheet/' + classId + '/mid', name: 'Mid Term'},  
    {pathName: '/marksheet/' + classId + '/end', name: 'End of Term'},  
];

    const fetchStudents = () => {
        axios.get(`${apiUrl}/class/students/${classId}`)
        .then(r => {
            setStudents(r.data);
        }).catch(e => console.error("Failed to fetch: " + e));
    };

    useEffect(() => {
        fetchStudents()
    }, [classId]);
    
    return(
        <>
            <nav className="bg-purple-300 text-slate-500 text-lg">
                <ul className="flex p-1 justify-between">
                    {links.map(l => 
                        <li><LinkItem l={l} id={classId}/></li>    
                    )}
                </ul>
            </nav>
            <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
                <table className="w-full">
                    <thead>
                        <tr className="backdrop-blur-md text-left bg-purple-300">
                            <th className="p-3">Name</th>
                            {authUser?.subjects?.map(subject => 
                                <th>{subject.name}</th>    
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map(student => 
                            <tr className="">
                                <td className="p-2 flex">
                                {student.profile_pic_filepath === null ? imgPlaceholder
                                :
                                    <img src={`${imgUrl}/${student.profile_pic_filepath}`} className="w-7 h-7 rounded-full mr-1" alt="photo" />
                                }
                                    {student.name}
                                </td>
                                {authUser?.subjects?.map(subject => 
                                    <MarkInput student_id={student.id?.toString()} subject_id={subject.id?.toString()} type={type}/>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

function MarkInput(m: Mark) {
    const [markObj, setMarkObj] = useState<Mark>({student_id: m.student_id, 
                                                subject_id: m.subject_id, 
                                                type: m.type, mark: undefined});

    useEffect(() => {
        axios.get(apiUrl + `/specifiedMark/${m.student_id}/${m.subject_id}/${m.type}`)
        .then(r => {
            console.log(r.data)
            if(r.data.mark !== null && r.data.mark !== undefined){
                setMarkObj(r.data);
            }
        })
        .catch(e => console.log('Errorf: ' + e));
    }, [m.type])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(markObj)
        e.preventDefault();
        axios.post(apiUrl + '/record-mark', markObj)
        .then(r => console.log(r.data))
        .catch(e => console.error(e));
    };

    return(
        <td className="">
        <form onSubmit={e => handleSubmit(e)}>
            <input type="number" name="mark"
                className="inputstyle w-1/2" 
                value={markObj.mark} 
                onChange={e => setMarkObj({...markObj, mark: Number(e.target.value)})}
            />
            <input type="submit" name="Submit" className="inputstyle"/>
        </form>
        </td>
    );
}
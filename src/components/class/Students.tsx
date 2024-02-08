import { useEffect, useState } from "react";
import { Student, NavLink, imgPlaceholder } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
import NavBar from "../dashboard/NavBar";
import { useParams, Link } from "react-router-dom";

export default function Students(){
    const {classId} = useParams();
    return( <NavBar chilren={<Page />} classId={classId} />)
}

function Page(){
    const [students, setStudents] = useState<Student[]>();
    const apiUrl = process.env.REACT_APP_API_URL;
    const imgUrl = process.env.REACT_APP_IMG_URL;
    const {classId} = useParams();

    //links on the top navbar
    const links: NavLink[] = [
        {pathName: '/class/students', name: 'Students'},  
        {pathName: '/class/marksheet', name: 'Marksheet'},  
        {pathName: '/class/requirements', name: 'Requirements'},  
        {pathName: '/class/settings', name: 'Settings'},  
    ]
    
    const fetchStudents = () => {
        axios.get(`${apiUrl}/class/students/${classId}`)
        .then(r => {
            setStudents(r.data);
        }).catch(e => console.error("Failed to fetch: " + e));
    };

    useEffect(() => {
        fetchStudents()
    }, []);
    
    console.log(students)
    return(
        <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
            <table className="w-full">
                <thead>
                    <tr className="backdrop-blur-md text-left bg-purple-300">
                        <th className="p-3">Name</th>
                        <th>Sex</th>
                        <th>Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                {students?.map(student => 
                    <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
                        <Link to={"/student/" + student.id}>
                        <td className="flex p-2">
                            <span className="w-7 h-7">
                            {student.profile_pic_filepath === null ? 
                                imgPlaceholder
                            :
                            <img src={`${imgUrl}/${student.profile_pic_filepath}`} className="w-7 h-7 rounded-full mr-1" alt="photo" />
                        }
                        </span>
                                {student.name}
                        </td>
                        </Link>
                        <td>{student.sex?.toUpperCase()}</td>
                        <td>{student.dob} </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

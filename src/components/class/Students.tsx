import { useEffect, useState } from "react";
import { Student } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
import NavBar from "../dashboard/NavBar";
import { useParams } from "react-router-dom";

export default function Students(){
    const [students, setStudents] = useState<Student[]>();
    const apiUrl = process.env.REACT_APP_API_URL;
    const imgUrl = process.env.REACT_APP_IMG_URL;
    const {classId} = useParams();
    const imgPlaceholder = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>  

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
        <main className="flex">
        <Sidebar />
            <div className="w-full">
                <NavBar classId={classId}/>
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
                                <td className="flex p-2">
                                    {student.profile_pic_filepath === null ? imgPlaceholder
                                    :
                                        <img src={`${imgUrl}/${student.profile_pic_filepath}`} className="w-7 h-7 rounded-full mr-1" alt="photo" />
                                    }
                                        {student.name}
                                </td>
                                <td>{student.sex?.toUpperCase()}</td>
                                <td>{student.dob} </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
    </main>
    );
}

import { useEffect, useState } from "react";
import { Student } from "../Interfaces";
import axios from "axios";
import NavBar from "../dashboard/NavBar";
import { useParams } from "react-router-dom";

export default function ClassMarksheet(){
    const {classId} = useParams();
    return( <NavBar chilren={<Page />} classId={classId} />)
}

function Page(){
    const [students, setStudents] = useState<Student[]>();
    const [stats, setStats] = useState<markStats[]>();
    const apiUrl = process.env.REACT_APP_API_URL;
    const {classId} = useParams();

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
        <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
            <table className="w-full">
                <thead>
                    <tr className="backdrop-blur-md text-left bg-purple-300">
                        <th className="p-3">Name</th>
                        {stats?.map(stat => 
                            <th>{stat.name}</th>    
                        )}
                    </tr>
                </thead>
                <tbody>
                {students?.map(student => 
                        <StudentStats id={student.id} name={student.name} setter={setStats}/>
                )}
                </tbody>
            </table>
        </div>
    );
}

interface getProps{
    id: any;
    name: string;
    setter: any;
}

interface markStats{
    name: string;
    markMid: number;
    aggMid: number;
    markEnd: number;
    aggEnd: number;
    mark: number;
    agg: number;
}

function StudentStats({id, name, setter}: getProps){
    const [items, setItems] = useState<markStats[]>();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/student/mark-data/${id}`)
        .then(r => {
            setItems(r.data)
            setter(r.data);
        }).catch(e => console.error("Failed to fetch: " + e));
    }, []);
    console.log(items);
    return(
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
            <td className="p-2">{name}</td>
            {items?.map(item => 
                <td>{item.mark}</td>    
            )}
        </tr>

    );
}
/*
const fetchStats = (id: any, setter: any, apiUrl?: string) => {
    axios.get(`${apiUrl}/student/mark-data/${id}`)
    .then(r => {
        setter(r.data);
    }).catch(e => console.error("Failed to fetch: " + e));
}*/
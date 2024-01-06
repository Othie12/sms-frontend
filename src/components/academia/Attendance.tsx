import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Sidebar";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Attendance(){
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
    const [statusmsg, setStatusmsg] = useState<string>('Please click on the students you want to record as attended');
    const { classId } = useParams();

    useEffect(() => {
        axios.get(`${apiUrl}/attendance/${classId}`)
        .then(r => {
            setAttendanceData(r.data.sort((a: AttendanceData, b: AttendanceData) => a.name.localeCompare(b.name)));
        }).catch(e => console.error("Failed to fetch: " + e));
    }, []);

    const handleClick = (item: AttendanceData) => {
        const oldAttendanceData = attendanceData.filter(resource => resource.id !== item.id);
        setAttendanceData([{id: item.id, name: item.name, attended: !item.attended}, ...oldAttendanceData].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleSubmit = () => {
        axios.post(`${apiUrl}/attendance/${classId}`, {attendanceData: attendanceData})
        .then(r => setStatusmsg(r.data.message))
        .catch(e => console.error(e));
    }

    return(
        <main className="flex">
            <Sidebar />
            <section className="w-full">
                <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
                    <p className="font-light text-purple-900">{statusmsg}</p>
                    {attendanceData.map(item =>
                        <div key={item.id} onClick={() => handleClick(item)}
                            className={`border-b-2 border-purple-400 
                                    hover:bg-purple-300 p-2 ${item.attended && 'bg-purple-300'}`}
                            >
                            {item.name}
                        </div>    
                    )}
                    <button className="p-2 ring-1 rounded-md" onClick={() => handleSubmit()}>Finish</button>
                </div>
            </section>
        </main>
    );
}

interface AttendanceData {
    id: number;
    name: string;
    attended: boolean;
}
import { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import { SchoolClass } from "../Interfaces";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard(){
    const apiUrl = process.env.REACT_APP_API_URL
    const [classes, SetClasses] = useState<SchoolClass[]>([])

    const fetchClasses = () => {
        console.log(apiUrl)
        axios.get(`${apiUrl}/classes`)
        .then(response => {
            SetClasses(response.data);
        }).catch(e => console.error(e));
    };

    useEffect(() => {
        fetchClasses()
    }, []);

    return(
            <main className="flex">
                <Sidebar />
                    <div className="w-full">
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {classes.map(clas => <ClassCard c={clas} />)}
                        </div>
                    </div>
            </main>
    );
}

interface ClassCardProps{
    c: SchoolClass;
}
function ClassCard({c}: ClassCardProps){
    return (
        <Link to={"/class/students/" + c.id}>
            <div className="bg-purple-300 transition duration-300 rounded-lg p-4 hover:bg-purple-500" key={c.id}>
                <p className="font-bold bg-white/30 p-2 rounded-lg text-gray-800">{c.name}</p>
                <p className="font-light">{c.class_teacher?.name}</p>
                <p className="text-purple-900">Girls: {c.girls}</p>
                <p className="text-purple-900">Boys: {c.boys}</p>
                <p className="font-medium">Total: {c.girls + c.boys}</p>
                <p className="">Fees: {c.fees}</p>
            </div>
        </Link>
    );
}


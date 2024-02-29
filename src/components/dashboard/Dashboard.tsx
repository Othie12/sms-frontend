import { useEffect, useState } from "react";
import { SchoolClass } from "../Interfaces";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../Search";
import Template from "../Template";

export default function Dashboard() {
    return(
        <Template children={<Page />} />
    ); 
}

function Page(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const [classes, SetClasses] = useState<SchoolClass[]>([]);

    const fetchClasses = () => {
        axios.get(`${apiUrl}/classes`)
        .then(response => {
            SetClasses(response.data);
        }).catch(e => console.error(e));
    };

    useEffect(() => {
        fetchClasses()
    }, []);
    return(
        <div>
            <div className="flex justify-center mt-2">
                <Search searchUrl={apiUrl + "/student/search/"} redirectUrl={'/student/'} pholder="Search Pupil" />
            </div>
            <div className="grid md:lg:grid-cols-3 gap-4 p-4">
                {classes.map(clas => <ClassCard c={clas} key={clas.id} />)}
            </div>
        </div>

    );
}

interface ClassCardProps{
    c: SchoolClass;
}
function ClassCard({c}: ClassCardProps){
    const girls = c.girls ? c.girls : 0;
    const boys = c.boys ? c.boys : 0;
    return (
        <Link to={"/class/students/" + c.id}>
            <div className="gradient1 transition duration-300 rounded-lg p-4 hover:bg-purple-500 shadowstyle-1" key={c.id}>
                <p className="font-bold bg-purple-300/30 p-2 rounded-lg text-gray-800">{c.name}</p>
                <p className="font-light">{c.class_teacher?.name}</p>
                <p className="text-purple-900">Girls: {girls}</p>
                <p className="text-purple-900">Boys: {boys}</p>
                <p className="font-medium">Total: {girls + boys}</p>
                <p className="">
                    Fees: 
                    Ugx,{c.fees_day && Math.round(c.fees_day)} -
                    Ugx,{c.fees_boarding && Math.round(c.fees_boarding)}
                </p>
            </div>
        </Link>
    );
}


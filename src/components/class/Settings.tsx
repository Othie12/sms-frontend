import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { useEffect, useState } from "react";
import { NavLink, SchoolClass } from "../Interfaces";
import axios from "axios";
import NavBar from "../dashboard/NavBar";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ClassSettings(){
    const [clas, setClas] =useState<SchoolClass>();
    const {classId} = useParams();

        //links on the top navbar
        const links: NavLink[] = [
            {pathName: '/class/students', name: 'Students'},  
            {pathName: '/class/marksheet', name: 'Marksheet'},  
            {pathName: '/class/requirements', name: 'Requirements'},  
            {pathName: '/class/settings', name: 'Settings'},  
        ]
    useEffect(() => {
        axios.get(apiUrl + '/class/' + classId)
        .then(r => setClas(r.data))
        .catch(e => console.error(e));
    }, [])
    return(        
    <main className="flex">
    <Sidebar />
        <div className="w-full">
            <NavBar classId={classId} links={links}/>
            <div className="rounded-lg ring-purple-600 m-2 p-2 bg-purple-100 ring-1">
                {clas?.name}
            </div>
        </div>
</main>
);
}
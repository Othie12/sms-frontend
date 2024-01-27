import { useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { useEffect, useState } from "react";
import { NavLink, SchoolClass } from "../Interfaces";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ClassSettings(){
    const {studentId} = useParams();

    useEffect(() => {
    }, [])
    return(        
    <main className="flex">
    <Sidebar />
        <div className="w-full">
            <div className="rounded-lg ring-purple-600 m-2 p-2 bg-purple-100 ring-1">
                {studentId}
            </div>
        </div>
</main>
);
}
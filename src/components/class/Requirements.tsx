import { useEffect, useState } from "react";
import { Requirement, NavLink } from "../Interfaces";
import axios from "axios";
import NavBar from "../dashboard/NavBar";
import { useParams } from "react-router-dom";
import RegisterRequirement from "../register/Requirement";

export default function Requirements(){
    const {classId} = useParams();
    return( <NavBar chilren={<Page />} classId={classId} />)
}

function Page(){
    const [requirements, setRequirements] = useState<Requirement[]>();
    const apiUrl = process.env.REACT_APP_API_URL;
    const {classId} = useParams();
    const [formHidden, setFormHidden] = useState(true);
    const [repull, setRepull] = useState(true);


    const fetchrequirements = () => {
        axios.get(`${apiUrl}/class/requirements/${classId}`)
        .then(r => {
            setRequirements(r.data);
        }).catch(e => console.error("Failed to fetch: " + e));
    };

    useEffect(() => {
        fetchrequirements()
    }, [repull]);
    
    console.log(requirements)
    return(
        <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
            <button className="inputstyle mx-auto mb-2" onClick={() => setFormHidden(!formHidden)} >Create</button>
            <div hidden={formHidden} className="mb-2">
                {classId && <RegisterRequirement classId={classId} repull={repull} setRepull={setRepull} />}
            </div>
            <table className="w-full">
                <thead>
                    <tr className="backdrop-blur-md text-left bg-purple-300">
                        <th className="p-3">Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Compulsary</th>
                    </tr>
                </thead>
                <tbody>
                {requirements?.map(requirement => 
                    <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
                        <td className="p-2">{requirement.name}</td>
                        <td>{requirement.quantity}</td>
                        <td>{requirement.price}</td>
                        <td>{requirement.compulsary}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

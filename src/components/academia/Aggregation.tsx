import { useEffect, useState } from "react";
import { Grading } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Aggregation(){
    const [gradings, setGradings] = useState<Grading[]>();
    const [updated, setUpdated] = useState<boolean>(true)
    const {classId} = useParams();

    const fetchAggs = () => {
        axios.get(`${apiUrl}/gradings/${classId}`)
        .then(r => {
            setGradings(r.data);
        }).catch(e => console.error("Failed to fetch: " + e));
    };

    useEffect(() => {
        fetchAggs();
    }, [updated]);
    
    console.log(gradings)
    return(
        <main className="flex">
        <Sidebar />
            <div className="w-full">
                <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="backdrop-blur-md text-left bg-purple-300/50">
                                <th className="p-3">
                                    <span>From</span> - <span>To</span>
                                </th>
                                <th>Aggregates</th>
                                <th>Remark</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {gradings?.map(grading => 
                            <DataRow setUpdated={setUpdated} updated={updated} grading={grading} />
                        )}
                        <CreateNew setUpdated={setUpdated} updated={updated} classId={classId}/>
                        </tbody>
                    </table>
                </div>
            </div>
    </main>
    );
}

interface CreateProps{
    grading?: Grading;
    updated: boolean;
    update?: boolean;
    setUpdated: any;
    setUpdate?: any;
    classId?: string
}
function CreateNew(p: CreateProps){
    const [grading, setGrading] = useState<Grading>({});

    const handleSubmit = () => {
        if(grading.marks_from && grading.marks_to && grading.grade && grading.remark){
            axios.post(`${apiUrl}/gradings/${p.classId}`, grading)
            .then(response => {
                console.log(response.data); 
                p.setUpdated(!p.updated);
                setGrading({});
            })
            .catch(e => console.error(e));
        }
        else
            alert('fill all fields first');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setGrading({...grading, [name]: value,});
    };
    return (
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
                <td className="p-2">
                    <input type="number" className="ring-1 rounded-md ring-slate-500 pl-2" name="marks_from" min={0} max={100} required placeholder="from" value={grading?.marks_from} onChange={e => handleInputChange(e)}/> - <input type="number" name="marks_to" min={0} max={100} required className="ring-1 rounded-md ring-slate-500 pl-2" placeholder="to" value={grading?.marks_to} onChange={e => handleInputChange(e)}/>
                </td>
                <td>
                    <select name="grade" required className="ring-1 rounded-md ring-slate-500 px-2 p-1" value={grading?.grade} onChange={e => handleInputChange(e)}>
                        <option>--select--</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                    </select>    
                </td>
                <td><input type="text" name="remark" className="ring-1 pl-2 rounded-md ring-slate-500" value={grading?.remark} onChange={e => handleInputChange(e)}/></td>
                <td><input type="submit" name="submit" value={"Submit"} className="ring-1 p-1 bg-purple-200 ring-slate-500 hover:bg-purple-400 rounded-md" onClick={() => handleSubmit()}/></td>
        </tr>
    );
}

function DataRow(p: CreateProps){
    const [grading, setGrading] = useState<Grading>({});
    const [update, setUpdate] = useState<boolean>(false)
    useEffect(() => {
        p.grading && setGrading(p.grading)
    }, []);

    const handleDelete = (id: number) => {
        window.confirm('are you sure') &&
        axios.delete(`${apiUrl}/gradings/${id}`)
        .then(response => {
            console.log(response.data); 
            p.setUpdated(!p.updated);
        })
        .catch(e => console.error(e));
    };

    return(
    update ? 
        <UpdateRow grading={grading} update={update} setUpdate={setUpdate} updated={p.updated} setUpdated={p.setUpdated} />
    :
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300" key={grading.id}>
            <td className="p-2">{grading.marks_from} - {grading.marks_to}</td>
            <td>{grading.grade}</td>
            <td>{grading.remark}</td>
            <td className="flex justify-around">
                <button className="ring-1 p-1 ring-slate-500 hover:bg-slate-50 rounded-md" onClick={() => setUpdate(!update)}>Edit</button>
                <button className="ring-1 p-1 ring-purple-500 bg-red-300 hover:bg-slate-50 rounded-md" onClick={() => grading.id && handleDelete(grading.id)}>Delete</button>
            </td>
        </tr>
    );
}

function UpdateRow(p: CreateProps){
    const [grading, setGrading] = useState<Grading>();
    useEffect(() => setGrading(p.grading), []);

    const handleSubmit = () => {
        if(grading && grading.marks_from && grading.marks_to && grading.grade && grading.remark){
            axios.patch(`${apiUrl}/gradings/${grading.id}`, grading)
            .then(response => {
                console.log(response.data); 
                p.setUpdated(!p.updated);
                p.setUpdate(!p.update);
                setGrading({});
            })
            .catch(e => console.error(e));
        }
        else
            alert('fill all fields first');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setGrading({...grading, [name]: value,});
    };
    return (
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
                <td className="p-2">
                    <input type="number" className="ring-1 rounded-md ring-slate-500 pl-2" name="marks_from" min={0} max={100} required placeholder="from" value={grading?.marks_from} onChange={e => handleInputChange(e)}/> - <input type="number" name="marks_to" min={0} max={100} required className="ring-1 rounded-md ring-slate-500 pl-2" placeholder="to" value={grading?.marks_to} onChange={e => handleInputChange(e)}/>
                </td>
                <td>
                    <select name="grade" required className="ring-1 rounded-md ring-slate-500 px-2 p-1" value={grading?.grade} onChange={e => handleInputChange(e)}>
                        <option>--select--</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                    </select>    
                </td>
                <td><input type="text" name="remark" className="ring-1 pl-2 rounded-md ring-slate-500" value={grading?.remark} onChange={e => handleInputChange(e)}/></td>
                <td><input type="submit" name="submit" value={"Update"} className="ring-1 p-1 bg-purple-200 ring-slate-500 hover:bg-purple-400 rounded-md" onClick={() => handleSubmit()}/></td>
        </tr>
    );
}
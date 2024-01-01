import { useEffect, useState } from "react";
import { Comment } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

export default function Comments(){
    const [comments, setComments] = useState<Comment[]>();
    const [updated, setUpdated] = useState<boolean>(true)
    const {classId} = useParams();

    const fetchAggs = () => {
        axios.get(`${apiUrl}/comments/${classId}`)
        .then(r => {
            setComments(r.data);
        }).catch(e => console.error("Failed to fetch: " + e));
    };

    useEffect(() => {
        fetchAggs();
    }, [updated]);
    
    console.log(comments)
    return(
        <main className="flex">
        <Sidebar />
            <div className="w-full">
                <div className="rounded-lg w-[98%] min-h-[85%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
                    <table className="w-full">
                        <thead className="sticky top-0">
                            <tr className="backdrop-blur-md text-left bg-purple-300/50">
                                <th className="p-3">Total</th>
                                <th>Class Teacher</th>
                                <th>Head Teacher</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {comments?.map(comment => 
                            <DataRow setUpdated={setUpdated} updated={updated} comment={comment} />
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
    comment?: Comment;
    updated: boolean;
    update?: boolean;
    setUpdated: any;
    setUpdate?: any;
    classId?: string
}
function CreateNew(p: CreateProps){
    const [comment, setComment] = useState<Comment>({});

    const handleSubmit = () => {
        console.log(comment)
        if(comment.agg_from && comment.agg_to && comment.ct_comm){
            axios.post(`${apiUrl}/comments/${p.classId}`, comment)
            .then(response => {
                console.log(response.data); 
                p.setUpdated(!p.updated);
                setComment({});
            })
            .catch(e => console.error(e));
        }
        else
            alert('fill all fields first'); setComment({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setComment({...comment, [name]: value,});
    };
    return (
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
                <td className="p-2 flex">
                    <input type="number" className="ring-1 w-10 rounded-md ring-slate-500 pl-2" name="agg_from" min={0} required placeholder="from" value={comment?.agg_from} onChange={e => handleInputChange(e)}/> - <input type="number" name="agg_to" min={0} required className="ring-1 rounded-md w-10 ring-slate-500 pl-2" placeholder="to" value={comment?.agg_to} onChange={e => handleInputChange(e)}/>
                </td>
                <td><input type="text" name="ct_comm" className="ring-1 pl-2 rounded-md ring-slate-500" value={comment?.ct_comm} onChange={e => handleInputChange(e)}/></td>
                <td><input type="text" name="ht_comm" className="ring-1 pl-2 rounded-md ring-slate-500" value={comment?.ht_comm} onChange={e => handleInputChange(e)}/></td>
                <td><input type="submit" name="submit" value={"Submit"} className="ring-1 p-1 bg-purple-200 ring-slate-500 hover:bg-purple-400 rounded-md" onClick={() => handleSubmit()}/></td>
        </tr>
    );
}

function DataRow(p: CreateProps){
    const [comment, setComment] = useState<Comment>({});
    const [update, setUpdate] = useState<boolean>(false)
    useEffect(() => {
        p.comment && setComment(p.comment)
    }, []);

    const handleDelete = (id: number) => {
        window.confirm('are you sure') &&
        axios.delete(`${apiUrl}/comments/${id}`)
        .then(response => {
            console.log(response.data); 
            p.setUpdated(!p.updated);
        })
        .catch(e => console.error(e));
    };

    return(
    update ? 
        <UpdateRow comment={comment} update={update} setUpdate={setUpdate} updated={p.updated} setUpdated={p.setUpdated} />
    :
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300" key={comment.id}>
            <td className="p-2">{comment.agg_from} - {comment.agg_to}</td>
            <td className="px-3">{comment.ct_comm}</td>
            <td className="px-3">{comment.ht_comm}</td>
            <td className="flex justify-around">
                <button className="ring-1 p-1 ring-slate-500 hover:bg-slate-50 rounded-md" onClick={() => setUpdate(!update)}>Edit</button>
                <button className="ring-1 p-1 ring-purple-500 bg-red-300 hover:bg-slate-50 rounded-md" onClick={() => comment.id && handleDelete(comment.id)}>Delete</button>
            </td>
        </tr>
    );
}

function UpdateRow(p: CreateProps){
    const [comment, setComment] = useState<Comment>();
    useEffect(() => setComment(p.comment), []);

    const handleSubmit = () => {
        if(comment && comment.agg_from && comment.agg_to && comment.ct_comm){
            axios.patch(`${apiUrl}/comments/${comment.id}`, comment)
            .then(response => {
                console.log(response.data); 
                p.setUpdated(!p.updated);
                p.setUpdate(!p.update);
                setComment({});
            })
            .catch(e => console.error(e));
        }
        else
            alert('fill all fields first');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setComment({...comment, [name]: value,});
    };
    return (
        <tr className="border-b-2 border-purple-400 hover:bg-purple-300">
            <td className="p-2 flex">
                <input type="number" className="ring-1 w-10 rounded-md ring-slate-500 pl-2" name="agg_from" min={0} required placeholder="from" value={comment?.agg_from} onChange={e => handleInputChange(e)}/> - <input type="number" name="agg_to" min={0} required className="ring-1 w-10 rounded-md ring-slate-500 pl-2" placeholder="to" value={comment?.agg_to} onChange={e => handleInputChange(e)}/>
            </td>
            <td><input type="text" name="ct_comm" className="ring-1 pl-2 rounded-md ring-slate-500" value={comment?.ct_comm} onChange={e => handleInputChange(e)}/></td>
            <td><input type="text" name="ht_comm" className="ring-1 pl-2 rounded-md ring-slate-500" value={comment?.ht_comm} onChange={e => handleInputChange(e)}/></td>
            <td><input type="submit" name="submit" value={"Update"} className="ring-1 p-1 bg-purple-200 ring-slate-500 hover:bg-purple-400 rounded-md" onClick={() => handleSubmit()}/></td>
        </tr>
    );
}
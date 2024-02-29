import { useEffect, useState } from "react";
import { Period } from "../Interfaces";
import axios from "axios";
import Template from "../Template";
const apiUrl = process.env.REACT_APP_API_URL;


export default function Calendar(){
    return(<Template children={<Page />} />);
}
function Page(){
    return (
        <div className="rounded-lg w-[98%] min-h-[97%] ring-purple-600 mt-2 p-2 mx-auto bg-purple-100 ring-1">
            <div onSubmit={e => e.preventDefault()} className="md:lg:w-1/2 mx-auto text-slate-600 mb-4">
                <FormItem name="First term"/>
                <FormItem name="Second term" />
                <FormItem name="Third term"/>
            </div>
        </div>
    )
}

interface formProps{
    name: string;
}
function FormItem(p: formProps){
    const [period, setPeriod] = useState<Period>();
    const [statusmsg, setStatusmsg] = useState<string>('');
    const [repull, setRepull] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`${apiUrl}/period/${p.name}`)
        .then(r => setPeriod(r.data))
        .catch(e => console.log(e));
    }, [repull])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(period?.date_from === undefined || period.date_to === undefined){
            setStatusmsg('Please first fill the Beginning and ending date');
        }else{
            axios.post(`${apiUrl}/period/`, period)
            .then(r => {
                setStatusmsg(r.data.message);
                setRepull(!repull);
            })
            .catch(e => console.log(e));
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPeriod({...period, [e.target.name]: e.target.value, 'name': p.name});
        setStatusmsg('');
    };

    return(
        <form className="mt-4 shadowstyle-1 ring-1 ring-purple-600" onSubmit={e => handleSubmit(e)}>
        <p>{p.name}</p>
        <div className="flex justify-between">
            <div>
                <p className="font-light text-purple-600">Begins</p>
                <input type="date" name="date_from" 
                    className="p-1 rounded-md"
                    value={period?.date_from} 
                    onChange={e => handleInputChange(e)}
                />
            </div>
            <div>
                <p className="font-light text-purple-600">Ends</p>
                <input type="date" name="date_to" 
                    className="p-1 rounded-md"
                    value={period?.date_to} 
                    onChange={e => handleInputChange(e)}
                />
            </div>
        </div>
        <p className="font-light text-purple-900">{statusmsg}</p>
        <input type="submit" value="Set" name="submit" className={`rounded-md bg-purple-500 mt-4 p-1 px-3 text-slate-100`} />
    </form>
    )
}
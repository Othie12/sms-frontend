import { useEffect, useState } from "react"
import { AutoCapitalize, Requirement, SchoolClass } from "../Interfaces"
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterRequirement({classId, repull, setRepull}: {classId: string, repull: boolean, setRepull: any}) {
    const [requirement, setRequirement] = useState<Requirement>({});
    const [msg, setMsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        if(requirement.name === '')
            setMsg('Name cannot be empty');
        else{
            setMsg('');
            axios.post(`${apiUrl}/requirement`, requirement)
            .then(response => {
                response.status === 200 && setRequirement({});
                console.log(response.data);
                setRepull(!repull);
                alert(response.data);
            })
            .catch(error => {
                alert(error);
                console.log(error);
            });
        }
    }

    useEffect(() => {
        setRequirement({...requirement, class_id: classId})
    }, [repull]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        name === 'name' ? setRequirement({...requirement, [name]: AutoCapitalize(value)}) :
        setRequirement({...requirement, [name]: value});
    };

    return(
        <form className="md:lg:w-1/2 mx-auto" onSubmit={e => handleSubmit(e)}>
            <div className="font-[algerian] font-bold text-xl text-center">REQUIREMENT REGISTRATION</div>
            <div className="font-light text-purple-700 text-center">{msg}</div>
            <div className="mt-4 flex flex-col">
                <label htmlFor="name">Requirement Name:</label>
                <input className="inputstyle" type="text" name="name" placeholder="eg Toilet paper" value={requirement.name} onChange={e => handleInputChange(e)} accept="A-Z|a-z"/>
            </div>

            <div className="mt-4">
                <label htmlFor="compulsary">Compulsary:</label>
                <div className="flex">
                    <input type="radio" name="compulsary" value="Y" className="rounded-md" onClick={() => setRequirement({...requirement, compulsary: 'Y'})}/> Yes
                    <input type="radio" name="compulsary" value="N" className="rounded-md ml-4" onClick={() => setRequirement({...requirement, compulsary: 'N'})}/> No
                </div>
            </div>

            <div className="mt-4 flex flex-col">
                <label htmlFor="quantity">Quantity:</label>
                <input className="inputstyle" type="number" name="quantity" value={requirement.quantity} onChange={e => handleInputChange(e)}/>
            </div>

            <div className="mt-4 flex flex-col">
                <label htmlFor="price">Price:</label>
                <input className="inputstyle" type="number" name="price" onChange={e => handleInputChange(e)} value={requirement.price} placeholder="You can leave this blank if their is no price"/>
            </div>
{/*
            <div className="mt-4 flex flex-col">
                <label htmlFor="class_id">Class:</label>
                <select className="inputstyle" name="class_id" onChange={e => handleInputChange(e)}>
                    <option value=''>--select--</option>
                    {classes.map(schoolClass => 
                        <option value={schoolClass.id}>{schoolClass.name}</option>    
                    )}
                </select>
            </div>
*/}
            <input type="submit" name="submit" value='Register' className="inputstyle bg-purple-700 ring-1 ring-purple-700 mt-4 text-white" />
        </form>
    )
}
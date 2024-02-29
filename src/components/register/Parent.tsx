import { useState } from "react";
import { AutoCapitalize, Parent } from "../Interfaces";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterParent() {
    const [parent, setParent] = useState<Parent>({name: '', role: 'parent'});
    const [msg, setMsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        if(parent.name === '')
            setMsg('Name cannot be empty');
        else if(parent.sex === undefined || parent.sex === '')
            setMsg('Sex has Not been chosen');
        else{
            setMsg('');
            axios.post(`${apiUrl}/people`, parent)
            .then(response => {
                response.status === 200 && setParent({name: ''});
                console.log(response.data);
                alert(response.data);
            })
            .catch(error => {
                alert(error);
                console.log(error);
            });
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        name === 'name' ? setParent({...parent, [name]: AutoCapitalize(value)}) :
        setParent({...parent, [name]: value});
    };

    return(
            <div className="w-[98%] min-h-[97%] ring-purple-600 mt-2 p-2 mx-auto  bg-gradient-to-b from-purple-200 ring-1 rounded-md">
                <form className="md:lg:w-1/2 mx-auto" onSubmit={e => handleSubmit(e)}>
                    <div className="font-[algerian] font-bold text-xl text-center">PARENT REGISTRATION</div>
                    <div className="font-light text-purple-700 text-center">{msg}</div>
                        <div className="mt-4 flex flex-col">
                            <label htmlFor="name">Name:</label>
                            <input className="inputstyle" type="text" name="name" placeholder="eg John Doe" value={parent.name} onChange={e => handleInputChange(e)} accept="A-Z|a-z"/>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="email">E-mail:</label>
                            <input className="inputstyle" type="email" name="email" placeholder="eg something@gmail.com" value={parent.email} onChange={e => handleInputChange(e)}/>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="contact">Contact:</label>
                            <input className="inputstyle" type="tel" name="contact" placeholder="eg +256...... or 07......" value={parent.contact} onChange={e => handleInputChange(e)}/>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="sex">Sex:</label>
                            <div className="grid grid-cols-2 gap-2">
                                <span className={`${parent.sex === 'M' && 'bg-purple-500 text-white'} rounded-md inputstyle cursor-pointer`} onClick={() => setParent({...parent, sex: 'M'})}> Male </span>
                                <span className={`${parent.sex === 'F' && 'bg-purple-500 text-white'} rounded-md inputstyle cursor-pointer`} onClick={() => setParent({...parent, sex: 'F'})}> Female </span>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="picture">Picture:</label>
                            <input className="inputstyle" type="file" name="picture" onChange={e => handleInputChange(e)}/>
                        </div>
                    <input type="submit" name="submit" value='Register' className="inputstyle bg-purple-700 ring-1 ring-purple-700 mt-4 text-white" />
                </form>
            </div>
    )
}
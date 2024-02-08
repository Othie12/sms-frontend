import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar"
import { AutoCapitalize, User, SchoolClass, Subject } from "../Interfaces";
import axios from "axios";
import Template from "../Template";
const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterSubject() {
    return(<Template children={<Page />} />);

}
function Page() {
    const [subject, setSubject] = useState<Subject>({name: ''});
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [msg, setMsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        if(subject.name === '')
            setMsg('Name cannot be empty');
        else{
            setMsg('');
            axios.post(`${apiUrl}/subject`, subject)
            .then(response => {
                response.status === 200 && setSubject({name: ''});
                console.log(response.data);
                setMsg(response.data);
            })
            .catch(error => {
                setMsg(error);
                console.log(error);
            });
        }
    }

    useEffect(() => {
        axios.get(apiUrl + '/classes')
        .then(response => {
            setClasses(response.data);
        }).catch(error => console.error(error));
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        name === 'name' ? setSubject({...subject, [name]: AutoCapitalize(value)}) :
        setSubject({...subject, [name]: value});
    };

    const handleClassesInput = (value: SchoolClass) => {
        const prev = subject.classes?.filter(clas => clas.id !== value.id);
        if(!subject.classes?.includes(value)){
            prev !== undefined ?
            setSubject({...subject, classes: [...prev, value]})
            :
            setSubject({...subject, classes: [value]});
        }else{
            setSubject({...subject, classes: prev})
        }
    };

    console.log(subject);

    return(
        <div className="w-[98%] min-h-[97%] ring-purple-600 mt-2 p-2 mx-auto  bg-gradient-to-b from-purple-200 ring-1 rounded-md">
            <form className="md:lg:w-1/2 mx-auto" onSubmit={e => handleSubmit(e)}>
                <div className="font-[algerian] font-bold text-xl text-center">SUBJECT CREATION</div>
                <div className="font-light text-purple-700 text-center">{msg}</div>
                <div className="">
                    <div className="mt-4 flex flex-col">
                        <label htmlFor="name">Name:</label>
                        <input className="inputstyle" type="text" name="name" placeholder="eg English" value={subject.name} onChange={e => handleInputChange(e)} accept="A-Z|a-z"/>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label htmlFor="class_id">Classes that study this subject:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {classes.map(schoolClass => 
                                <div className={`specialinputstyle ${subject.classes?.includes(schoolClass) && 'selectedinputstyle text-white'}`} onClick={() => handleClassesInput(schoolClass)}>{schoolClass.name}</div>
                            )}
                        </div>
                    </div>
                </div>
                <input type="submit" name="submit" value='Register' className="inputstyle bg-purple-700 ring-1 ring-purple-700 mt-4 text-white" />
            </form>
        </div>
    )
}
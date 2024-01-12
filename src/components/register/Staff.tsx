import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar"
import { AutoCapitalize, User, SchoolClass, Subject } from "../Interfaces";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterStaff() {
    const [user, setUser] = useState<User>({name: '', role: 'teacher'});
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [msg, setMsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        if(user.name === '')
            setMsg('Name cannot be empty');
        else if(user.sex === undefined || user.sex === '')
            setMsg('Sex has Not been chosen');
        else{
            setMsg('');
            axios.post(`${apiUrl}/people`, user)
            .then(response => {
                response.status === 200 && setUser({name: ''});
                console.log(response.data);
                alert(response.data);
            })
            .catch(error => {
                alert(error);
                console.log(error);
            });
        }
    }

    useEffect(() => {
        axios.get(apiUrl + '/classes')
        .then(response => {
            setClasses(response.data);
        }).catch(error => console.error(error));

        axios.get(apiUrl + '/subjects')
        .then(response => {
            setSubjects(response.data);
        }).catch(error => console.error(error));
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        name === 'name' ? setUser({...user, [name]: AutoCapitalize(value)}) :
        setUser({...user, [name]: value});
    };

    const handleClassesInput = (value: SchoolClass) => {
        const prev = user.classes?.filter(clas => clas.id !== value.id);
        if(!user.classes?.includes(value)){
            prev !== undefined ?
            setUser({...user, classes: [...prev, value]})
            :
            setUser({...user, classes: [value]});
        }else{
            setUser({...user, classes: prev})
        }
    };

    const handleSubjectsInput = (value: Subject) => {
        const prev = user.subjects?.filter(subject => subject.id !== value.id);
        if(!user.subjects?.includes(value)){
            prev !== undefined ?
            setUser({...user, subjects: [...prev, value]})
            :
            setUser({...user, subjects: [value]});
        }else{
            setUser({...user, subjects: prev})
        }
    };

    console.log(user);

    return(
        <main className="flex">
        <Sidebar />
        <div className="w-full text-slate-900">
            <div className="w-[98%] min-h-[97%] ring-purple-600 mt-2 p-2 mx-auto  bg-gradient-to-b from-purple-200 ring-1 rounded-md">
                <form className=" mx-auto" onSubmit={e => handleSubmit(e)}>
                    <div className="font-[algerian] font-bold text-xl text-center">STAFF REGISTRATION</div>
                    <div className="font-light text-purple-700 text-center">{msg}</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mt-4 flex flex-col">
                            <label htmlFor="name">Name:</label>
                            <input className="inputstyle" type="text" name="name" placeholder="eg John Doe" value={user.name} onChange={e => handleInputChange(e)} accept="A-Z|a-z"/>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="email">E-mail:</label>
                            <input className="inputstyle" type="email" name="email" placeholder="eg something@gmail.com" value={user.email} onChange={e => handleInputChange(e)}/>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="contact">Contact:</label>
                            <input className="inputstyle" type="tel" name="contact" placeholder="eg +256...... or 07......" value={user.contact} onChange={e => handleInputChange(e)}/>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="role">Role:</label>
                            <select name="role" className="inputstyle" onChange={e => handleInputChange(e)} value={user.role}>
                                <option value="teacher">Teacher</option>
                                <option value="head_teacher">Head Teacher</option>
                                <option value="dos">D.O.S</option>
                                <option value="sectretary">Secretary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="sex">Sex:</label>
                            <div className="grid grid-cols-2 gap-2">
                                <span className={`${user.sex === 'M' && 'bg-purple-500 text-white'} rounded-md inputstyle cursor-pointer`} onClick={() => setUser({...user, sex: 'M'})}> Male </span>
                                <span className={`${user.sex === 'F' && 'bg-purple-500 text-white'} rounded-md inputstyle cursor-pointer`} onClick={() => setUser({...user, sex: 'F'})}> Female </span>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="picture">Picture:</label>
                            <input className="inputstyle" type="file" name="picture" onChange={e => handleInputChange(e)}/>
                        </div>
                    </div>
                    <div className="">
                        <div className="mt-4 flex flex-col">
                            <label htmlFor="class_id">Classes taught by this teacher:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {classes.map(schoolClass => 
                                    <div className={`specialinputstyle ${user.classes?.includes(schoolClass) && 'selectedinputstyle text-white'}`} onClick={() => handleClassesInput(schoolClass)}>{schoolClass.name}</div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="class_id">Subjects taught by this teacher:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {subjects.map(subject => 
                                    <div className={`specialinputstyle ${user.subjects?.includes(subject) && 'selectedinputstyle text-white'}`} onClick={() => handleSubjectsInput(subject)}>{subject.name}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <input type="submit" name="submit" value='Register' className="inputstyle bg-purple-700 ring-1 ring-purple-700 mt-4 text-white" />
                </form>
            </div>
        </div>
    </main>
    )
}
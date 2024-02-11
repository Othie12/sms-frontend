import { useEffect, useState } from "react"
import { AutoCapitalize, Parent, SchoolClass, Student,  } from "../Interfaces"
import axios from "axios";
import Template from "../Template";
import RegisterParent from "./Parent";

const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterStudent() {
    return(<Template children={<Page />} />);
}
function Page() {
    const [student, setStudent] = useState<Student>({name: ''});
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [msg, setMsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        if(student.name === '')
            setMsg('Name cannot be empty');
        else if(student.sex === undefined || student.sex === '')
            setMsg('Sex has Not been chosen');
        else if(student.class_id === undefined || student.class_id === '')
            setMsg('Class has not been chosen');
        else{
            setMsg('');
            axios.post(`${apiUrl}/student`, student)
            .then(response => {
                response.status === 200 && setStudent({name: ''});
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
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        name === 'name' ? setStudent({...student, [name]: AutoCapitalize(value)}) :
        setStudent({...student, [name]: value});
    };

    console.log(student)

    return(
        <div className="mt-2 p-2">
            <form className="md:lg:w-3/4 mx-auto" onSubmit={e => handleSubmit(e)}>
                <div className="font-[algerian] font-bold text-xl text-center">STUDENT REGISTRATION</div>
                <div className="font-light text-purple-700 text-center">{msg}</div>
                <p className="error-msg" >
                    If parent info is available, please first register the
                    parent and then the student
                </p>
                <div className="mt-4 flex flex-col">
                    <label htmlFor="name">Name:</label>
                    <input className="inputstyle" type="text" name="name" placeholder="eg John Doe" value={student.name} onChange={e => handleInputChange(e)} accept="A-Z|a-z"/>
                </div>

                <div className="mt-4">
                    <label htmlFor="sex">Sex:</label>
                    <div className="flex">
                        <input type="radio" name="sex" value="m" className="rounded-md" onClick={() => setStudent({...student, sex: 'm'})}/> Male
                        <input type="radio" name="sex" value="f" className="rounded-md ml-4" onClick={() => setStudent({...student, sex: 'f'})}/> Female
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="section">Section:</label>
                    <div className="flex">
                        <input type="radio" name="section" value="Boarding" className="rounded-md" onClick={() => setStudent({...student, section: 'Boarding'})}/> Boarding
                        <input type="radio" name="section" value="Day" className="rounded-md ml-4" onClick={() => setStudent({...student, section: 'Day'})}/> Day
                    </div>
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="picture">Picture:</label>
                    <input className="inputstyle" type="file" name="picture" onChange={e => handleInputChange(e)}/>
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="dob">D.O.B:</label>
                    <input className="inputstyle" type="date" name="dob" onChange={e => handleInputChange(e)} value={student.dob} />
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="dob">Date of Joining</label>
                    <input className="inputstyle" type="date" name="doj" onChange={e => handleInputChange(e)} value={student.doj} />
                </div>

                <div className="mt-4 flex flex-col">
                    <p className="error-msg" >If the parent already exists, please
                    don't register him/her again. Just search here</p>
                    <label htmlFor="parent_id">Parent:</label>
                    <SearchInput name="parent_id" searchUrl={`${apiUrl}/parent/search/`} stdnt={student} setter={setStudent} />
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="class_id">Class:</label>
                    <select className="inputstyle" name="class_id" onChange={e => handleInputChange(e)}>
                        <option value=''>--select--</option>
                        {classes.map(schoolClass => 
                            <option value={schoolClass.id}>{schoolClass.name}</option>    
                        )}
                    </select>
                </div>

                <input type="submit" name="submit" value='Register' className="inputstyle bg-purple-700 ring-1 ring-purple-700 mt-4 text-white" />
            </form>

            <RegisterParent />
        </div>
    )
}

interface SearchProps{
    searchUrl: string;
    stdnt: Student;
    setter: React.Dispatch<React.SetStateAction<Student>>;
    name: string;
}
function SearchInput(p: SearchProps){
    const [term, setTerm] = useState<string>('');
    const [content, setContent] = useState<Parent[]>([]);
    const [hidden, setHidden] = useState<string>('hidden');

    useEffect(() => {
        if(term !== ''){
            setHidden('');
            axios.get(p.searchUrl + term)
            .then(response => {
                setContent(response.data);
            }).catch(error => console.error(error));
        }else{
            setHidden("hidden");
        }
    }, [term]);
    
    return(
        <div className="">
            <input className="inputstyle" type="text" name="term" id="term" value={term} onChange={e => setTerm(e.target.value)}/>
            <div className={`${hidden} fixed bg-slate-400 z-10 rounded-md`}>
                <ul>
                    {content?.map(c => 
                        <li key={c.id}>
                            <div onClick={() => {p.setter({...p.stdnt, [p.name]: c.id}); setTerm(c.name || ''); setHidden('hidden')}}
                                className="rounded-lg hover:ring-1 ring-black hover:bg-black/50 p-2 w-full flex justify-between cursor-pointer"
                            >
                                <span>{c.name}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
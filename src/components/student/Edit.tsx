import { useEffect, useState } from "react"
import { AutoCapitalize, Parent, SchoolClass, Student,  } from "../Interfaces"
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export default function EditStudent({stdnt, repull, setRepull}: {stdnt: Student, repull: boolean, setRepull: any}) {
    const [student, setStudent] = useState<Student>();
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [hidden, setHidden] = useState<boolean>(true);
    const [msg, setMsg] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<Element>) => {
        e.preventDefault();
        if(!student){
            alert('please refresh');
            return;
        }
        if(student.name === '')
            setMsg('Name cannot be empty');
        else if(student.sex === '')
            setMsg('Sex has Not been chosen');
        else if(student.class_id === '')
            setMsg('Class has not been chosen');
        else{
            setMsg('');
            axios.patch(`${apiUrl}/student/${student.id}`, student)
            .then(response => {
                console.log(response.data);
                setRepull(!repull);
                setHidden(true);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        setStudent(stdnt);
        /*
        axios.get(apiUrl + '/student/' + id)
        .then(response => {
            setStudent(response.data);
        }).catch(error => {
            console.error(error);
        });
        */
        axios.get(apiUrl + '/classes')
        .then(response => {
            setClasses(response.data);
        }).catch(error => console.error(error));
    }, [hidden]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if(!student) return;
        const {name, value} = e.target;
        name === 'name' ? setStudent({...student, [name]: AutoCapitalize(value)}) :
        setStudent({...student, [name]: value});
    };

    if(student){
        return(
            <div className="m-4 p-4">
                <button className="inputstyle" onClick={() => setHidden(!hidden)}>Edit</button>
                <form className="mx-auto" hidden={hidden} onSubmit={e => handleSubmit(e)}>
                    <div className="font-[algerian] font-bold text-xl text-center">EDIT STUDENT INFO</div>
                    <div className="font-light text-purple-700 text-center">{msg}</div>
                    <div className="mt-4 flex flex-col">
                        <label htmlFor="name">Name:</label>
                        <input className="inputstyle" type="text" name="name" placeholder="eg John Doe" value={student.name} onChange={e => handleInputChange(e)} accept="A-Z|a-z"/>
                    </div>
    
                    <div className="mt-4">
                        <label htmlFor="sex">Sex:</label>
                        <div className="flex">
                            <input type="radio" name="sex" value="m" className="rounded-md" checked={student.sex === 'm'}  onClick={() => setStudent({...student, sex: 'm'})}/> Male
                            <input type="radio" name="sex" value="f" className="rounded-md ml-4" checked={student.sex === 'f'} onClick={() => setStudent({...student, sex: 'f'})}/> Female
                        </div>
                    </div>
    
                    <div className="mt-4 flex flex-col">
                        <label htmlFor="picture">Picture:</label>
                        <input className="inputstyle" type="file" name="picture" onChange={e => handleInputChange(e)}/>
                    </div>
    
                    <div className="mt-4 flex flex-col">
                        <label htmlFor="dob">D.O.B:</label>
                        <input className="inputstyle" type="date" aria-controls="true" name="dob" onChange={e => handleInputChange(e)} value={student && student.dob} />
                    </div>

                    <div className="mt-4 flex flex-col">
                        <label htmlFor="parent_id">Parent:</label>
                        <SearchInput name="parent_id" searchUrl={`${apiUrl}/parent/search/`} stdnt={student} setter={setStudent} />
                    </div>
 
                    <div className="mt-4 flex flex-col">
                        <label htmlFor="class_id">Class:</label>
                        <select className="inputstyle" name="class_id" onChange={e => handleInputChange(e)}>
                            <option value={student && student.class?.id}>{student && student.class?.name}</option>
                            {classes.map(schoolClass => 
                                <option value={schoolClass.id}>{schoolClass.name}</option>    
                            )}
                        </select>
                    </div>
    
                    <input type="submit" name="submit" value='Edit' className="inputstyle bg-purple-700 ring-1 ring-purple-700 mt-4 text-white" />
                </form>
            </div>
        )
    }else{
        return(
            <div>Please Refresh!!</div>
        )
    }
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
import { useState, useEffect } from "react";
import { Student, User } from "./components/Interfaces";
import axios from "axios";
import { Link } from "react-router-dom";

interface SearchProps{
    searchUrl: string;
    redirectUrl: string;
    pholder: string;
}
export default function Search(p: SearchProps){
    const [term, setTerm] = useState<string>('');
    const [content, setContent] = useState<User[] | Student[]>([]);
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
            <input placeholder={p.pholder} className="inputstyle" 
                    type="text" name="term" id="term" value={term} 
                    onChange={e => setTerm(e.target.value)} autoComplete="off"
            />
            <div className={`${hidden} fixed bg-black/50 backdrop-blur-md text-white z-10 rounded-md`}>
                <ul>
                    {content?.map(c => 
                        <li key={c.id}>
                            <Link to={p.redirectUrl + c.id} >
                                <span className={`px-2 pr-10
                                                hover:bg-black/50 p-2 w-full flex justify-between 
                                                cursor-pointer`}
                                                >
                                    {c.name}
                                </span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
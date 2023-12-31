import { NavLink } from "../Interfaces";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const links: NavLink[] = [
    {pathName: '/class/students', name: 'Students'},  
    {pathName: '/class/marksheet', name: 'Marksheet'},  
    {pathName: '/class/requirements', name: 'Requirements'},  
]

interface NavProps{classId?: string}
export default function NavBar({classId}: NavProps){
    return (
        <nav className="bg-purple-300 text-slate-500 text-lg">
            <ul className="flex p-1 justify-between">
                {links.map(l => 
                    <li><LinkItem l={l} id={classId}/></li>    
                )}
            </ul>
        </nav>
    );
}



interface linkProps {
    l: NavLink
    id?: string
}
function LinkItem({l, id}: linkProps){
    const right = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
    const down = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
    const [hidden, setHidden] = useState('hidden');
    const current = useLocation();
    const [caret, setCaret] = useState(right);
  
    return(
        <li key={l.name} className={`border-slate-900 rounded-md`}
        onClick={() => {setHidden(hidden === '' ? 'hidden' : ''); setCaret(caret === down ? right : down)}}
        >
            {l.sublinks ?
                <span className="cursor-pointer">
                    <span className={`flex justify-between p-2 hover:bg-slate-200/20 rounded-md ${current.pathname.includes(l.pathName) && 'border-b-2 bg-purple-500 text-white'}`}>
                        {l.name}
                        {caret}
                    </span>
                <ul className={`ml-4 font-light ${hidden}`}>
                    {l.sublinks.map(sl => 
                        <li className="w-full">
                            <Link className="hover:bg-white/50 rounded-md px-3 w-full p-2" to={sl.pathName}>{sl.name}</Link>
                        </li>
                    )}
                </ul>
              </span>
            :
            <Link className={`flex justify-between hover:bg-purple-500 hover:text-white transition duration-300 p-2 rounded-md ${current.pathname.includes(l.pathName) && 'border-b-2 bg-purple-500 text-white'}`}
                to={l.pathName + "/" + id}>
                {l.name}
            </Link>
            }
        </li>
    );
}
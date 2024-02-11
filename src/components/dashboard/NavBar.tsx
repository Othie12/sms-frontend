import { NavLink } from "../Interfaces";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Template from "../Template";
import { ReactNode } from "react";
import { useAuth } from "../../AuthContext";

interface NavProps{classId?: string, links?: NavLink[], chilren: ReactNode}

export default function NavBar({classId, chilren}: NavProps){
    return (<Template children={<Page classId={classId} chilren={chilren}/>} />)
}

function Page({classId, chilren}: NavProps){
    const {authUser} = useAuth();
    
    //links on the top navbar
    const links: NavLink[] = [
        {pathName: '/class/students', name: 'Students', condition: true},  
        {pathName: '/class/marksheet', name: 'Marksheet', condition: true},  
        {pathName: '/class/requirements', name: 'Requirements', condition: true},  
        {pathName: '/class/settings', name: 'Settings', condition: authUser?.class !== undefined},  
    ];

    return (
        <div>
        <nav className="bg-purple-300 text-slate-500 text-lg">
            <ul className="flex p-1 justify-between">
                {links.map(l => l.condition &&
                    <li><LinkItem l={l} id={classId}/></li>    
                )}
            </ul>
        </nav>
            {chilren}
        </div>
    );
}

/*
export default function NavBar({classId, links}: NavProps){
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
*/


interface linkProps {
    l: NavLink
    id?: string
}
export function LinkItem({l, id}: linkProps){
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
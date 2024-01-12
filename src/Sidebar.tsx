import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { useState } from "react";
import { NavLink } from "./components/Interfaces";
import { useAuth } from "./AuthContext";

export default function Sidebar(){
    const {authUser, unsetCurrentUser} = useAuth();
    const imgUrl = process.env.REACT_APP_IMG_URL;
    const navigate = useNavigate();
    const links: NavLink[] = [
        {pathName: '/class', name: 'Dashboard'},  
        {pathName: '/marksheet', name: 'Marksheet', sublinks: 
            authUser?.classes?.map(clas => ({pathName: '/marksheet/' + authUser?.class?.id, name: clas.name}))
        },  
        {pathName: '/academia', name: 'Academia', sublinks: [
            {pathName: '/academia/aggregation/' + authUser?.class?.id, name: 'Aggregation'},
            {pathName: '/academia/comments/' + authUser?.class?.id, name: 'Comments'},
            {pathName: '/academia/attendance/' + authUser?.class?.id, name: 'Attendance'},
            {pathName: '/academia/calendar', name: 'Calendar'},
        ]},  
        {pathName: '/register', name: 'register', sublinks: [
            {pathName: '/register/staff', name: 'Staff'},
            {pathName: '/register/student', name: 'Student'},
            {pathName: '/register/subject', name: 'Subject'},
            {pathName: '/register/parent', name: 'Parent'},
            {pathName: '/register/requirement', name: 'Requirement'},
        ]},  
    ]
    const links2: NavLink[] = [
        {pathName: '#', name: 'Profile'},
    ]

    return(
        <div className='bg-purple-500 min-h-screen p-4 w-60 border-x-slate-700 overscroll-contain min-w-[300px]'>
            <img src={authUser?.profile_pic_filepath === null ? logo : `${imgUrl}/${authUser?.profile_pic_filepath}`} className="rounded-full w-1/3 mx-auto mb-4" alt="logo" />
            <nav className="text-white rounded-md overscroll-contain sticky top-0 bg-black/20 p-3 min-h-[300px]">
                <ul className="divide-y divide-gray-50">
                    <div className="">
                        {links.map(li => 
                            <LinkItem l={li} key={li.name}/>
                        )}
                    </div>
                    <div className="mt-4">
                        {links2.map(li => 
                            <LinkItem l={li} key={li.name}/>
                        )}
                        <button type="button" className="p-2 rounded-lg bg-black/50 ring-1 ring-black text-white" 
                        onClick={() => {unsetCurrentUser() ; navigate("/")}}>
                            Logout
                        </button>
                    </div>
                </ul>
            </nav>
        </div>
    );
}


interface linkProps {
    l: NavLink
}
function LinkItem({l}: linkProps){
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
        onClick={() => {setHidden(hidden === '' ? 'hidden' : ''); setCaret(hidden === '' ? right : down)}}
        >
            {l.sublinks ?
                <span className="cursor-pointer">
                    <span className={`flex justify-between p-2 hover:bg-slate-200/20 rounded-md ${current.pathname.includes(l.pathName) && 'border-b-2'}`}>
                        {l.name}
                        {caret}
                    </span>
                <ul className={`ml-4 w-full font-light ${hidden}`}>
                    {l.sublinks.map(sl => 
                        <li className="w-full" key={sl.name}>
                            <Link className="hover:bg-slate-200/20 rounded-md px-3 w-full p-2" to={sl.pathName}>{sl.name}</Link>
                        </li>
                    )}
                </ul>
              </span>
            :
            <Link className={`flex justify-between hover:bg-slate-200/20 p-2 rounded-md ${current.pathname.includes(l.pathName) && 'border-b-2'}`}
                to={l.pathName}>
                {l.name}
            </Link>
            }
        </li>
    );
}

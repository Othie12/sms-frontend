import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { useState } from "react";
import { NavLink } from "./components/Interfaces";
import { useAuth } from "./AuthContext";
import Search from "./Search";
import { create_calendar, permitted_everywhere, record_payment, register_staff, register_student } from "./Permissions";
const apiUrl = process.env.REACT_APP_API_URL;


//media query in javascript to handle sidebar collapse on different screens
const phoneWindowSize = window.matchMedia("(max-width: 700px)");

const bars_icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>


export default function Sidebar(){
    const {authUser, unsetCurrentUser} = useAuth();
    const [hidden, setHidden] = useState(phoneWindowSize.matches);
    const imgUrl = process.env.REACT_APP_IMG_URL;
    const navigate = useNavigate();
    
    if(!authUser?.role){
        return(<div>Please Login first</div>)
    }

    const links: NavLink[] = [
        {pathName: '/class', name: 'Dashboard', condition: true},  
        {pathName: '/scan-qr', name: 'Scan receipt code', condition: record_payment.includes(authUser.role)},
        {pathName: '/marksheet', name: 'Marksheet', sublinks: 
            authUser?.classes?.map(clas => ({pathName: '/marksheet/' + clas?.id + '/mid', name: clas.name}))
        , condition: authUser.classes && authUser.classes?.length > 0},  
        {pathName: '/academia', name: 'Academia', sublinks: [
            {pathName: '/academia/aggregation/' + authUser?.class?.id, name: 'Aggregation', condition: authUser.class !== undefined },
            {pathName: '/academia/comments/' + authUser?.class?.id, name: 'Comments', condition: authUser.class !== undefined || permitted_everywhere.includes(authUser.role)},
            {pathName: '/academia/attendance/' + authUser?.class?.id, name: 'Attendance', condition: authUser.class !== undefined},
            {pathName: '/academia/calendar', name: 'Calendar', condition: create_calendar.includes(authUser.role)},
        ], condition: true},  
        {pathName: '/register', name: 'register', sublinks: [
            {pathName: '/register/staff', name: 'Staff', condition: register_staff.includes(authUser.role)},
            {pathName: '/register/student', name: 'Student', condition: register_student.includes(authUser.role)},
            {pathName: '/register/subject', name: 'Subject', condition: register_staff.includes(authUser.role)},
        ], condition: true},  
    ]

    const links2: NavLink[] = [
        {pathName: '/user/' + authUser?.id, name: 'Profile'},
    ]

    return(
        <div className='print:hidden bg-purple-400 to-pink-500 
                        md:lg:min-h-screen p-4 w-full md:lg:w-60 
                        border-x-slate-700 overscroll-contain min-w-[300px]
                        sticky top-0
        '>
            {phoneWindowSize.matches &&
            <button onClick={() => setHidden(!hidden)} className="-ml-0">
                {bars_icon}
            </button>
            }
            <img  hidden={hidden} src={authUser?.profile_pic_filepath === null ? logo : `${imgUrl}/${authUser?.profile_pic_filepath}`} className="rounded-full w-1/3 mx-auto mb-4" alt="logo" />
                <div hidden={hidden} className="mb-4"><Search searchUrl={apiUrl + "/user/search/"} redirectUrl="/user/" pholder="Search Staff / Parent" /></div>
            <nav hidden={hidden} className="text-white rounded-md overscroll-contain sticky top-0 bg-black/20 p-3 min-h-[300px]">
                <ul className="divide-y divide-gray-50">
                    <div className="">
                        {links.map(li => li.condition &&
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
                    {l.sublinks.map(sl => sl.condition &&
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

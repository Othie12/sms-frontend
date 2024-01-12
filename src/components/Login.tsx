import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
axios.defaults.withCredentials = true;


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const { setCurrentUser } = useAuth();

    useEffect(() => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        .then(r => console.log(r))
        .catch(e => console.error(e));
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        axios.post(apiUrl + '/login', {
                email: email,
                password: password,
            },{
                headers: {
                    "Content-Type": "application/json",
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            }).then(response => {
                if (response.status === 200){
                    console.log(response.data);
                    setCurrentUser(response.data)
                    navigate('/class');
                }else {
                    setLoginErr("Wrong name or password");
                    console.log('Err1' + response.data.error);
                }
            })
            .catch(error => {console.error('Err2' + error)
                setLoginErr("Wrong name or password");
            });
    };
    

    return (
        <div className="h-screen items-center flex justify-center bgimg text-white">
            <div className="flex justify-center my-auto">
                <section>
                    <div className="text-center text-3xl mb-4 font-bold text-slate-300 border-t-2 rounded-lg font-serif">SEETA PRIMARY SCHOOL</div>
                <form className="p-auto ring-2 ring-slate-500 px-6 py-8 rounded-lg bg-black/50 backdrop-blur-md w-80 mx-auto" onSubmit={ handleSubmit }>
                <div className="font-bold flex justify-center">Login</div>
                    <div className="mt-4">
                        <div className="">
                            <label htmlFor="email">Email: </label>
                        </div>
                        <div className="">
                            <input type="email" 
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} 
                                    className="rounded-md ring-1 ring-slate-600 p-1 
                                            bg-slate-50/10"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="">
                            <label htmlFor="password">Passsword: </label>
                        </div>
                        <div className="">
                            <input type="password" 
                                    name="password"  
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} 
                                    className="rounded-md ring-1 ring-slate-600 p-1 
                                            bg-slate-50/20"
                            />
                        </div>
                    </div>
                    <div className="text-red-700"> {loginErr} </div>
                    <div className="flex justify-end">
                    <button type="submit" className="bg-puple-500 text-white font-light shadow-md ring-1 ring-gray-400 px-6 rounded-lg my-4">
                        Login
                    </button>
                    </div>
                </form>
                </section>
            </div>
        </div>
    );
}
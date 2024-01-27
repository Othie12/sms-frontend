import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User, imgPlaceholder } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
const apiUrl = process.env.REACT_APP_API_URL;
const imgUrl = process.env.REACT_APP_IMG_URL;

export default function UserProfile(){
    const [user, setUser] = useState<User>({name: ''});
    const {id} = useParams();

    useEffect(() => {
        axios.get(apiUrl + '/user/' + id)
        .then(r => {
            console.log(r.data);
            setUser(r.data);
        }).catch(e => console.error(e));
    }, [id]);

    return(
        <main className="flex">
        <Sidebar />
            <div className="w-full grid grid-cols-1 gap-2">
                <div className="rounded-lg ring-purple-600 m-2 p-2 bg-purple-100 ring-1">
                    <div className="divide-y divide-purple-500" >
                        <div className="flex divide-x divide-purple-500">
                            <div className="w-40 h-40">
                                {user.profile_pic_filepath === null ? 
                                    imgPlaceholder
                                    :
                                    <img src={`${imgUrl}/${user.profile_pic_filepath}`} 
                                        className="w-full h-full rounded-full mr-1" 
                                        alt="photo" 
                                    />
                                }
                            </div>
                            <div className="ml-4 pl-4">
                                <p className="font-bold text-xl">{user.name}</p>
                                <p className="font-light">{user.contact}</p>
                                <p className="font-light text-xl">{user.sex?.toLowerCase() == 'm' ? 'Male' : 'Female'}</p>
                                <p className="font-light text-xs text-blue-500">{user.role?.toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 divide-x">
                        {user.classes && 
                        <div className="mt-2">
                            <h1 className="text-center text-purple-800">CLASSES</h1>
                            <div className="grid grid-cols-1 gap-2">
                                {user.classes.map(clas => 
                                    <div className="inputstyle p-6">{clas.name}</div>
                                )}
                            </div>
                            </div>
                            }
                        {user.subjects && 
                        <div className="mt-2">
                            <div className="text-center text-purple-800">SUBJECTS</div>
                            <div className="grid grid-cols-1 gap-2">
                                {user.subjects.map(clas => 
                                    <div className="inputstyle bg-blue-300 p-6">{clas.name}</div>
                                )}
                            </div>
                            </div>
                            }
                        </div>
                        {user.children && 
                        <div className="mt-2">
                            <div className="text-center text-purple-800">CHILDREN</div>
                            <div className="grid grid-cols-1 gap-2">
                                {user.children.map(child => 
                                    <Link to={'/student/' + child.id}>
                                        <div className="inputstyle bg-blue-300 flex justify-between text-lg font-bold">
                                        {child.name}
                                        <div className="w-14 h-14">
                                            {child.profile_pic_filepath === null ? 
                                                imgPlaceholder
                                                :
                                                <img src={`${imgUrl}/${child.profile_pic_filepath}`} 
                                                    className="w-full h-full rounded-full mr-1" 
                                                    alt="photo" 
                                                />
                                            }
                                        </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            </div>
                        }
                        </div>
                </div>
            </div>
    </main>
    );
}
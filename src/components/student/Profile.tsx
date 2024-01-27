import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Student, imgPlaceholder } from "../Interfaces";
import axios from "axios";
import Sidebar from "../../Sidebar";
import CameraAvatarEditor from "../../utils/ImageUpload";
const apiUrl = process.env.REACT_APP_API_URL;
const imgUrl = process.env.REACT_APP_IMG_URL;

export default function StudentProfile(){
    const [student, setStudent] = useState<Student>({name: ''});
    const {id} = useParams();

    useEffect(() => {
        axios.get(apiUrl + '/student/' + id)
        .then(r => {
            console.log(r.data);
            setStudent(r.data);
        }).catch(e => console.error(e));
    }, []);

    return(
        <main className="flex">
        <Sidebar />
            <div className="w-full grid grid-cols-1 gap-2">
                <div className="rounded-lg ring-purple-600 m-2 p-2 bg-purple-100 ring-1">
                    <div className="divide-y divide-purple-500" >
                        <div className="flex divide-x divide-purple-500">
                            <div className="w-40 h-40">
                                {student.profile_pic_filepath === null ? 
                                    imgPlaceholder
                                    :
                                    <img src={`${imgUrl}/${student.profile_pic_filepath}`} 
                                        className="w-full h-full rounded-full mr-1" 
                                        alt="photo" 
                                    />
                                }
                            </div>
                            <div className="ml-4 pl-4">
                                <p className="font-bold text-xl">{student.name}</p>
                                <p className="font-light">{student.class?.name}</p>
                                <p className="font-light text-xl">{student.sex?.toLowerCase() == 'm' ? 'Male' : 'Female'}</p>
                            </div>
                        </div>
                        <CameraAvatarEditor />
                        <div className="mt-2">
                            <h1 className="text-center text-purple-800">PARENT</h1>
                            {student.parent && 
                                   <Link to={'/user/' + student.parent.id}>
                                   <div className="inputstyle bg-blue-300 flex justify-between text-lg font-bold">
                                   {student.parent.name}
                                   <div className="w-14 h-14">
                                       {student.parent.profile_pic_filepath === null ? 
                                           imgPlaceholder
                                           :
                                           <img src={`${imgUrl}/${student.parent.profile_pic_filepath}`} 
                                               className="w-full h-full rounded-full mr-1" 
                                               alt="photo" 
                                           />
                                       }
                                    </div>
                                </div>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
    </main>
    );
}
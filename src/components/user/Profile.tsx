import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AutoCapitalize, SchoolClass, Subject, User, imgPlaceholder } from "../Interfaces";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import Template from "../Template";
const apiUrl = process.env.REACT_APP_API_URL;
const imgUrl = process.env.REACT_APP_IMG_URL;


export default function UserProfile(){
    return(<Template children={<Page />} />);
}

function Page(){
    const [user, setUser] = useState<User>({name: ''});
    const {authUser} = useAuth();
    const {id} = useParams();

    useEffect(() => {
        axios.get(apiUrl + '/user/' + id)
        .then(r => {
            console.log(r.data);
            setUser(r.data);
        }).catch(e => console.error(e));
    }, [id]);

    return(
            <div className="">
                <div className="flex default-container">
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
                <div className="grid md:lg:grid-cols-2 gap-5 m-2">
                {user.classes && user.classes.length > 0 &&
                    <div className="">
                        <h1 className="text-center text-purple-800">CLASSES</h1>
                        <div className="grid grid-cols-1 gap-2">
                            {user.classes.map(clas => 
                                <div className="inputstyle p-6">{clas.name}</div>
                            )}
                        </div>
                    </div>
                }
                {user.id && user.role !== 'parent' &&
                    <ClassDiv passedObjects={user.classes} userId={user.id} objectType="classes"/>
                }
                {user.subjects && user.subjects.length > 0 && 
                    <div className="">
                        <div className="text-center text-purple-800">SUBJECTS</div>
                        <div className="grid grid-cols-1 gap-2">
                            {user.subjects.map(clas => 
                                <div className="inputstyle bg-blue-300 p-6">{clas.name}</div>
                            )}
                        </div>
                    </div>
                }
                {user.id && user.role !== 'parent' &&
                    <ClassDiv passedObjects={user.subjects} userId={user.id} objectType="subjects"/>
                }
                </div>
                {user.children && user.children.length > 0 && 
                    <div className="m-2">
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
                {authUser !== null && authUser?.id !== undefined && user.id === authUser.id &&
                    <PasswordChange id={authUser.id} />
                }
            </div>
    );
}

function PasswordChange({id}: {id: string | number}){
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [hidden, setHidden] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        if(name === 'newPassword'){
            setNewPassword(value);
            if(value.length < 5)
                setMsg('New password must have atleast 5 values');
            else
                setMsg('');
        }

        if(name === 'repeatedPassword'){
            setRepeatedPassword(value);
            if(newPassword !== value)
                setMsg("The 2 passwords don't match");
            else 
                setMsg("");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(newPassword !== repeatedPassword){
            alert("The 2 passwords don't match")
            return;
        }

        axios.patch(apiUrl + '/user-password/' + id, {
            newPassword: newPassword,
            oldPassword: oldPassword,
        })
        .then((r) => {
            setHidden(!hidden);
            setOldPassword(''); setNewPassword(''); setRepeatedPassword('');
            alert(r.data.message);
        }).catch(e => {
            console.error(e);
            alert(e.response.data.error);
        });
    }

    return(
        <div className="m-2">
            <button className="inputstyle" onClick={() => setHidden(!hidden)}>Change Password</button>
            <form onSubmit={e => handleSubmit(e)} hidden={hidden}>
                <div className="error-msg">{msg}</div>
                <div className="mt-4 flex flex-col">
                    <label htmlFor="oldPassword">Old password:</label>
                    <input className="inputstyle" type="password" name="oldPassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
                </div>
                <div className="mt-4 flex flex-col">
                    <label htmlFor="newPassword">New password:</label>
                    <input className="inputstyle" type="password" name="newPassword" value={newPassword} onChange={e => handleChange(e)}/>
                </div>
                <div className="mt-4 flex flex-col">
                    <label htmlFor="repeatedPassword">Repeat New password:</label>
                    <input className="inputstyle" type="password" name="repeatedPassword" value={repeatedPassword} onChange={e => handleChange(e)}/>
                </div>
                <input type="submit" value="Submit" className="inputstyle mt-4" />
            </form>
        </div>
    )
}

function ClassDiv ({passedObjects, userId, objectType}: {passedObjects: (SchoolClass | Subject)[] | undefined, userId: number | string, objectType: string}){
    const [ids, setIds] = useState<number[]>([]);
    const [fetchedObjects, setFetchedObjects] = useState<(SchoolClass | Subject)[]>([]);
    
    const fetchObjects = () => {
        axios.get(`${apiUrl}/${objectType}`)
        .then(response => {
            setFetchedObjects(response.data);
        }).catch(e => console.error(e));
    };
    
    useEffect(() => {
        if(!passedObjects) return;
        setIds(passedObjects.map(clas => clas.id !== undefined ? clas.id : 0 ));
        fetchObjects();
    }, []);

    const handlePush = (id: number) => {
        setIds([...ids, id]);
    };

    const handlePop = (id: number) => {
        setIds(ids.filter(item => item !== id));
    };

    const handleSubmit = () => {
        axios.patch(apiUrl + '/user-' + objectType + '/' + userId, 
        objectType === 'classes' ? {classIds: ids} : {subjectIds: ids})
        .then((r) => {
            alert(r.data.message);
        }).catch(e => {
            console.error(e);
            alert(e.response.data.error);
        });

    }


    return(
        <div>
            <div className="error-msg text-purple-900">{AutoCapitalize(objectType)} tauhght by this teacher. click to remove</div>
            <div className="flex">
                {fetchedObjects.filter(clas => clas.id !== undefined && ids.includes(clas.id)).map(clas => 
                    <button className="p-1 bg-purple-400 rounded-md m-2" onClick={() => clas.id !== undefined && handlePop(clas.id)}>
                        {clas.name}
                    </button>    
                )}
            </div>
            
            <div className="error-msg text-blue-900 mt-4">Click to add</div>
            <div className="flex">
                {fetchedObjects.filter(clas => clas.id !== undefined && !ids.includes(clas.id)).map(clas => 
                <button className="p-1 bg-blue-400 rounded-md m-2" onClick={() => clas.id !== undefined && handlePush(clas.id)}>
                    {clas.name}
                </button>        
                )}
            </div>
            <button className="inputstyle" onClick={handleSubmit}>Save changes</button>
        </div>
    )
}
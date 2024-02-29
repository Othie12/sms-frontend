import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Student, imgPlaceholder } from "../Interfaces";
import axios from "axios";
import RecordPayment from "./Record-payment";
import EditStudent from "./Edit";
import Template from "../Template";
import { record_payment, register_student } from "../../Permissions";
import { useAuth } from "../../AuthContext";
const apiUrl = process.env.REACT_APP_API_URL;
const imgUrl = process.env.REACT_APP_IMG_URL;

export default function StudentProfile(){
    return(<Template children={<Page />} />);
}
function Page(){
    const [student, setStudent] = useState<Student>({name: ''});
    const [repull, setRepull] = useState<boolean>(false);
    const {id} = useParams();
    const {authUser} = useAuth();

    useEffect(() => {
        axios.get(apiUrl + '/student/' + id)
        .then(r => {
            console.log(r.data);
            setStudent(r.data);
        }).catch(e => console.error(e));
    }, [repull]);
    
    console.log(student.periods)
    return(
        <div className="m-2">
            <div className="flex default-container">
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
                    <p className="font-bold text-sm text-purple-700">{student.section}</p>
                    <p className="font-light text-xl">{student.sex?.toLowerCase() == 'm' ? 'Male' : 'Female'}</p>
                    <p><b>Schoolfees Balance:</b> {student.balance}</p>
                    {/*<ChangeBalance id={student.id} />*/}
                </div>
                {authUser?.role && register_student.includes(authUser.role) &&
                    <EditStudent stdnt={student} repull={repull} setRepull={setRepull}/>
                }
            </div>
                    {authUser?.role && record_payment.includes(authUser.role) && student.periods &&
                        <div className="rounded-md p-2 bg-purple-100">
                            <p className="text-center text-lg text-slate-500">Termly balance</p>
                            {student.periods.map(period => period.id && student.id &&
                                <div className="flex justify-between border-b-[2px]">
                                    <p>{period.name} - {period.date_from?.split('-')[0]}</p>
                                    <p>{student.balance_objs?.find(balanceObj => balanceObj.period_id === period.id)?.balance || (student.section === 'Day' ? student.class?.fees_day : student.class?.fees_boarding)}</p>
                                    <ChangeBalance periodId={period.id} studentId={student.id} repull={repull} setrepull={setRepull}/>
                                </div>
                            )}
                        </div>
                    }
                <div className="p-2 flex justify-around">
                    {/* <CameraAvatarEditor /> */}
                    {authUser?.role && record_payment.includes(authUser.role) &&
                        <RecordPayment student={student} repull={repull} setRepull={setRepull}/>
                    }
                </div>
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

            {authUser?.role && record_payment.includes(authUser.role) &&
            <div className="mt-4">
                <h1 className="text-center text-purple-800">PAYMENTS</h1>

                <table className="w-full">
                    <thead>
                        <tr className="backdrop-blur-md text-left bg-purple-300">
                            <th className="p-3">Amount</th>
                            <th>Term</th>
                            <th>Balance</th>
                            <th>Date paid</th>
                            <th>Payment method</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {student.payments?.map(payment =>
                        <tr className="border-b-2 border-purple-400 hover:bg-purple-200">
                            <td className="p-1">{payment.amount}</td>
                            <td>{student.periods?.find(period => period.id === payment.period_id)?.name}</td>
                            <td>{payment.balance}</td>
                            <td>{payment.date_paid}</td>
                            <td>{payment.payement_method}</td>
                            <Link to={'/reciept/' + payment.id}>
                                <td><button className="inputstyle hover:bg-purple-500">Reciept</button> </td>
                            </Link>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}

function ChangeBalance({periodId, studentId, repull, setrepull}: {studentId: number, periodId: number, repull: boolean, setrepull: any}){
    const [amount, setAmount] = useState<string>();
    const [hidden, setHidden] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${apiUrl}/balance/${studentId}/${periodId}`, {amount: amount})
        .then(r => {
            alert(r.data.message);
            setHidden(true);
            setrepull(!repull);
        }).catch(e => {
            alert(e.data.error);     
        });
    }

    return(
        <div>
            <button onClick={() => setHidden(!hidden)} className="inputstyle">
                Edit
            </button>
            <form className="" hidden={hidden} onSubmit={e => handleSubmit(e)}>
            <p className="error-msg">The balance on previous payments won't change</p>
                <input className="inputstyle" type="number" name="amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <input className="inputstyle" type="submit" value="CHANGE" />
            </form>
        </div>
    )
}
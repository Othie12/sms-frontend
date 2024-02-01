import { useEffect, useState } from "react";
import { Payment, Student } from "../Interfaces";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

interface paymentProps{
    student: Student;
}
export default function RecordPayment(p: paymentProps){
    const [payment, setPayment] = useState<Payment>({});
    const [formHidden, setFormHidden] = useState<string>('hidden')
    const [msg, setMsg] = useState<string>("This action can't be reversed so be extra careful")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setPayment({...payment, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(apiUrl + '/payment/' + p.student.id, payment)
        .then(r => {
            console.log(r);
            setPayment({});
            setMsg('recorded Succesfuly');
            window.location.reload();
        }).catch(e => {
            const errors = Object.values(e.response.data.errors).join('\n');
            console.error(e);
            alert(errors)
        });
    };

    return(
        <div>
            <button className="shadowstyle-1" onClick={() => setFormHidden(formHidden === '' ? 'hidden' : '')}>
                Record Payment
            </button>

            <form className={`${formHidden}`} onSubmit={e => handleSubmit(e)} >
                <div className="error-msg">
                    {msg}
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="name">Amount:</label>
                    <input className="inputstyle" 
                        type="number" name="amount" 
                        placeholder="Amount of money" value={payment.amount} 
                        onChange={e => handleInputChange(e)}
                    />
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="name">Date paid:</label>
                    <input className="inputstyle" 
                        type="date" name="date_paid" 
                        value={payment.date_paid} 
                        onChange={e => handleInputChange(e)}
                    />
                </div>

                <div className="mt-4 flex flex-col" >
                    <label htmlFor="payment_method">Payment method</label>
                    <select className="inputstyle" name='payment_method'>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                        <option value="Mobile Money">Mobile Money</option>
                    </select>
                </div>

                <div className="mt-4 flex flex-col" >
                    <label htmlFor="period_id">Period</label>
                    <select className="inputstyle" name="period_id" onChange={e => handleInputChange(e)}>
                        <option value="">--select here--</option>
                        {p.student.periods?.map(period =>
                            <option value={period.id}>
                                {period.name} - {period.date_to && period.date_to.split('-')[0]}
                            </option>
                        )}
                    </select>
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="name">Reason:</label>
                    <input className="inputstyle" 
                        type="text" name="reason" 
                        placeholder="Any extra details about payment" value={payment.reason} 
                        onChange={e => handleInputChange(e)}
                    />
                </div>

                <input className="inputstyle mt-4 mb-2" type="submit" value="Submit" />

            </form>
        </div>
    );
}
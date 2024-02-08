import { useState } from "react";
import Template from "../Template";
import { Payment, handleInputChange } from "../Interfaces";

export default function PaymentReport(){
    return(
        <Template children={<Page />} />
    );
}

interface FilterParams {
    date_from?: string;
    date_to?: string;
}

function Page() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [parameters, setParameters] = useState<FilterParams>({})

    return(
        <div className="flex justify-between">
            <p>Filter the payment details you'd want to see depending on the following parameters</p>
            <div>
                <input type="date" value={parameters.date_from} onChange={e =>handleInputChange(e, parameters, setParameters)} />
                <input type="date" value={parameters.date_to} onChange={e =>handleInputChange(e, parameters, setParameters)} />
            </div>
        </div>
    )
}
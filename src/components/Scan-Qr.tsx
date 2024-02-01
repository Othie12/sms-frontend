import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ScanQr(){
    return(
        <Template children={<Page />} />
    );
}

function Page(){
    const [msg, setMsg] = useState('Use your camera to scan the QR code on the reciept card');
    const navigate = useNavigate();

    const handleDecode = (text: string) => {
        axios.get(apiUrl + '/payment/search-hash/' + text)
        .then(r => {
            navigate('/reciept/' + r.data.id)
        }).catch((e) => {
            console.error("Failure: " + e);
            alert("No payment corresponds to this code")
        });
    }
    console.log(msg);
    return(
        <div>
            <p className="error-msg">{msg}</p>
            <QrScanner onDecode={text => handleDecode(text)} onError={e => setMsg(e.message)} />
        </div>
    )
}
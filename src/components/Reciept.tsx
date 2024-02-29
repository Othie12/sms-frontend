import axios from "axios";
import Template from "./Template";
import logo from '../logo.png';
import { useEffect, useRef, useState } from "react";
import { AutoCapitalize, Payment } from "./Interfaces";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { QRCode } from "react-qrcode-logo";
const apiUrl = process.env.REACT_APP_API_URL;

const numberToWords = require('number-to-words');

export default function Reciept(){
    return(
        <Template children={<Page />} />
    );
}

function Page() {
    const [payment, setPayment] = useState<Payment>({});
    const {id} = useParams();
    
    const today = new Date().toDateString();
    
    const receiptRef = useRef(null);

    useEffect(() => {
        axios.get(apiUrl + '/payment/' + id)
        .then(r => {
            setPayment(r.data)
        }).catch(() => alert("Not Reachable"));
    }, []);
    

    const downloadReceipt = () => {
        if(receiptRef.current !== null) {
            html2canvas(receiptRef.current)
            .then((canvas) => {
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `reciept-${payment.student?.name}-${payment.period?.name}-${today}.png`;
                link.click();
              })
              .catch((error) => {
                console.error('Error generating image:', error);
              });
        }else{
            console.error("Ref still null");
        }
    }

    return(
        <div className="p-4" ref={receiptRef}>
            <div className="text-center mb-4 flex">
                <img src={logo} className="w-40 h-40" alt="School Badge" />
                <div className="w-full">
                    <div className="border-b-2 border-slate-600 mx-4">
                        <h2 className="font-bold text-xl">SEETA C.O.U PRIMARY SCHOOL</h2>
                        <p>SEETA</p>
                        <p className="text-sm font-light">TEL: 070........</p>
                    </div>
                    <div className="flex justify-around align-middle">
                        <p>RECEIPT CARD</p>
                        <div>{today}</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <table className="text-left">
                    <tr>
                        <th  className="p-4">Student Name: </th>
                        <td>{payment.student?.name}</td>
                    </tr>
                    <tr>
                        <th className="p-4">Payment For: </th>
                        <td>School Fees</td>
                        <th className="p-4">Term: </th>
                        <td>{payment.period?.name} {payment.period?.date_from?.split('-')[0]}</td>
                    </tr>
                    <tr>
                        <th className="p-4">Amount in words: </th>
                        <td>{payment.amount && AutoCapitalize(numberToWords.toWords(payment.amount))} Shillings only</td>
                    </tr>
                    <tr>
                        <th className="p-4">Figures: </th>
                        <td>Ugx.{payment.amount}</td>
                        <th className="">Overall Balance: </th>
                        <td>Ugx.{payment.balance}</td>
                    </tr>
                    <tr>
                        <th className="p-4">Term Balance: </th>
                        <td>Ugx.{payment.balance_obj?.balance}</td>
                    </tr>
                </table>
                <QRCode value={payment.hash} />
            </div>
            <div className="print:hidden flex justify-center">
                <button className="inputstyle" onClick={downloadReceipt}>Download Receipt</button>
            </div>
        </div>
    );
}


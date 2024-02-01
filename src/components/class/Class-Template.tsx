import axios from "axios";
import Template from "../Template";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ClassTemplate(){
    return(
        <Template children={<Wrapper />} />
    );
}

function Wrapper() {
    return(
    <>Not Used Yet</>
    );
}
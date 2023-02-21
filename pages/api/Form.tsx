import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import React, { useState } from 'react';
import Confirm from './Confirm';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Result from "./Result";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { League_Gothic } from "@next/font/google";
import { IFormValues } from "./IFormValues";

type recordProps = {
    [key:string]:{
        "value": string
    }
}
type dataProps = {
    [key:string] : string
}

function SendKintonAPI(data:dataProps) {
    const headers = {
        "Content-type": "application/json",
    }
    const url = 'http://172.20.45.11:8081/form';

    const record:recordProps = {}
    for (const key in data) {
        record[key] = {"value": data[key]}
    }
    const response_data = {
        "app": 73,
        "record": record
    }

    axios.post<[]>(url, response_data, { headers: headers }).then((res) => {
        console.log(res.data);
    }).catch((error) => {
        console.log(error);
    });      
}


export default function Form() {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [responseCode, setResponseCode] = useState<number>(200)

    const methods = useForm({
        mode: "onChange"
    })
    
    const handleSubmit = methods.handleSubmit((data) => {
        //SendKintonAPI(data);        
        if (pageNumber == 4) {
            //SendKintonAPI(data)
            console.log(data)
        }
        setPageNumber(pageNumber => pageNumber + 1)
        setResponseCode(200)
    });

    const onBack = () => {
        setPageNumber(1)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit} >
                {pageNumber === 1 && <Page1 />}
                {pageNumber === 2 && <Page2 />}
                {pageNumber === 3 && <Page3 />}
                {pageNumber === 4 && <Confirm onBack={() => onBack()}/>}
                {pageNumber === 5 && <Result responseCode={responseCode} />}
            </form>
        </FormProvider>
    )
}

    

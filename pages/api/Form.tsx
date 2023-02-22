import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import React, { useState } from 'react';
import Confirm from './Confirm';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Result from "./Result";
import SendAPI from "./SendAPI";

export default function Form() {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [responseCode, setResponseCode] = useState<number>(200)

    const methods = useForm({
        mode: "onChange"
    })
    
    const handleSubmit = methods.handleSubmit((data) => {
        if (pageNumber < 2) {
            setPageNumber(pageNumber => pageNumber + 1)
            scrollTo(0,0)
        }     
        if (pageNumber == 2) {
            // console.log(data.SAML認証_メタデータ.item(0))
            // data['SAML認証_メタデータ'] = data.SAML認証_メタデータ[0]
            SendAPI(data).then(result => {
                setResponseCode(result)
                setPageNumber(pageNumber => pageNumber + 1)
                scrollTo(0,0)
            });
        } 
    });

    const onBack = () => {
        setPageNumber(1)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit} >
                {pageNumber === 1 && <Page1 />}
                {pageNumber === 2 && <Confirm onBack={() => onBack()}/>}
                {pageNumber === 3 && <Result responseCode={responseCode} />}
                {/* {pageNumber === 2 && <Page2 />}
                {pageNumber === 3 && <Page3 />}
                {pageNumber === 4 && <Confirm onBack={() => onBack()}/>}
                {pageNumber === 5 && <Result responseCode={responseCode} />} */}
            </form>
        </FormProvider>
    )
}

    

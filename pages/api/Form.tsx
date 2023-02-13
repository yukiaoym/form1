import { useForm, FormProvider } from "react-hook-form";
import React, { useState } from 'react';
import Confirm from './Confirm';
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Result from "./Result";

export default function Form() {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [responseCode, setResponseCode] = useState<number>(200)

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            'O365・G_suite切替': '切替前',
            'POP認証時にメールアドレス全体で認証する': 'はい',
            'DKIM認証を利用する': '利用しない'
        }
    })

    const onSubmit = (data) => {
        // console.log(data)
        setPageNumber(pageNumber => pageNumber + 1)
        setResponseCode(200)
    }
    const onBack = () => {
        setPageNumber(1)
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} >
                {pageNumber === 1 && <Page1 />}
                {pageNumber === 2 && <Page2 />}
                {pageNumber === 3 && <Page3 />}
                {pageNumber === 4 && <Confirm onBack={() => onBack()}/>}
                {pageNumber === 5 && <Result responseCode={responseCode} />}
            </form>
        </FormProvider>
    )
}

    

import { useFormContext } from "react-hook-form";
import { Input, Pulldown, Radio, Checkbox, MultiText } from './Elements';
import React from 'react';
import Progress from './Progress';
import { IFormValues } from "./IFormValues";
import Button from "./Button";

export default function Page2() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, watch } = methods;   

    return (
        <>
            <Progress page={2} />
            <Input label='dummy1' register={register} type="text" required={false} errors={errors} />
            <Input label='dummy2' register={register} type="text" required={false} errors={errors} />
            <Input label='dummy3' register={register} type="text" required={false} errors={errors} />
            <Button value='次へ' isBack={false} />
        </>
    )
        
}    

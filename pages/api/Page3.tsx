import { useFormContext } from "react-hook-form";
import { Input, Pulldown, Radio, Checkbox, MultiText } from './Elements';
import React from 'react';
import Progress from './Progress';
import { IFormValues } from "./IFormValues";
import Button from './Button';

export default function Page3() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, watch } = methods;

    return (
        <>
            <Progress page={3} />
            <Input label='dummy4' register={register} type="text" required={false} errors={errors} />
            <Input label='dummy5' register={register} type="text" required={false} errors={errors} />
            <Input label='dummy6' register={register} type="text" required={false} errors={errors} />
            <Button value='次へ' isBack={false} />
        </>
    )
        
}    

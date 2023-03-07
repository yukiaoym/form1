import { useFormContext } from "react-hook-form";
import React from 'react';
import { IFormValues } from "../config/IFormValues";
import Button from "../../components/parts/Button";
import { Input, HideInput, MultiText, Radio } from "../../components/parts/Element";
import { Section } from "../config/Style";
import { get4DaysLater } from '../config/common_setting'

export default function Page3() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, setValue } = methods;   

    return (
        <>
            <HideInput label='タイプ' register={register} value='解約' sub={false} />
            <Section>
                <Input label='ご契約社名' register={register} required={true} errors={errors} sub={false}/>
            </Section>
            <Section>
                <Input label='ドメイン' register={register} required={true} errors={errors} sub={false} />
            </Section>
            <Section>
                <Input label='解約希望日' register={register} required={true} type='date' min={get4DaysLater()} errors={errors} sub={false} />
            </Section>
            <Section>
                <MultiText label='解約理由' register={register} required={true} type='date' min={get4DaysLater()} errors={errors} sub={false} />
            </Section>            
            <Button value='次へ' isBack={false} />
        </>
    )
}    


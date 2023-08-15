import { useFormContext } from "react-hook-form";
import React from 'react';
import { IFormValues } from "../config/IFormValues";
import Button from "../../components/parts/Button";
import { Input, HideInput, Checkbox, MultiText } from "../../components/parts/Element";
import { Section } from "../config/Style";
import { get4DaysLater, MGPlan } from '../config/common_setting'

export default function Page2() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors } } = methods;

    return (
        <>
            <HideInput label='タイプ' register={register} value='変更' sub={false} />
            <Section>
                <Input label='ご契約社名' register={register} required={true} errors={errors} sub={false} />
            </Section>
            <Section>
                <Input label='ドメイン' register={register} required={true} errors={errors} sub={false} />
            </Section>
            <Section>
                <Input label='変更希望日' register={register} required={true} type='date' min={get4DaysLater()} errors={errors} sub={false} />
            </Section>
            <Section>
                <Input 
                    label='ご契約アカウント数'
                    register={register}
                    required={false}
                    errors={errors}
                    type='number'
                    min='0'
                    // pattern={/^[0-9]+0$/}
                    // errmsg='10アカウント単位で指定してください'
                    sub={false}
                />
            </Section>
            <Section>
                <Checkbox label='MGΣ_プラン_追加' register={register} mgplan_list={MGPlan} sub={false} errors={errors} />
            </Section>
            <Section>
                <Checkbox label='MGΣ_プラン_削除' register={register} mgplan_list={MGPlan} sub={false} errors={errors} />
            </Section>
            <Section>
                <MultiText label='備考' register={register} errors={errors} sub={false} />
            </Section>            
            <Button value='次へ' isBack={false} />
        </>
    )
        
}    

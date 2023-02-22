import { useFormContext } from "react-hook-form";
import React from 'react';
import Progress from './parts/Progress';
import { IFormValues } from "./IFormValues";
import Button from "./parts/Button";
import { Input, MultiText, Radio } from "./parts/Element";
import SectionTitle from "./parts/SectionTitle";
import { Section } from "./parts/Style";

export default function Page2() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, watch } = methods;   

    return (
        <>
            <Progress page={2} />
            <Section>
                <MultiText label='MailGates_IPアクセス制御' register={register} errors={errors} sub={false} />
            </Section>
            <Section>
                <SectionTitle label='管理者メールアドレス' required={false} sub={false} />
                <Input label='管理者メールアドレス1' register={register} required={false} errors={errors} sub={true} />
                <Input label='管理者メールアドレス2' register={register} required={false} errors={errors} sub={true} />
                <Input label='管理者メールアドレス3' register={register} required={false} errors={errors} sub={true} />
                <Input label='管理者メールアドレス4' register={register} required={false} errors={errors} sub={true} />
                <Input label='管理者メールアドレス5' register={register} required={false} errors={errors} sub={true} />
            </Section>
            <Button value='次へ' isBack={false} />
        </>
    )
        
}    

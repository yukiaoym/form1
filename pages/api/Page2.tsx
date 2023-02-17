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
                <SectionTitle label='DKIM認証を利用する' required={false} sub={false} />
                <Radio label='DKIM認証を利用する' register={register} list={['利用する', '利用しない']} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='MailGates IPアクセス制御' required={false} sub={false} />
                <MultiText label='MailGates_IPアクセス制御' register={register} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='管理者メールアドレス' required={false} sub={false} />
                <SectionTitle label='管理者1' required={false} sub={true} />
                <Input label='管理者メールアドレス1' register={register} required={false} errors={errors} />
                <SectionTitle label='管理者2' required={false} sub={true} />
                <Input label='管理者メールアドレス2' register={register} required={false} errors={errors} />
                <SectionTitle label='管理者3' required={false} sub={true} />
                <Input label='管理者メールアドレス3' register={register} required={false} errors={errors} />
                <SectionTitle label='管理者4' required={false} sub={true} />
                <Input label='管理者メールアドレス4' register={register} required={false} errors={errors} />
                <SectionTitle label='管理者5' required={false} sub={true} />
                <Input label='管理者メールアドレス5' register={register} required={false} errors={errors} />
            </Section>
            <Button value='次へ' isBack={false} />
        </>
    )
        
}    

import { useFormContext } from "react-hook-form";
import React from 'react';
import Progress from './parts/Progress';
import { IFormValues } from "./IFormValues";
import Button from "./parts/Button";
import { Input, MultiText, Radio } from "./parts/Element";
import SectionTitle from "./parts/SectionTitle";
import { Section } from "./parts/Style";

export default function Page3() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, watch } = methods;   

    return (
        <>
            <Progress page={3} />
            <Section>
                <SectionTitle label='パートナー情報' required={false} sub={false} />
                <Input label='パートナー_会社名' register={register} required={false} errors={errors} sub={true} />
                <Input label='パートナー_部署' register={register} required={false} errors={errors} sub={true} />
                <Input label='パートナー_担当者' register={register} required={false} errors={errors} sub={true} />
                <Input label='パートナー_メールアドレス' register={register} required={false} errors={errors} sub={true} />
                <Input label='パートナー_TEL' register={register} required={false} errors={errors} sub={true} />
            </Section>

            <Section>
                <SectionTitle label='サポート窓口情報' required={false} sub={false} />
                <Input label='サポート窓口_会社名' register={register} required={false} errors={errors} sub={true} />
                <Input label='サポート窓口_担当者名' register={register} required={false} errors={errors} sub={true} />
                <Input label='サポート窓口_メールアドレス' register={register} required={false} errors={errors} sub={true} />
                <Input label='サポート窓口_TEL' register={register} required={false} errors={errors} sub={true} />
            </Section>

            <Section>
                <SectionTitle label='開通通知先情報' required={false} sub={false} />
                <Input label='開通通知用_会社名' register={register} required={false} errors={errors} sub={true} />
                <Input label='開通通知用_担当者名' register={register} required={false} errors={errors} sub={true} />
                <Input label='開通通知用_TO宛先' register={register} required={false} errors={errors} sub={true} />
            </Section>
            <Button value='次へ' isBack={false} />
        </>
    )
}    


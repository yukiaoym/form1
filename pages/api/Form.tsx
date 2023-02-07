import { useForm, SubmitHandler } from "react-hook-form";
import styled from 'styled-components';
import { Text, Pulldown, Radio } from './Elements';
import common from './common.json';
import React, { useState } from 'react';
import Progress from './Progress';


const ButtonArea = styled.div`
    width: 56%;
    margin: 48px auto 68px auto;
    display: flex;
    input, button {
        display: block;
        margin: 0 auto;
        width: 180px;
        color: ${common.Color.text_w};
        background-color: ${common.Color.main};
        border-radius: 100px;
        padding: 8px;
        text-align: center;
        cursor: pointer;
    }
`
const SubTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
`
const Message = styled.p`
    text-align: center;
    margin-top: 24px;
`

const Table = styled.table`
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    tr:first-child {
        border-top: 1px solid ${common.Color.gray};
    }
    td {
        padding: 8px 12px;;
        border-bottom: 1px solid ${common.Color.gray};
    }
    td:first-child {
        width: 30%;
        background-color: ${common.Color.input_bg};
        font-weight: bold;    
    }
`

export interface IFormValues {
    [value: string]:string|number;
}

interface IFormValuesDict {
    values: {
        [value: string]:string|number;
    }
}
function Confirm(values:IFormValuesDict) {
    const inputed_values = values.values
    var names = []
    for (const key in inputed_values) {
        names.push(key)
    }
    return(
        <tbody>
            {names.map((item, index) => <tr key={index}><td>{item}</td><td>{inputed_values[item]}</td></tr>)}
        </tbody>
    )
}

const service_list:string[] = [
    'CYBERMAIL Σ',
    'Cloud Mail SECURITYSUITE アーカイブ',
    'Cloud Mail SECURITYSUITE 送信対策',
    'Cloud Mail SECURITYSUITE 受信対策',
    'Cloud Mail SECURITYSUITE 送受信対策',
    'Cloud Mail SECURITYSUITE ビジネス',
    'Cloud Mail SECURITYSUITE エンタープライズ',
    'MAILGATES Σ',
    'MAILBASE Σ',
    'CYBERCHAT',
    '損保セキュアメール',
    'Symantec乗換キャンペーンセキュリティパック',
    'CYBERMAIL Σ ST',
    'EMERGENCY MAIL'
]

export default function Form() {
    const { register, formState: { errors }, handleSubmit, getValues } = useForm<IFormValues>();
    const [page, setPage] = useState(1);
    const onSubmit: SubmitHandler<IFormValues> = data => {
        if ( page < 5 ) {
            setPage(page + 1)
        }
    }
    
    switch (page) {
        case 1:
            return (
                <>
                    <Progress page={page} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Text label='依頼事項' register={register} type="text" required={false} errors={errors} disabled={true} />
                        <Text label='開通希望日' register={register} type="date" required={true} errors={errors} />
                        <Text label='ご契約社名' register={register} type="text" required={true} errors={errors} />
                        <Text label='ドメイン' register={register} type="text" required={true} errors={errors} />
                        <Pulldown label='ご契約サービス' register={register} choices={service_list} required={false} disabled={true} />
                        <Text label='ご契約アカウント数' register={register} type="number" required={true} errors={errors} />
                        <Pulldown 
                            label='ユーザー認証方式'
                            register={register} 
                            choices={[
                                '認証用_CyberMail',
                                'SAML',
                                'Microsoft 365 (OAuth 2.0)',
                                'Google Workspace (OAuth 2.0)',
                                'POP3/SMTP',
                                'LDAP/Active Directory'
                            ]} 
                            required={false}
                        />
                        <Radio label='DKIM認証を利用する' register={register} choices={['利用する', '利用しない']} required={false}　/>
                        <Text label='希望アクセスURL1' register={register} type="text" required={true} errors={errors} />
                        <Text label='希望アクセスURL2' register={register} type="text" required={false} errors={errors} />
                        <Text label='希望アクセスURL3' register={register} type="text" required={false} errors={errors} />
                        <ButtonArea>
                            <input type="submit" value="次へ" />
                        </ButtonArea>
                    </form>
                </>
            )
        case 2:
            return (
                <>
                    <Progress page={page} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Text label='dummy1' register={register} type="text" required={true} errors={errors} />
                        <ButtonArea>
                            <input type="submit" value="次へ" />
                        </ButtonArea>
                    </form>
                </>
            )
        case 3:
            return (
                <>
                    <Progress page={page} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Text label='dummy2' register={register} type="text" required={true} errors={errors} />
                        <ButtonArea>
                            <input type="submit" value="次へ" />
                        </ButtonArea>
                    </form>                
                </>
            )
        case 4:
            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <SubTitle>この内容で送信してもよろしいですか？</SubTitle>
                    <Table>
                        <Confirm values={getValues()}/>
                    </Table>
                    <ButtonArea>
                        <button>戻る</button>
                        <input type="submit" value="送信" />
                    </ButtonArea>
                </form>
            )
        case 5:
            return(
                <>
                    <SubTitle>送信完了</SubTitle>
                    <Message>ご協力いただき、ありがとうございました。</Message>
                </>
            )
        default:
            return(
                <></>
            )
        }
    }    

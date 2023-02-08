import { useForm, SubmitHandler, useFieldArray, Control } from "react-hook-form";
import styled from 'styled-components';
import { Input, Pulldown, Radio, Checkbox, MultiText } from './Elements';
import common from './common.json';
import React, { useState } from 'react';
import Progress from './Progress';
import Confirm from './Confirm';


const ButtonArea = styled.div`
    width: 56%;
    margin: 48px auto 68px auto;
    display: flex;
    input, button {
        display: block;
        margin: 0 auto;
        width: 180px;
        border-radius: 100px;
        padding: 8px;
        text-align: center;
        cursor: pointer;
    }
    input[type='submit'] {
        color: ${common.Color.text_w};
        background-color: ${common.Color.main};
    }
    button {
        color: ${common.Color.text};
        background-color: ${common.Color.gray};        
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
const idp_list:string[] = [
    '-- 選択してください --',
    'ADFS',
    'HENNGE One',
    'CloudGate UNO',
    'Okta',
    'Nextset',
    'Google Workspace',
    'Azure AD',
    'Extic'
]

export interface IFormValues {
    [value: string]:string|number|any[];
}

const today = new Date();
const days_later = new Date(today.setDate(today.getDate() + 4)); 
const s_days_later = days_later.toISOString().slice(0,10)



export default function Form() {
    const { register, formState: { errors }, handleSubmit, getValues, watch } = useForm<IFormValues>();
    const [page, setPage] = useState(1);
    const onSubmit: SubmitHandler<IFormValues> = data => {  
        if ( page < 5 ) {
            setPage(page + 1)
        }
    }
    const backPage = () => {
        setPage(1)
    }
    
    const watchIsAuthType = watch("ユーザー認証方式");

    switch (page) {
        case 1:
            return (
                <>
                    <Progress page={page} />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label='依頼事項' register={register} type="text" required={false} errors={errors} disabled={false} />
                        <Input 
                            label='開通希望日' 
                            register={register} 
                            type="date" 
                            required={false} 
                            errors={errors} 
                            min={s_days_later}
                        />
                        <Input label='ご契約社名' register={register} type="text" required={false} errors={errors} />
                        <Input label='ドメイン' register={register} type="text" required={false} errors={errors} />
                        <Pulldown label='ご契約サービス' register={register} choices={service_list} required={false} disabled={true} />
                        <Input 
                            label='ご契約アカウント数' 
                            register={register} 
                            type="number" 
                            required={false} 
                            errors={errors} 
                            pattern={/^[0-9]+0$/}
                            errmsg='10アカウント単位で指定してください'
                            min='0'
                        />
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
                        
                        { (watchIsAuthType === 'SAML') &&
                            <>
                                <Input label='SAML 担当者名' register={register} type="text" required={false} errors={errors} />
                                <Input label='SAML 担当者メールアドレス' register={register} type="text" required={false} errors={errors} />
                                <Pulldown label='SAML IdPサービス名' register={register} choices={idp_list} required={false} disabled={false} />
                                <Input label='SAML IdPメタデータ' register={register} type="file" required={false} errors={errors} />
                            </>
                        }
                        { (watchIsAuthType === 'LDAP/Active Directory') &&
                            <>
                                <Input label='LDAP サーバーFQDN / IP' register={register} type="text" required={false} errors={errors} />
                                <Input label='LDAP ポート番号' register={register} type="number" required={false} errors={errors} />
                                <Input label='LDAP BaseDN' register={register} type="text" required={false} errors={errors} />
                                <Input label='LDAP 文字コード' register={register} type="text" required={false} errors={errors} />
                                <Input label='LDAP ログインアカウント' register={register} type="text" required={false} errors={errors} />
                                <Input label='LDAP ログインパスワード' register={register} type="text" required={false} errors={errors} />
                                <Input label='LDAP フィルタ' register={register} type="text" required={false} errors={errors} />
                            </>
                        }
                        <Radio label='O365・G_suite切替' register={register} choices={['切替前', '切替済']} required={false}　/>
                        <Input label='切替前のMXレコード' register={register} type="text" required={false} errors={errors} />
                        <Input label='切替後のMXレコード' register={register} type="text" required={false} errors={errors} />
                        <Input label='中継許可サーバーIPアドレス' register={register} type="text" required={false} errors={errors} />
                        <Input label='中継先サーバーIPアドレス' register={register} type="text" required={false} errors={errors} />
                        <Input label='中継先サーバーFQDN' register={register} type="text" required={false} errors={errors} />
                        <Input label='認証_サーバー' register={register} type="text" required={false} errors={errors} />
                        <Input label='認証_ポート番号' register={register} type="number" required={false} errors={errors} />
                        <Radio label='POP認証時にメールアドレス全体で認証する' register={register} choices={['はい', 'いいえ']} required={false}　/>
                        <Radio label='DKIM認証を利用する' register={register} choices={['利用する', '利用しない']} required={false}　/>
                        <Checkbox 
                            label='MGΣプラン' 
                            register={register} 
                            choices={[
                                '入口対策（基本）',
                                '入口対策（OP_サンドボックス）',
                                '出口対策（暗号化＆分離）',
                                '出口対策（誤送信、審査、暗号化＆分離）'
                            ]}
                            disabled={false}
                            required={false}
                        />

                        <Input 
                            label='アクセスURL1（第1希望）' 
                            register={register} 
                            type="text" 
                            required={true} 
                            errors={errors} 
                            pattern={/^[a-z][a-z-]*[a-z]$/}
                            errmsg='半角英数小文字とハイフンのみ利用可能です'
                        />
                        <Input label='アクセスURL1（第2希望）' register={register} type="text" required={false} errors={errors} />
                        <Input label='アクセスURL1（第3希望）' register={register} type="text" required={false} errors={errors} />
                        
                        <MultiText label='MailGates_IPアクセス制御' register={register} required={false} errors={errors} />
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
                        <Input label='dummy1' register={register} type="text" required={false} errors={errors} />
                        <Input label='dummy2' register={register} type="text" required={false} errors={errors} />
                        <Input label='dummy3' register={register} type="text" required={false} errors={errors} />
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
                        <Input label='dummy4' register={register} type="text" required={false} errors={errors} />
                        <Input label='dummy5' register={register} type="text" required={false} errors={errors} />
                        <Input label='dummy6' register={register} type="text" required={false} errors={errors} />
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
                        <button onClick={() => backPage()}>戻る</button>
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

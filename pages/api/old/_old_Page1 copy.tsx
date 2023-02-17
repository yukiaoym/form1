import { useFormContext } from "react-hook-form";
import { Input, Pulldown, Radio, Checkbox, GroupInput } from './CommonElements';
import common from './common.json';
import React from 'react';
import Progress from './Progress';
import { IFormValues } from "./IFormValues";
import Button from './Button';
import Label from './Label';

const service_list:string[] = common.ServiceList
const idp_list:string[] = common.SAMLIdpList
const today: Date = new Date();
const days_later: Date = new Date(today.setDate(today.getDate() + 4)); 
const s_days_later:string = days_later.toISOString().slice(0,10)

export default function Page1() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, watch } = methods;
    const watchIsAuthType = watch("ユーザー認証方式");
    return (
        <>
            <Progress page={1} />
            <Input label='依頼事項' register={register} type="text" required={true} errors={errors} disabled={false} />
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
                <Input label='SAML 担当者名' placeholder='担当者名' register={register} type="text" required={false} errors={errors} />
                <Input label='SAML 担当者メールアドレス' placeholder='メールアドレス' register={register} type="text" required={false} errors={errors} />
                <Pulldown label='SAML IdPサービス名' placeholder='IdPサービス名' register={register} choices={idp_list} required={false} disabled={false} />
                <Input label='SAML IdPメタデータ' placeholder='IdPメタデータ' register={register} type="file" required={false} errors={errors} />
            </>
            }
            { (watchIsAuthType === 'LDAP/Active Directory') &&
            <GroupInput 
                label='LDAP認証' 
                sublabels={['サーバーFQDN / IP','ポート番号','BaseDN','文字コード','ログインアカウント', 'ログインパスワード','フィルタ']} 
                register={register} 
                required={false} 
                errors={errors} 
            />                
            // <Group>
            //     <p>LDAP認証</p>
            //     <Input label='LDAP サーバーFQDN / IP' register={register} type="text" required={false} errors={errors} />
            //     <Input label='LDAP ポート番号' register={register} type="number" required={false} errors={errors} />
            //     <Input label='LDAP BaseDN' register={register} type="text" required={false} errors={errors} />
            //     <Input label='LDAP 文字コード' register={register} type="text" required={false} errors={errors} />
            //     <Input label='LDAP ログインアカウント' register={register} type="text" required={false} errors={errors} />
            //     <Input label='LDAP ログインパスワード' register={register} type="text" required={false} errors={errors} />
            //     <Input label='LDAP フィルタ' register={register} type="text" required={false} errors={errors} />
            // </Group>
            }
            <Input 
                label='MXレコード切替予定日' 
                register={register} 
                type="date" 
                required={false} 
                errors={errors} 
            />
            <Radio label='O365・G_suite切替' register={register} choices={['切替前', '切替済']} required={false} />
            <GroupInput label='MXレコード' sublabels={['切替前','切替後']} register={register} required={false} errors={errors} />            
            <Input label='中継許可サーバーIPアドレス' register={register} type="text" required={false} errors={errors} />
            <Input label='中継先サーバーIPアドレス' register={register} type="text" required={false} errors={errors} />
            <Input label='中継先サーバーFQDN' register={register} type="text" required={false} errors={errors} />
            <Input label='認証_サーバー' register={register} type="text" required={false} errors={errors} />
            <Pulldown label='認証_ポート番号' register={register} choices={['110','995']} required={false} />
            <Radio label='POP認証時にメールアドレス全体で認証する' register={register} choices={['はい', 'いいえ']} required={false} />
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
                label='第1希望' 
                register={register} 
                pattern={/^[a-z][a-z-]*[a-z]$/}
                errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                type="text" 
                required={true} 
                errors={errors} 
            />
            <Input label='第2希望' register={register} type="text" required={false} errors={errors} />
            <Input label='第3希望' register={register} type="text" required={false} errors={errors} />

            <Button value='次へ' isBack={false} />            
        </>
    )
}    

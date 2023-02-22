import { useFormContext } from "react-hook-form";
import common from './common.json';
import React from 'react';
import Progress from './parts/Progress';
import { IFormValues } from "./IFormValues";
import Button from './parts/Button';
import { Section } from "./parts/Style";
import SectionTitle from "./parts/SectionTitle";
import { Input, Checkbox, Radio, Select, MultiText, InputFile } from "./parts/Element";
import Menu from "./parts/Menu";

const service_list:string[] = common.ServiceList
const auth_list:string[] = common.AuthList
const idp_list:string[] = common.SAMLIdpList
const mg_plan:string[] = common.MailGatesPlan
const today: Date = new Date();
const days_later: Date = new Date(today.setDate(today.getDate() + 4)); 
const s_days_later:string = days_later.toISOString().slice(0,10)

export default function Page1() {
    const methods = useFormContext<IFormValues>();
    const { register, formState: { errors }, watch } = methods;
    const watchIsAuthType = watch("ユーザー認証方式");
    const watchIsSwitchMX = watch("O365・G_suite切替");
    
    return (
        <>
            {/* <Menu page={1} /> */}
            <Section>
                <Input label='ご契約社名' register={register} required={false} errors={errors} sub={false}/>
            </Section>
            <Section>
                <Input label='ドメイン' register={register} required={false} errors={errors} sub={false} />
            </Section>
            <Section>
                <Input 
                    label='ご契約アカウント数'
                    register={register}
                    required={false}
                    errors={errors}
                    type='number'
                    min='10'
                    pattern={/^[0-9]+0$/}
                    errmsg='10アカウント単位で指定してください'
                    sub={false}
                />
            </Section>
            <Section>
                <Input label='開通希望日' register={register} required={false} type='date' min={s_days_later} errors={errors} sub={false} />
            </Section>
            <Section>
                <Select label='ユーザー認証方式' register={register} list={auth_list} disabled={false} sub={false} />
            </Section>

            { (watchIsAuthType === 'SAML') &&
            <Section>
                <SectionTitle label='SAML認証' required={false} sub={false} />
                <Input label='SAML認証_担当者名' register={register} required={false} errors={errors} sub={true} />
                <Input label='SAML認証_担当者メールアドレス' register={register} required={false} errors={errors} sub={true} />
                <Select label='SAML認証_IdPサービス名' register={register} list={idp_list} disabled={false} sub={true} />
                {/* <Input label='SAML認証_メタデータ' register={register} required={false} type='file' errors={errors} sub={true} /> */}
                <InputFile label='SAML認証_メタデータ' register={register} type='file' errors={errors} sub={true} id='metadata' />
            </Section>
            }

            { (watchIsAuthType === 'LDAP/Active Directory') &&
            <Section>
                <SectionTitle label='LDAP認証' required={false} sub={false} />
                <Input label='LDAP認証_サーバー' register={register} required={false} errors={errors} sub={true} />
                <Select label='LDAP認証_ポート番号' register={register} list={['389','636']} disabled={false} sub={true} />
                <Input label='LDAP認証_BaseDN' register={register} required={false} errors={errors} sub={true} />
                <Input label='LDAP認証_ログインアカウント' register={register} required={false} errors={errors} sub={true} />
                <Input label='LDAP認証_ログインパスワード' register={register} required={false} errors={errors} sub={true} />
                <Input label='LDAP認証_フィルタ' register={register} required={false} errors={errors} sub={true} />                            
            </Section>
            }
            <Section>
                <Input label='MXレコード切替予定日' register={register} required={false} errors={errors} type='date' sub={false}/> 
            </Section>
            <Section>
                <Radio label='O365・G_suite切替' register={register} list={['切替前', '切替済']} sub={false} />
            </Section>
            { (watchIsSwitchMX === '切替前') && 
            <Section>
                <SectionTitle label='MXレコード' required={false} sub={false} />
                <Input label='切替前のMXレコード' register={register} required={true} errors={errors} sub={true} />           
            </Section>
            }
            { (watchIsSwitchMX === '切替済') && 
            <Section>
                <SectionTitle label='MXレコード' required={false} sub={false} />
                <Input label='切替前のMXレコード' register={register} required={true} errors={errors} sub={true} /> 
                <Input label='切替後のMXレコード' register={register} required={true} errors={errors} sub={true} />             
            </Section>
            }
            <Section>
                <SectionTitle label='連携サーバー情報' required={false} sub={false} />
                <Input label='中継許可サーバーIPアドレス' register={register} required={false} errors={errors} sub={true} /> 
                <Input label='中継先サーバーIPアドレス' register={register} required={false} errors={errors} sub={true} /> 
                <Input label='中継先サーバーFQDN' register={register} required={false} errors={errors} sub={true} /> 
                <Input label='認証_サーバー' register={register} required={false} errors={errors} sub={true} />                                
                <Input label='認証_ポート番号' register={register} required={false} errors={errors} sub={true} />  
                <Radio label='POP認証時にメールアドレス全体で認証する' register={register} required={false} list={['はい', 'いいえ']} sub={true} />
            </Section>
            <Section>
                <Checkbox label='MGΣ_プラン' register={register} list={mg_plan} sub={false} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='アクセスURL' required={false} sub={false} />
                <Input 
                    label='MG_希望アクセスURL1'
                    register={register}
                    required={true}
                    errors={errors}
                    pattern={/^[a-z][a-z-]*[a-z]$/}
                    errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                    sub={true}
                />
                <Input 
                    label='MG_希望アクセスURL2'
                    register={register}
                    required={false}
                    errors={errors}
                    pattern={/^[a-z][a-z-]*[a-z]$/}
                    errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                    sub={true}
                />
                <Input 
                    label='MG_希望アクセスURL3'
                    register={register}
                    required={false}
                    errors={errors}
                    pattern={/^[a-z][a-z-]*[a-z]$/}
                    errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                    sub={true}
                />
            </Section>
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

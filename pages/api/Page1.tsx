import { useFormContext } from "react-hook-form";
import common from './common.json';
import React from 'react';
import Progress from './parts/Progress';
import { IFormValues } from "./IFormValues";
import Button from './parts/Button';
import { Section } from "./parts/Style";
import SectionTitle from "./parts/SectionTitle";
import { Input, Checkbox, Radio, Select } from "./parts/Element";

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
    return (
        <>
            <Progress page={1} />

            <Section>
                <SectionTitle label='依頼事項' required={true} sub={false} />
                <Input label='依頼事項' register={register} required={true} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='開通希望日' required={false} sub={false} />
                <Input label='開通希望日' register={register} required={false} type='date' min={s_days_later} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='ご契約社名' required={false} sub={false} />
                <Input label='ご契約社名' register={register} required={false} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='ドメイン' required={false} sub={false} />
                <Input label='ドメイン' register={register} required={false} errors={errors} />
            </Section>
            <Section>
                <SectionTitle label='ご契約サービス' required={false} sub={false} />
                <Select label='ご契約サービス' register={register} list={service_list} disabled={false}/>
            </Section>
            <Section>
                <SectionTitle label='ご契約アカウント数' required={false} sub={false} />
                <Input 
                    label='ご契約アカウント数'
                    register={register}
                    required={false}
                    errors={errors}
                    type='number'
                    min='10'
                    pattern={/^[0-9]+0$/}
                    errmsg='10アカウント単位で指定してください'
                />
            </Section>
            <Section>
                <SectionTitle label='ユーザー認証方式' required={false} sub={false} />
                <Select label='ユーザー認証方式' register={register} list={auth_list} disabled={false} />
            </Section>

            { (watchIsAuthType === 'SAML') &&
            <Section>
                <SectionTitle label='SAML認証を選んだ場合ご記入ください' required={false} sub={false} />

                <SectionTitle label='担当者名' required={false} sub={true} />
                <Input label='SAML_担当者名' register={register} required={false} errors={errors} />
                
                <SectionTitle label='担当者メールアドレス' required={false} sub={true} />
                <Input label='SAML_担当者メールアドレス' register={register} required={false} errors={errors} />
                
                <SectionTitle label='IdPサービス名' required={false} sub={true} />
                <Select label='SAML_IdPサービス名' register={register} list={idp_list} disabled={false} />

                <SectionTitle label='IdPメタデータ' required={false} sub={true} />
                <Input label='SAML_IdPメタデータ' register={register} required={false} type='file' errors={errors} />
            </Section>
            }

            { (watchIsAuthType === 'LDAP/Active Directory') &&
            <Section>
                <SectionTitle label='LDAP/Active Directory 認証を選んだ場合ご記入ください' required={false} sub={false} />
                <SectionTitle label='LDAPサーバーFQDN/IP' required={false} sub={true} />
                <Input label='LDAP_サーバーFQDN/IP' register={register} required={false} errors={errors} />
                
                <SectionTitle label='ポート番号' required={false} sub={true} />
                <Select label='LDAP_ポート番号' register={register} list={['389','636']} disabled={false} />

                <SectionTitle label='BaseDN' required={false} sub={true} />
                <Input label='LDAP_BaseDN' register={register} required={false} errors={errors} />

                <SectionTitle label='ログインアカウント' required={false} sub={true} />
                <Input label='LDAP_ログインアカウント' register={register} required={false} errors={errors} />

                <SectionTitle label='ログインパスワード' required={false} sub={true} />
                <Input label='LDAP_ログインパスワード' register={register} required={false} errors={errors} />

                <SectionTitle label='フィルタ' required={false} sub={true} />
                <Input label='LDAP_フィルタ' register={register} required={false} errors={errors} />                            
            </Section>
            }

            <Section>
                <SectionTitle label='MXレコード切替予定日' required={false} sub={false} />
                <Input label='MXレコード切替予定日' register={register} required={false} errors={errors} type='date' /> 
            </Section>
            <Section>
                <SectionTitle label='Microsoft 365/Google Workspace切替状況' required={false} sub={false} />
                <div className='radio'>
                    <label htmlFor='O365・G_suite切替_切替前' >
                        <input type='radio' {...register('O365・G_suite切替')} value='切替前' id='O365・G_suite切替_切替前' />
                        <span>切替前</span>
                    </label>
                    <label htmlFor='O365・G_suite切替_切替後' >
                        <input type='radio' {...register('O365・G_suite切替')} value='切替後' id='O365・G_suite切替_切替後' />
                        <span>切替後</span>
                    </label>
                </div>
            </Section>
            <Section>
                <SectionTitle label='MXレコード' required={false} sub={false} />
                <SectionTitle label='切替前' required={false} sub={true} />
                <Input label='切替前のMXレコード' register={register} required={false} errors={errors} /> 
                <SectionTitle label='切替後' required={false} sub={true} />
                <Input label='切替後のMXレコード' register={register} required={false} errors={errors} />             
            </Section>
            <Section>
                <SectionTitle label='連携サーバー情報' required={false} sub={false} />
                <SectionTitle label='中継許可サーバーIPアドレス' required={false} sub={true} />
                <Input label='中継許可サーバーIPアドレス' register={register} required={false} errors={errors} /> 
                <SectionTitle label='中継先サーバーIPアドレス' required={false} sub={true} />
                <Input label='中継先サーバーIPアドレス' register={register} required={false} errors={errors} /> 
                <SectionTitle label='中継先サーバーFQDN' required={false} sub={true} />
                <Input label='中継先サーバーFQDN' register={register} required={false} errors={errors} /> 
                <SectionTitle label='認証_サーバー' required={false} sub={true} />
                <Input label='認証_サーバー' register={register} required={false} errors={errors} />                                
                <SectionTitle label='認証_ポート番号' required={false} sub={true} />
                <Input label='認証_ポート番号' register={register} required={false} errors={errors} />  
                <SectionTitle label='POP認証時にメールアドレス全体で認証する' required={false} sub={true} />
                <Radio label='POP認証時にメールアドレス全体で認証する' register={register} list={['はい', 'いいえ']} />
            </Section>

            <Section>
                <SectionTitle label='MGΣプラン' required={false} sub={false} />
                <Checkbox label='MGΣプラン' register={register} list={mg_plan} />
            </Section>

            <Section>
                <SectionTitle label='アクセスURL' required={false} sub={false} />
                <SectionTitle label='第1希望' required={true} sub={true} />
                <Input 
                    label='アクセスURL_第1希望'
                    register={register}
                    required={true}
                    errors={errors}
                    pattern={/^[a-z][a-z-]*[a-z]$/}
                    errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                />
                <SectionTitle label='第2希望' required={false} sub={true} />
                <Input 
                    label='アクセスURL_第2希望'
                    register={register}
                    required={false}
                    errors={errors}
                    pattern={/^[a-z][a-z-]*[a-z]$/}
                    errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                />
                <SectionTitle label='第3希望' required={false} sub={true} />
                <Input 
                    label='アクセスURL_第3希望'
                    register={register}
                    required={false}
                    errors={errors}
                    pattern={/^[a-z][a-z-]*[a-z]$/}
                    errmsg='2文字以上の半角英数小文字またはハイフンで指定してください。先頭と末尾にハイフンは利用できません。'
                />
            </Section>            

            <Button value='次へ' isBack={false} />            
        </>
    )
}    

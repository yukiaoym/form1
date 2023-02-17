import styled from 'styled-components';
import common from '../common.json';
import React, { useState } from 'react';

type LabelProps = {
    label: string;
}

const ToolTipArea = styled.div<{ show: boolean }>`
    display: inline-block;
    position: relative;
    white-space: nowrap;
    img {
        height: 18px;
        cursor: pointer;
        margin-left: 8px;
        vertical-align: middle;
        position: relative;
    }
    span { 
        font-weight: normal;
        font-size: 0.8rem;
        background-color: ${common.Color.bg};
        border: 2px solid ${common.Color.main};
        border-radius: 4px;
        padding: 10px;
        width: fit-content;
        height: fit-content;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 32px;
        display: ${(props) => (props.show ? 'block' : 'none')};
    }
`
const ToolTipDict: {[index: string]: string} = {
    "開通希望日": "最短でお申込み日より3営業日以内に環境提供致します。\n（土日祝日を除く）",
    "ドメイン利用": "CYBERMAILΣで使用するドメインが新規に取得するドメインの場合は「新規ドメイン」\nCYBERMAILΣで使用するドメインが既に利用中のドメインの場合は「既存ドメイン」",
    "ご利用中のMXレコード": "環境提供時のメール配送先（現在ご利用中のメールサービス）となります。",
    "アクセスURL": "本サービスにアクセスするURLに設定されます。英数半角小文字とハイフンのみ利用可。\n例）https://***.cybermail.jpの「***」を指します。",
    "ユーザー認証方式": "CYBERMAILΣへログインする際の認証方式となります。\nデフォルト設定はCYBERMAILとなります。\nLDAP認証またはSAML認証をご利用の場合は、ユーザ認証方式を変更してください。",
    "SAML 担当者名": "SAML認証の技術的なご担当者様の氏名をご記入下さい。",
    "SAML 担当者メールアドレス": "SAML認証の技術的なご担当者様のメールアドレスをご記入下さい。",
    "SAML IdPサービス名": "ご利用のIdPサービスを選択して下さい。",
    "SAML IdPメタデータ": "ご利用のIdPサービスのメタデータを添付して下さい。",
    "LDAP サーバーFQDN / IP": "お客様環境のLDAP/Active DirectoryサーバーのグローバルIPアドレス",
    "LDAP ポート番号": "お客様環境のLDAP/Active Directoryサーバーのポート番号",
    "LDAP BaseDN": "お客様環境のLDAP/Active Directoryサーバーの検索起点となるDN",
    "LDAP 文字コード": "お客様環境のLDAP/Active Directoryサーバーの文字コード",
    "LDAP ログインアカウント": "お客様環境のLDAP/Active Directoryサーバーの検索権限を持っているアカウント",
    "LDAP ログインパスワード": "お客様環境のLDAP/Active Directoryサーバーの検索権限を持っているアカウントのパスワード",
    "LDAP フィルタ": "お客様環境のLDAP/Active Directoryサーバーの検索で使用するフィルタ",
    "オプション_WebAPI": "CYBERMAIL ΣのWebAPIをご利用の場合は「利用する」を選択してください。",
    "WebAPI_アクセス元IPアドレス": "WebAPIを利用する場合は、送信元IPアドレスをご記入ください。",
    "MailGates IPアクセス制御": "情報漏えい対策・アンチウイルス・アンチスパム管理画面へのアクセス制御をご利用の場合はご記入ください。\n制御が不要な場合は空欄にしてください。\n※全ユーザが対象となります。",
    "OP_暗号化ファイルスキャン機能": "パスワード付きZIPファイルのウイルススキャン機能",
    "DKIM認証を利用する": "DKIM認証とは、送信者のなりすましやメールの改ざんを防ぐための仕組みです。\n送信メールにDKIMヘッダを付与する場合は「利用する」を選択して下さい。\n環境提供時にお客様ドメインのDKIMレコードへの登録していただく公開鍵のデータを提供いたします。",
    "cybozu連携_サブドメイン名": "cybozu.comで割り当てられている、サブドメイン名。\n例：https://***.cybozu.comの「***」を指します。",
    "cybozu連携_共有アドレス帳名": "新規でCYBERMAILΣをご契約のお客様は、\n共有アドレス帳作成作業を弊社で行います。\nご希望のアドレス帳名称をご記入ください。",
    "cybozu連携_アクセス元グローバルIP": "cybozu.com連携サーバー管理画面公開後に設定致します。\nお客様のグローバルIPアドレスをご記入下さい。\n※cybozu_com連携管理者画面のIPアクセス制御に必要となります。",
    "ノベルティ": "希望される場合は、弊社特製開運カレンダーやお得なキャンペーンの案内をご担当者様へお送りします。\n※上記を希望されない場合でも、アップデート情報など製品に関する重要なお知らせは送付されますのでご了承ください。",
}

export default function ToolTip({label}:LabelProps) {
    const [show, setShow] = useState(false)

    return (
        <>
            { ToolTipDict[label] !== undefined ?
                <ToolTipArea show={show}>
                    <img 
                        src="/question.png" alt="help" 
                        onMouseEnter={() => setShow(true)} 
                        onMouseLeave={() => setShow(false)}
                    />
                    <span>{ToolTipDict[label].split("\n").map((item, index) => 
                    <React.Fragment key={index}>{item}<br /></React.Fragment>
                    )}
                    </span>
                </ToolTipArea>
            :<></>
            }
        </>
    )
}
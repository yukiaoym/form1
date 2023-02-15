// export interface IFormValues<T> {
//     value: T;
// }


export type IFormValues = {

    依頼事項: string;
    開通希望日: string;
    ご契約社名: string;
    ドメイン: string;
    ご契約サービス: string;
    ご契約アカウント数: number;
    ユーザー認証方式: string;
    'SAML 担当者名': string;
    'SAML 担当者メールアドレス': string;
    'SAML IdPサービス名': string;
    'SAML IdPメタデータ': FileList;
    'LDAP/Active Directory': string;
    'LDAP サーバーFQDN / IP': string;
    'LDAP ポート番号': number;
    'LDAP BaseDN': string;
    'LDAP 文字コード': string;
    'LDAP ログインアカウント': string;
    'LDAP ログインパスワード': string;
    'LDAP フィルタ': string;
    'O365・G_suite切替': string;
    '切替前のMXレコード': string;
    '切替後のMXレコード': string;
    'MXレコード': string[];
    '中継許可サーバーIPアドレス': string;
    '中継先サーバーIPアドレス': string;
    '中継先サーバーFQDN': string;
    '中継先サーバー': string[];
    '認証_サーバー': string;
    '認証_ポート番号': number;
    '認証サーバー': string[];
    'POP認証時にメールアドレス全体で認証する': string;
    'DKIM認証を利用する': string;
    'MGΣプラン': string[];
    '第1希望':string;
    '第2希望': string;
    '第3希望': string;
    'アクセスURL': {
        第1希望: string;
        第2希望: string;
        第3希望: string;
    }
    // 'アクセスURL': string[]; 
    'MailGates_IPアクセス制御': string;
    'サポート窓口担当者': {
        会社名: string;
        担当者名: string;
        メールアドレス: string;
        電話番号: string;
    }[];
    'MXレコード切替予定日': string;
    '管理者メールアドレス': {
        メールアドレス: string;
    }[];
    }
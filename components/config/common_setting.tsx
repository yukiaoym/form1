import common from './common.json';
import NamesDict from '../config/NamesDict.json';

export const auth_list:string[] = common.AuthList
export const multi_admin_list:string[] = common.MultiAdminList
export const idp_list:string[] = common.SAMLIdpList

export function get4DaysLater() {
    const today: Date = new Date();
    const days_later: Date = new Date(today.setDate(today.getDate() + 4)); 
    const s_days_later:string = days_later.toISOString().slice(0,10)
    return s_days_later
}

export type MGPlanProps = {
    name: string, 
    checked: boolean,
}

export const MGPlan:MGPlanProps[] = [
    {
        name: '入口対策（OP_サンドボックス）',
        checked: false
    },
    {
        name: '出口対策（暗号化＆分離）',
        checked: false
    },
    {
        name: '出口対策（誤送信、審査、暗号化＆分離）',
        checked: false
    }
]

type NamesDictProps = {
    [name: string]: {
        pages: string,
        confirm: string
    }
}
export const names_dict:NamesDictProps = NamesDict.Names



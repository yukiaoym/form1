import { useFormContext } from "react-hook-form";
import { IFormValues } from "../config/IFormValues";
import React from 'react';
import Button from "../parts/Button";
import styled from 'styled-components';
import common from '../config/common.json';
import { names_dict } from '../config/common_setting'

const Table = styled.table`
    width: 100%;
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
    .category {
        background-color: ${common.Color.input_bg};
    }
`
const SubTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
`

export default function Confirm({ onBack }: {onBack:() => void}) {
    const methods = useFormContext<IFormValues>();
    const { getValues } = methods;
    const values:{[key:string]: any} = getValues();
    const rows = []
    
    
    function ConvName(name:string) {
        return names_dict[name]["confirm"]
    }
    for (const key in names_dict) {
        if (values[key] != undefined) {
            if (key == 'SAML認証_メタデータ' && values[key].length > 0 ) {
                const tds = (
                    <>
                    <td>{ConvName(key)}</td>
                    <td>{values[key][0].name}</td>
                    </>
                )
                rows.push(tds)
            } else if ( key == 'MGΣ_プラン') {
                const tds = (
                    <>
                    <td>{ConvName(key)}</td>
                    {values[key] != false ?
                    <td>
                        {values[key].map((item: string, index: number) => 
                            <p key={index}>{ConvName(item)}</p>
                        )}
                    </td>
                    :
                    <td>
                    </td>                 
                    }
                    </>
                )
                rows.push(tds)
            } else {
                const tds = (
                    <>
                    <td>{ConvName(key)}</td>
                    <td>{values[key]}</td>
                    </>
                )
                rows.push(tds) 
            }
        }
    }

    return (
        <>
            <SubTitle>この内容で送信してもよろしいですか？</SubTitle>
            <Table>
                <tbody>
                    {rows.map((item, index) => <tr key={index}>{item}</tr>)}
                </tbody>
            </Table>
            <Button value='送信' onBack={onBack} isBack={true} />
        </>
    )
}
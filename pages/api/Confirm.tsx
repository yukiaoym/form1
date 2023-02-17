import { useFormContext } from "react-hook-form";
import { IFormValues } from "./IFormValues";
import React from 'react';
import Button from "./parts/Button";
import styled from 'styled-components';
import common from './common.json';

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

    const names = []
    for ( const key in values ) {
        names.push(key)
        if (typeof values[key] != 'string' &&  values[key] != 'number') {
            console.log(values[key])
        }
        
    }
    

    return (
        <>
            <SubTitle>この内容で送信してもよろしいですか？</SubTitle>
            <Table>
                <tbody>                        
                    {names.map((item, index) =>
                    <tr key={index}>
                        <td className={item}>{item}</td>
                        { typeof values[item] == 'string' || values[item] == 'number' ?
                        <td>{values[item]}</td>
                        :
                        <td>{values[item][0].names}</td>
                        }
                    </tr>
                    )}                     
                </tbody>
            </Table>
            <Button value='送信' onBack={onBack} isBack={true} />
        </>
    )



}
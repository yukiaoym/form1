import { Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import common from './common.json';
import { IFormValues } from './Form';
import ToolTip from './ToolTip'

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    type?: string;
    required: boolean;
    errors?: object;
    choices?: string[];
    disabled?: boolean;
}

const InputArea = styled.div<{ required: boolean }>`
    margin-bottom: 20px;
    input, select {
        width: 100%;
        background-color: ${common.Color.input_bg};
        border-radius: 4px;
        padding: 10px 12px;
        margin: 4px 0;
    }
    input:disabled, select:disabled {
        background-color: ${common.Color.gray};
    }
    label {
        font-weight: bold;
    }
    span {
        color: #ff0000;
    }
    .required {
        display: ${(props) => (props.required ? 'inline' : 'none')};
    }
`

export function Text({label, register, type, required, errors, disabled}:InputProps) {
    return (
        <InputArea required={required}>
            <label>{label} <span className="required">*</span></label>
            <ToolTip label={label}/>
            <input
                type={type}
                {...register(label, { 
                    required: {value: required, message: "必須項目です"},
                })}
                disabled={disabled}
            />
            <ErrorMessage
                errors={errors}
                name={label}
                render={({ message } : {message: string }) => <span>{message}</span>}
            />
        </InputArea>
    );
}

export function Pulldown({label, register, choices, required, disabled}:InputProps) {
    return (
        <InputArea required={required}>
            <label>{label} <span className="required">*</span></label>
            <ToolTip label={label}/>
            { choices !== undefined ?
            <select {...register(label)} disabled={disabled}>
                {choices.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
            :<></>}
            {/* <ErrorMessage
                errors={errors}
                name={label}
                render={({ message } : {message: string }) => <span>{message}</span>}
            /> */}
        </InputArea>
    );
}
import { Path, UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components';
import common from './common.json';
import { IFormValues } from './IFormValues';
import ToolTip from './ToolTip'

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    type?: string;
    required: boolean;
    errors?: object;
    choices?: string[];
    disabled?: boolean;
    min?: string;
    pattern?: RegExp;
    errmsg?: string;
}


const InputArea = styled.div<{ required: boolean }>`
    margin-bottom: 20px;
    input[type='text'], 
    input[type='number'], 
    input[type='date'],
    select,
    textarea {
        width: 100%;
        min-height: 40px;
        background-color: ${common.Color.input_bg};
        border-radius: 4px;
        padding: 10px 12px;
        margin: 4px 0;
    }
    label {
        font-weight: bold;
    }
    textarea {
        line-height: 20px;
        height: 120px;
    }
    .error {
        color: #ff0000;
    }
    .required {
        color: #ff0000;
        display: ${(props) => (props.required ? 'inline' : 'none')};
    }

    input[type="date"] {
        position: relative;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    input[type="file"] {
        display: block;
        width: 100%;
        min-height: 40px;
        margin: 8px 0;
    }

    //Radio
    .radio-choices, .checkbox-choices {
        min-height: 40px;
        padding: 10px 0;
        margin: 4px 0;
    }
    .radio-choices span, .checkbox-choices span {
        font-weight: normal;
        margin-right: 32px;
        cursor: pointer;
        vertical-align: middle;
        line-height: 18px;
    }
    .checkbox-choices label {
        display: flex;
        margin-bottom: 8px;
    }
    input[type='radio'], input[type='checkbox'] {
        width: 18px;
        height: 18px;
        background-color: ${common.Color.input_bg};
        border: 1px solid ${common.Color.gray2};
        vertical-align: middle;
        margin-right: 8px;
        cursor: pointer;
        transition: all 200ms ease;
    }
    input[type='radio'] {
        border-radius: 50%;
    }
    input[type='radio']:checked {
        background-color: ${common.Color.main};
        box-shadow: inset 0 0 0 3px ${common.Color.input_bg};
    }

    //Checkbox
    input[type='checkbox'] {
        position: relative;
    }
    input[type='checkbox']:after {
        content: '';
        display: none;
        width: 14px;
        height: 8px;
        border-bottom: solid 3px ${common.Color.text_w};
        border-left: solid 3px ${common.Color.text_w};
        transform rotate(-45deg);
        position: absolute;
        top: 2px;
        left: 1px;
    }
    input[type='checkbox']:checked {
        background-color: ${common.Color.main};
        border: 1px solid ${common.Color.main};
    }
    input[type='checkbox']:checked:after {
        display: inline-block;
    }

    //Disabled
    input:disabled, 
    select:disabled, 
    textarea:disabled {
        background-color: ${common.Color.gray};
    }
    input[type='radio']:disabled, input[type='checkbox']:disabled {
        background-color: ${common.Color.gray};
    }
`

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
        </InputArea>
    );
}

export function Radio({label, register, required, choices }:InputProps) {
    return (
        <InputArea required={required}>
            <label>{label} <span className="required">*</span></label>
            <ToolTip label={label}/>
            { choices !== undefined ?
                <div className='radio-choices' >{choices.map((item, index) => 
                <label htmlFor={`${label}_${index}`} key={index}>
                    <input type='radio' {...register(label)} value={item} id={`${label}_${index}`} />
                    <span>{item}</span>
                </label>
                )}</div>
            :<></>}
        </InputArea>

    );
}

export function Checkbox({label, register, required, choices, disabled }:InputProps) {
    return (
        <InputArea required={required}>
            <label>{label} <span className="required">*</span></label>
            <ToolTip label={label}/>
            { choices !== undefined ?
                <div className='checkbox-choices' >
                    {choices.map((item, index) => 
                        <label key={index} htmlFor={`checkbox-${index}`} >
                            <input 
                                type='checkbox' 
                                {...register(label)} 
                                value={item} 
                                id={`checkbox-${index}`} 
                                disabled={disabled} />
                            <span>{item}</span>
                        </label>
                    )}
                </div>
            :<></>}
        </InputArea>

    );
}

export function MultiText({label, register, required, errors, disabled}:InputProps) {
    return (
        <InputArea required={required}>
            <label>{label} <span className="required">*</span></label>
            <ToolTip label={label}/>
            <textarea
                {...register(label, { 
                    required: {value: required, message: "必須項目です"},
                })}
                disabled={disabled}
            />
            <ErrorMessage
                errors={errors}
                name={label}
                render={({ message } : {message: string }) => <span className="error" >{message}</span>}
            />
        </InputArea>
    );
}

export function Input({label, register, type, min, required, errors, disabled, pattern, errmsg }:InputProps) {
    return (
        <InputArea required={required}>
            <label>{label} <span className="required">*</span></label>
            <ToolTip label={label}/>

            { pattern !== undefined && errmsg !== undefined ? 
            <input
                type={type}
                {...register(label, { 
                    required: {value: required, message: "必須項目です"},
                    pattern: {value:pattern, message:errmsg}
                })}
                disabled={disabled}
                min={min}
            />
            :
            <input
                type={type}
                {...register(label, { 
                    required: {value: required, message: "必須項目です"},
                })}
                disabled={disabled}
                min={min}
            />
            }
            <ErrorMessage
                errors={errors}
                name={label}
                render={({ message } : {message: string }) => <span className="error" >{message}</span>}
            />
        </InputArea>
    );
}


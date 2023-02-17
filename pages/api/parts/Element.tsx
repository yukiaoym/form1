import { Path, UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { IFormValues } from '../IFormValues';

type InputProps = {
    label: Path<IFormValues>;
    sublabel?: string;
    register: UseFormRegister<IFormValues>;
    type?: string;
    required?: boolean;
    errors?: object;
    choices?: string[];
    disabled?: boolean;
    min?: string;
    pattern?: RegExp;
    errmsg?: string;
    placeholder?: string;
    list?: string[];
}

export function Input ({label, register, type, min, required, errors, disabled, placeholder, pattern, errmsg }:InputProps) {
    if (type == undefined) {
        type = 'text'
    }
    if (required == undefined) {
        required = false
    }
    return (
        <>
            { pattern !== undefined && errmsg !== undefined ? 
            <input
                type={type}
                min={min}
                disabled={disabled}
                placeholder={placeholder}
                {...register(label, { 
                    required: {value: required, message: "必須項目です"},
                    pattern: {value:pattern, message:errmsg}
                })}
            />
            :
            <input
                type={type}
                min={min}
                disabled={disabled}
                placeholder={placeholder}
                {...register(label, { 
                    required: {value: required, message: "必須項目です"},
                })}
            />
            }
            <ErrorMessage
                errors={errors}
                name={label}
                render={({ message } : {message: string }) => <span className="error" >{message}</span>}
            />
        </>
    )
}

export function Select ({label, register, list, disabled }:InputProps) {
    if (list === undefined) {
        list = []
    }
    return (
        <select 
            {...register(label)} 
            disabled={disabled}
        >
            {list.map((item, index) => <option key={index} value={item}>{item}</option>)}
        </select>
    )
}


export function Radio ({label, register, list }:InputProps) {
    if (list === undefined) {
        list = []
    }
    return (
        <div className='radio' >
            {list.map((item, index) => 
            <label htmlFor={`${label}_${index}`} key={index}>
                <input type='radio' {...register(label)} value={item} id={`${label}_${index}`} />
                <span>{item}</span>
            </label>
            )}
        </div>
    )
}

export function Checkbox({ label, register, list, disabled }:InputProps) {
    if (list === undefined) {
        list = []
    }
    return (
        <div className='checkbox' >
            {list.map((item, index) => 
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
    );
}

export function MultiText({label, register, required, errors, disabled}:InputProps) {
    if (required == undefined) {
        required = false
    }
    return (
        <>
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
        </>
    );
}
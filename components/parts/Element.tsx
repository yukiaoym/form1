import { Path, UseFormRegister, useFieldArray, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { IFormValues } from '../config/IFormValues';
import SectionTitle from './SectionTitle';
import { names_dict , MGPlanProps } from '../config/common_setting'

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    sub: boolean;
    type?: string;
    required?: boolean;
    errors?: object;
    choices?: string[];
    disabled?: boolean;
    min?: string;
    pattern?: RegExp;
    errmsg?: string;
    placeholder?: string;
    mgplan_list?: MGPlanProps[];
    list?: string[];
    id?: string;
    value?: string;
}

export function HideInput({label, register, value, sub }:InputProps) {
    return (
        <input
            type='hidden'
            {...register(label)}
            value={value}
        />
    )
}

export function Input ({label, register, sub, type, min, required, errors, disabled, placeholder, pattern, errmsg }:InputProps) {
    if (type == undefined) {
        type = 'text'
    }
    if (required == undefined) {
        required = false
    }
    return (
        <>
            <SectionTitle label={label} required={required} sub={sub} />
            { pattern !== undefined && errmsg !== undefined ? 
            <input
                autoComplete='off'
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
                autoComplete='off'
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

export function InputFile ({label, register, disabled, sub, id }:InputProps) {
    return (
        <>
            <SectionTitle label={label} sub={sub} />
            <input

                id={id}
                type='file'
                {...register(label)}
            />
        </>
    )
}

export function Select ({label, register, list, disabled, sub }:InputProps) {
    if (list === undefined) {
        list = []
    }
    return (
        <>
            <SectionTitle label={label} sub={sub} />
            <select 
                {...register(label)} 
                disabled={disabled}
                autoComplete='off'
            >
                {list.map((item, index) => <option key={index} value={item}>{item}</option>)}
            </select>
        </>
    )
}


export function Radio ({label, register, required, list, sub }:InputProps) {
    if (list === undefined) {
        list = []
    }
    return (
        <>
            <SectionTitle label={label} required={required} sub={sub} />
            <div className='radio' >
                {list.map((item, index) => 
                <label htmlFor={`${label}_${index}`} key={index}>
                    <input 
                        required={required}
                        autoComplete='off'
                        type='radio' 
                        {...register(label)} 
                        value={item} 
                        id={`${label}_${index}`} 
                    />
                    <span>{item}</span>
                </label>
                )}
            </div>
        </>
    )
}


export function Checkbox({ label, register, mgplan_list, sub, errors }:InputProps) {
    if ( mgplan_list == undefined ) {
        mgplan_list = []
    }
    return (
        <>
        <SectionTitle label={label} sub={sub} />
        <div className='checkbox' >
            {mgplan_list.map((item, index) => 
                <label key={`${label}_${item.name}`} htmlFor={`${label}_${item.name}`} >
                    <input
                        autoComplete='off'
                        type='checkbox'
                        {...register(label,{
                            // validate: {
                            //     atLeastOneRequired: (value:any) =>
                            //       (value && value.length >= 1) ||
                            //       "1つ以上選択してください",
                            //   },
                        })}
                        value={item.name}
                        id={`${label}_${item.name}`}
                    />
                    <span>{names_dict[item.name]['pages']}</span>
                </label>
            )}
            {/* <ErrorMessage
                errors={errors}
                name={label}
                render={({ message } : {message: string }) => <span className="error" >{message}</span>}
            /> */}
        </div>
        </>
    );
}

export function MultiText({label, register, required, errors, disabled, sub }:InputProps) {
    if (required == undefined) {
        required = false
    }
    return (
        <>
            <SectionTitle label={label} required={required} sub={sub} />
            <textarea
                autoComplete='off'
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
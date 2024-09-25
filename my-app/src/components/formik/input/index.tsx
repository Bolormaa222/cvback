import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import './style.css'

const Input=({label, name, className, disabled, ...props}:Props)=>{
    const [field, meta] = useField(name);
    return(
        <div className={`form-input ${meta.error&& meta.touched?'error':''} ${className}`}>

            <label htmlFor={name}>{label}</label>
            <input  type={props.type || 'text'}
                id={name}
                name={name}
                disabled={disabled}
                value={field.value}
                onChange={field.onChange}
                {...props}
            />
            {meta.error && meta.touched && (
                <p className='form-input__error'>
                    {meta.error}
                </p>
            )}
        </div>
    )
}
export default Input;
interface Props extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name:string;
    className?: string;
    disabled?:boolean;
}
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import './style.css'

const TextArea=({label, name, className, rows, ...props}:Props)=>{
    const [field, meta] = useField(name);
    return(
        <div className={`form-area ${meta.error&& meta.touched?'error':''} ${className}`}>

            <label htmlFor={name}>{label}</label>
            <textarea rows={rows||10}  type={'text'}
                id={name}
                name={name}
                
                value={field.value}
                onChange={field.onChange}
                {...props}
            ></textarea>
            {meta.error && meta.touched && (
                <p className='form-area__error'>
                    {meta.error}
                </p>
            )}
        </div>
    )
}
export default TextArea;
interface Props extends InputHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name:string;
    rows?:number;
    className?: string;
}
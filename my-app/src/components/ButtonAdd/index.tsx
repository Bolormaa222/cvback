import React from 'react';
import './style.css'
import {FaPlus} from 'react-icons/fa'
const Button=({title, type, link, className, onClick}:ButtonProp)=>{
    if(type==ButtonType.link){
        return(
            <a className={className} href={link}>
                {title}
            </a>
        )
    }
    return(
            <button type={type} className={className} onClick={onClick}>
                <FaPlus/>
                &nbsp;
                {title}</button>
    )
}
export default Button;
export interface ButtonProp{
    title: string;
    type: ButtonType|ButtonType.button;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string | "button-default";
    link?:string;
}
export enum ButtonType{
    submit="submit",
    button="button",
    link="link",

}
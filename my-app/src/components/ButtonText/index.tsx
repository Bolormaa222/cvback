import React from 'react';
import './style.css'

const ButtonText=({title, type, link, className, onClick}:ButtonProp)=>{
    if(type==ButtonType.link){
        return(
            <a className={className} href={link}>
                {title}
            </a>
        )
    }
    return(
        <div>
            <button type={type} className={className} onClick={onClick}>
                
                {title}</button>
        </div>
    )
}
export default ButtonText;
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
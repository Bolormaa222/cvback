import React from 'react';
import "./style.css"
const BigTitle=({label}:BigTitleProps)=>{
    return(
        <div className='big-title'>
            {label}
        </div>
    )
}
export default BigTitle;

interface BigTitleProps{
    label:string;
}
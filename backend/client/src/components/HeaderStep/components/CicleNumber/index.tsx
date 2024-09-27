import React from 'react';
import './style.css'
const CircleNumber=({value, active}:CircleNumberProp)=>{
    if(active){
        return(
            <div className='circle-number'>
                {value}
            </div>
        ) 
    }
    return(
        <div className='circle-number__inactive'>
            {value}
        </div>
    )
}
export default CircleNumber
interface CircleNumberProp{
    value:number;
    active?:boolean | false;
}
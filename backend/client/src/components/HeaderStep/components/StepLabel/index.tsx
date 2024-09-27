import React from 'react'
import "./style.css"
const StepLabel=({label, active}:Props)=>{
    if(active){
        return(
            <div className='step-label'>
                <div>{label}</div>
               
            </div>
        )
    }
    return(
        <div className='step-label__inactive'>
            <div>{label}</div>
           
        </div>
    )
}
interface Props{
    label:string;
    active?:boolean|false;
}
export default StepLabel
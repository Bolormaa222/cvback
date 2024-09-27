import React from 'react';
import CircleNumber from '../CicleNumber';
import StepLabel from '../StepLabel';
import './style.css'
const StepItem=({circle, label, dash, active}:Prop)=>{
    return(
        <div className='step-item'>
            <CircleNumber active={active} value={circle}/>
            <div className='ml-10'></div>
            <StepLabel active={active} label={label} />
            {
                dash &&  <div className=" ml-10 step-item__dash"></div>
            }
        </div>
    )
}
export default StepItem;
interface Prop {
    circle: number;
    label:string;
    dash:boolean;
    active?:boolean
}
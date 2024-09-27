import React from 'react';
import "./style.css"
import CircleNumber from './components/CicleNumber';
import StepItem from './components/StepItem';
const HeaderStep=({step}:HeaderStepProp)=>{
    return(
        <div className="header-step">
            <StepItem active={step>=1?true:false} circle={1} label='Choose template' dash={true}/>
            <StepItem active={step>=2?true:false} circle={2} label='Enter your details' dash={true}/>

            <StepItem active={step>=3?true:false} circle={3} label='Download resume' dash={false}/>

        </div>
    )
}
export default HeaderStep;
interface HeaderStepProp{
    step:number;
}
import React from 'react';
import './style.css'
const Progress=({progress}:Props)=>{
    return(
        <div className='progress'>
            <div className='progress__header'>
                <div className='progress__percent'>{progress}%</div>
                <div className='progress__text'>Your resume score</div>
            </div>
            <div className='progress__line'>
                <div className="progress__line-percent" style={{width: `${progress}%`}}></div>
            </div>
        </div>
    )
}
interface Props{
    progress:number;
}
export default Progress
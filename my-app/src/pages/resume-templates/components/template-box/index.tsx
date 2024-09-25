import React from 'react';
import './style.css'
import Button, { ButtonType } from '../../../../components/Button';
import {useNavigate} from 'react-router-dom'
const TemplateBox=({image, title, description}:TemplateBoxProps)=>{
    const navigate = useNavigate()
    return(
        <div className='template-box mt-50 mb-50' onClick={()=>{
            navigate(`${process.env.REACT_APP_DOMAIN}/app/create-resume/introduction?template=brussels`)
        }}>
            <div className="template-box__image">
                <img src={image} alt="" />
                <div className="template-box__hover">
                    <div className="template-box__hover-inside">
                        <Button className='ml--20 button-default button-size-medium' type={ButtonType.link} link={`${process.env.REACT_APP_DOMAIN}/app/create-resume/introduction?template=brussels`} title="Use This Template"/>
               
                    </div>
                </div>
            </div>
            <div className='template-box__bottom'>
                <h3 className='mb-10 mt-10'>{title}</h3>
                <p>{description}</p>
            </div>
            
            
        </div>
    )
}
export default TemplateBox;
type TemplateBoxProps={
    image?: any;
    title?: string;
    description?: string;
}
import React from 'react';
import Header from '../../components/Header';
import Button, { ButtonType } from '../../components/Button';
import "./style.css"
const ResumeTemplates=()=>{
    return(
        <div className='resume-templates'>
            <Header/>
            <div className='resume-templates__body'>
                <h3 className='mb-30 mt-20'>Only 2% of resumes make it past the first round. Be in the top 2%</h3>
                <p className="description mb-20">Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free! </p>
                <Button className="button-default button-size-big " type={ButtonType.link} link={`${process.env.REACT_APP_DOMAIN}/app/create-resume/introduction?template=brussels`} title={"Create My Resume"}/>
                
               
            </div>
        </div>
    )
}
export default ResumeTemplates
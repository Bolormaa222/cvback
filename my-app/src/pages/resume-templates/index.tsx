import React from 'react';
import Header from '../../components/Header';
import Button, { ButtonType } from '../../components/Button';
import "./style.css"
import cvTemplate1 from '../../images/cvimage.png'
import TemplateBox from './components/template-box';
const ResumeTemplates=()=>{
    return(
        <div className='resume-templates'>
            <Header/>
            <div className='resume-templates__body'>
                <h3 className='mb-30 mt-20'>Only 2% of resumes make it past the first round. Be in the top 2%</h3>
                <p className="description mb-20">Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free! </p>
                <Button className="button-default button-size-big " type={ButtonType.link} link={`${process.env.REACT_APP_DOMAIN}/resume-templates`} title={"Create My Resume"}/>
                
                <div className='resume-tempates__templates'>
                    <TemplateBox title={"London"} description='Classically structured resume template. for a robust career history.' image={cvTemplate1}/>

                    <TemplateBox title={"Santiago"} description='Classic full-page resume template with sizable resume sections' image={cvTemplate1}/>
                    <TemplateBox title={"Santiago"} description='Classic full-page resume template with sizable resume sections' image={cvTemplate1}/>
                    
                </div>
            </div>
        </div>
    )
}
export default ResumeTemplates
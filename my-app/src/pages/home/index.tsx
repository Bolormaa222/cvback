import React from 'react';
import Button, {ButtonType, ButtonProp} from '../../components/Button';


import "./style.css"
import Header from '../../components/Header';
const Home=()=>{
    
    return(
        <div className='home-page'>
            <Header/>
            <div className="home-page__body">
                <p className='subtitle mt-50 mb-50'>Online Resume builder </p>
                <h3 className='mb-50'>Only 2% of resumes make it past the first round. Be in the top 2%</h3>
                <p className="description mb-50">Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free! </p>
                <Button className="button-default button-size-big " type={ButtonType.link} link={`${process.env.REACT_APP_DOMAIN}/resume-templates`} title={"Create My Resume"}/>
                <img src={require('./cvimage.png')}/>
            </div>
            
        </div>
    )
}
export default Home;
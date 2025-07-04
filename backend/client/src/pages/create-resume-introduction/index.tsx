import React from 'react';
import Header from '../../components/Header';
import HeaderStep from '../../components/HeaderStep';
import BigTitle from '../../components/BigTitle';
import "./style.css"
import {Form, Formik} from 'formik'
import { IntroName } from '../../types';
import { defaultIntroName } from '../../default';
import * as Yup from 'yup'
import Input from '../../components/formik/input';
import Button, { ButtonType } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
const CreateResumeIntroduction=()=>{
    const navigate = useNavigate()
    const isEmailValid=(value:string)=>{
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(value)
    }
    
    return(
        <div className='intro'>
            <Header>
                <HeaderStep step={2}/>
            </Header>
            <div>
                <div className='intro__sub-header mt-50'>
                    <BigTitle label={"Add your name"}/>
                    <p className="description mt-20 ">
                        You made a great template selection! Now let's add your name to it.
                    </p>
                </div>
                <div className='intro__body'>
                    <Formik<IntroName>
                        initialValues={defaultIntroName}
                        validationSchema={Yup.object({
                            firstName:Yup.string().required("First Name is required")
                            .matches(/[a-zA-Z0-9\s]+/g, '* first This field cannot contain only blankspaces'),
                            lastName: Yup.string().min(2,'Last name should be at least 2 characters.').required("Last name is required")
                            .matches(/[a-zA-Z0-9\s]+/g, '* last This field cannot contain only blankspaces'),
                            email: Yup.string().required("Email is required").email("Invalid email format")
                        })}
                        onSubmit={(values, helpers)=>{
                            
                            
                            axios.post(`${process.env.REACT_APP_DOMAIN}/api/v1/add`,{
                                firstName:values.firstName,
                                email:values.email,
                                lastName: values.lastName
                            })
                            .then(data=>{
                                console.log("data ", data.data)
                                if(data.data.success){
                                   navigate(`/app/create-resume/continue/${data.data.data._id}`)
                                }
                                
                            })
                            .catch(err=>{
                                toast.error("Sorry, error occured. Try again.");
                                
                            })
                           
                            //send and create cv object with names and email then pass cvid in url
                        }}
                        >
                        {({values})=>(
                            <Form>
                                <Input
                                    name="firstName"
                                    label="First name"
                                />
                                <Input
                                    name="lastName"
                                    label="Last name"
                                />
                                <Input
                                    name="email"
                                    label="Email"
                                />
                                <div className='intro__bottom'>

                                <Button className='button-default button-size-medium' type={ButtonType.submit} title={"Continue"}></Button>
                            
                                </div>
                                </Form>
                        )}
                    </Formik>
                </div>
               
            </div>
            <ToastContainer />
        </div>
    )
}
export default CreateResumeIntroduction;
import React, { useEffect, useState } from 'react';
import "./style.css";
import Progress from './components/Progress';
import { FieldArray, Form, Formik, getIn, setIn } from 'formik';
import { defaultEducation, defaultExperience, defaultIntroName, defaultPersonalDetails, defaultSkill, defaultWebsiteLink } from '../../default';
import Input from '../../components/formik/input';
import { Document, Page, pdfjs } from 'react-pdf';
import TextArea from '../../components/formik/textArea';
import Checkbox from '../../components/formik/checkbox';
import Button, { ButtonType } from '../../components/Button';
import ButtonAdd from '../../components/ButtonAdd';
import ButtonText from '../../components/ButtonText';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PersonalDetails } from '../../types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const CreateResume = () => {
    const navigate = useNavigate()
    
    let {  id} = useParams();
    const [info, setInfo] = useState(defaultPersonalDetails)
    const [savedInfo, setSavedInfo]=useState<PersonalDetails|null>(null)
    const [loaded, setLoaded]=useState(false)
    const [numPages, setNumPages] = useState<number>();

    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        
    }
    useEffect(()=>{
        if(id!==undefined||id!==null){
            getInfo()
        }
    },[])
    const getInfo=async ()=>{
        try{
            setLoaded(false)
            const data = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/detail/${id}`)
            console.log("Data get info ", data.data.data)
            
            setInfo(inf=>{
                return{
                    ...inf, 
                    ...data.data.data}
            })
            setLoaded(true)
        }catch(err){
            setLoaded(false)
        }
    }

    return (
        <div className='create-resume'>
            <div className='create-resume__left'>
                <div className='create-resume__left__inside'>
                    <Progress progress={15} />
                    <h2 className='mt-30 mb-30'>
                        Personal details
                    </h2>
                    {loaded&&
                    (<div>
                        <Formik
                            initialValues={info}
                            validationSchema={Yup.object({
                                jobTitle: Yup.string().required("Job Title is required"),
                                nationality: Yup.string().required("Nationality is required"),
                                firstName: Yup.string().required('First Name is required'),
                                lastName: Yup.string().required("Last Name is required"),
                                email: Yup.string().required("Email is required"),
                                phone: Yup.string().required("Phone is required"),
                                country: Yup.string().notRequired(),
                                city: Yup.string().notRequired(),
                                linkedIn: Yup.string().notRequired(),
                                postalCode: Yup.string().notRequired(),
                                dateOfBirth: Yup.string().notRequired(),
                                placeOfBirth: Yup.string().notRequired(),
                                description: Yup.string().required("Description is required"),
                                experienceList: Yup.array(
                                    Yup.object({
                                        positionName: Yup.string().required("Position is required"),
                                        companyName: Yup.string().required("Company Name is required"),
                                        companyLocation: Yup.string().required("Company Location"),
                                        startDate:Yup.string().required("Start Date is required"),
                                        endDate: Yup.string().notRequired(),
                                        description: Yup.string().required("Description is required")
                                    })
                                ),
                                websiteLinks:Yup.array(
                                    Yup.object({
                                        name:Yup.string().required("Label is required"),
                                        link: Yup.string().required("Link is required")
                                    })
                                ),
                                educationList:Yup.array(
                                    Yup.object({
                                        degree:Yup.string().required("Degree is required"),
                                        major: Yup.string().required("Major is required"),
                                        start: Yup.string().required("Start date is required"),
                                        location:Yup.string().required("Location is required"),
                                        university: Yup.string().required("University is required")
                                    })
                                )
                            })}
                            onSubmit={async (values, helpers) => {
                                try{
                                    console.log("values ", values)
                                    const result = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/update/${id}`,values)
                                    console.log("after result ",result)
                                    setSavedInfo(result.data.data)
                                }catch(err){
                                    console.log("err ", err)
                                    setSavedInfo(null)
                                }
                            }}
                        >
                            {({ values, handleChange, handleBlur }) => (
                                <Form>
                                    <div className='layout-row'>
                                        <Input name="jobTitle" label="Job Title" />
                                        <Input name="nationality" className='pl-30' label="Nationality" />

                                    </div>
                                    <div className="layout-row">
                                        <Input name="firstName" className='' label="First Name" />
                                        <Input name="lastName" className='pl-30' label="Last Name" />
                                    </div>
                                    <div className="layout-row">
                                        <Input name="email" className='' label="Email" />
                                        <Input name="phone" className='pl-30' label="Phone" />
                                    </div>
                                    <div className="layout-row">
                                        <Input name="country" className='' label="Country" />
                                        <Input name="city" className='pl-30' label="City" />
                                    </div>
                                    <div className="layout-row">
                                        <Input name="linkedIn" className='' label="LinkedIn" />
                                        <Input name="postalCode" className='pl-30' label="Postal Code" />
                                    </div>
                                    <div className="layout-row">
                                        <Input name="dateOfBirth" className='' label="Date of Birth" />
                                        <Input name="placeOfBirth" className='pl-30' label="Place of Birth" />
                                    </div>
                                    <h2 className='mt-30 mb-10'>
                                        Professional Summary
                                    </h2>
                                    <div style={{ width: "100%" }}>
                                        <p className='description--normal mb-20'>Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>
                                        <TextArea name="description" className='' label="Description" />
                                    </div>
                                    {/* Employment history */}
                                    <h2 className='mt-30 mb-10'>
                                        Employment history
                                    </h2>
                                    <div>
                                        <p className='description--normal mb-20'>Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>
                                        <FieldArray name="experienceList">
                                            {({ push, remove }) => (
                                                <div>
                                                    {
                                                        values.experienceList.map((_, index) => (
                                                            <div className='experience__item' key={index}>
                                                                <div className="experience__item__header">
                                                                    <div className='experience__item__header__body'>
                                                                        <div className="experience__item__header__top">
                                                                            {_.positionName} {_.positionName.trim().length > 0 && _.companyName.trim().length > 0 ? 'at' : ' '} {_.companyName}
                                                                        </div>
                                                                        <div className="experience__item__header__bottom">
                                                                            {_.startDate} {_.startDate.trim().length > 0 && (_.still == true || (_.endDate !== undefined && _.endDate?.trim().length > 0) ? "-" : "")} {_.still ? "Present" : _.endDate}
                                                                        </div>
                                                                    </div>
                                                                    <div className='experience__item__header__end'>
                                                                        <ButtonText className='button-red-text button-size-medium' type={ButtonType.button} onClick={() => remove(index)} title='Remove' />
                                                                    </div>
                                                                </div>
                                                
                                                                <div className='layout-column-grid-2'>
                                                                    <Input name={`experienceList.${index}.positionName`} label="Position" />
                                                                </div>
                                                                <div className='layout-column-grid-2'>

                                                                    <Input name={`experienceList.${index}.companyName`} label="Company Name" />
                                                                    <div></div>
                                                                    <Input name={`experienceList.${index}.companyLocation`} label="Company Location" />
                                                                </div>
                                                                <div className='layout-column-grid-3_1_1__2'>
                                                                    <Input name={`experienceList.${index}.startDate`} onChange={handleChange} onBlur={handleBlur} label="Start Date" />
                                                                    <div></div>
                                                                    <Input disabled={_.still ? true : false} name={`experienceList.${index}.endDate`} onChange={handleChange} label="End Date" />
                                                                    <div></div>
                                                                    <Checkbox name={`experienceList.${index}.still`} label="Still Working" />
                                                                </div>
                                                                <div>
                                                                    <TextArea rows={50} name={`experienceList.${index}.description`} label="Description" />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div>
                                                        <ButtonAdd className='button-default-add button-size-medium'  type={ButtonType.button} title="Add More Employment" onClick={() => {

                                                            push(defaultExperience)
                                                        }} />
                                                    </div>
                                                </div>


                                            )}


                                        </FieldArray>

                                    </div>
                                    {/* Education history */}
                                    <h2 className='mt-30 mb-10'>
                                        Education History
                                    </h2>
                                    <div>
                                        <p className='description--normal mb-20'>Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>
                                        <FieldArray name="educationList">
                                            {({ push, remove }) => (
                                                <div>
                                                    {
                                                        values.educationList.map((_, index) => (
                                                            <div className='experience__item' key={index}>
                                                                 <div className="experience__item__header">
                                                                    <div className='experience__item__header__body'>
                                                                        <div className="experience__item__header__top">
                                                                            {_.degree} {_.degree.trim().length > 0 && _.university.trim().length > 0 ? 'at' : ' '} {_.university}
                                                                        </div>
                                                                        <div className="experience__item__header__bottom">
                                                                            {_.start} {_.start.trim().length > 0 && (_.still == true || (_.end !== undefined && _.end?.trim().length > 0) ? "-" : "")} {_.still ? "Present" : _.end}

                                                                        </div>
                                                                    </div>
                                                                    <div className='experience__item__header__end'>
                                                                        <ButtonText className='button-red-text button-size-medium' type={ButtonType.button} onClick={() => remove(index)} title='Remove' />
                                                                    </div>
                                                                </div> 
                                                
                                                                <div className='layout-column-grid-2'>
                                                                    <Input name={`educationList.${index}.university`} label="University" />
                                                                    <div>
                                                                        </div>
                                                                        <Input  name={`educationList.${index}.major`} label="Major" />
                                                                </div>
                                                                <div className='layout-column-grid-2'>

                                                                    <Input name={`educationList.${index}.degree`} label="Degree" />
                                                                    <div></div>
                                                                    <Input name={`educationList.${index}.location`} label="Location" />
                                                                </div>
                                                                <div className='layout-column-grid-3_1_1__2'>
                                                                    <Input name={`educationList.${index}.start`} onChange={handleChange}  label="Start Date" />
                                                                    <div></div>
                                                                    <Input disabled={_.still ? true : false} name={`educationList.${index}.end`} onChange={handleChange} label="End Date" />
                                                                    <div></div>
                                                                    <Checkbox name={`educationList.${index}.still`} label="Still Studying" />
                                                                </div>
                                                                
                                                            </div>
                                                        ))
                                                    }
                                                    <div>
                                                        <ButtonAdd className='button-default-add button-size-medium' type={ButtonType.button} title="Add More Education" onClick={() => {
                                                            push(defaultEducation)
                                                        }} />
                                                    </div>
                                                </div>


                                            )}


                                        </FieldArray>

                                    </div>
                                    {/*Websites & Social Links*/}

                                    <h2 className='mt-30 mb-10'>
                                        Websites & Social Links
                                    </h2>
                                    <div>
                                        <p className='description--normal mb-20'>Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>
                                        <FieldArray name="websiteLinks">
                                            {({ push, remove }) => (
                                                <div>
                                                    {
                                                        values.websiteLinks.map((_, index) => (
                                                            <div className='experience__item' key={index}>
                                                                 <div className="experience__item__header">
                                                                    <div className='experience__item__header__body'>
                                                                        <div className="experience__item__header__top">
                                                                            {_.name}
                                                                        </div>
                                                                        <div className="experience__item__header__bottom">
                                                                            {_.link} 

                                                                        </div>
                                                                    </div>
                                                                    <div className='experience__item__header__end'>
                                                                        <ButtonText className='button-red-text button-size-medium' type={ButtonType.button} onClick={() => remove(index)} title='Remove' />
                                                                    </div>
                                                                </div>  
                                                
                                                                <div className='layout-column-grid-2'>
                                                                    <Input name={`websiteLinks.${index}.name`} label="Label" />
                                                                    <div>
                                                                        </div>
                                                                        <Input  name={`websiteLinks.${index}.link`} label="Link" />
                                                                </div>
                                                               
                                                                
                                                            </div>
                                                        ))
                                                    }
                                                    <div>
                                                        <ButtonAdd className='button-default-add button-size-medium' type={ButtonType.button} title="Add more website link" onClick={() => {
                                                            push(defaultWebsiteLink)
                                                        }} />
                                                    </div>
                                                </div>


                                            )}


                                        </FieldArray>

                                    </div>

                                    {/*Skills*/}

                                    <h2 className='mt-30 mb-10'>
                                        Skills
                                    </h2>
                                    <div>
                                        <p className='description--normal mb-20'>Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>
                                        <FieldArray name="skills">
                                            {({ push, remove }) => (
                                                <div>
                                                    {
                                                        values.skills.map((_, index) => (
                                                            <div className='experience__item' key={index}>
                                                                
                                                
                                                                <div className='layout-column-grid-2' >
                                                                    <Input name={`skills.${index}.name`} label="Name" />
                                                                    <div></div>
                                                                    <div style={{display:"flex", justifyContent:"end", alignItems:"center"}}>
                                                                        <ButtonText className='button-red-text button-size-medium' type={ButtonType.button} onClick={() => remove(index)} title='Remove' />
                                                                    
                                                                    </div>
                                                                    
                                                                    
                                                                </div>
                                                               
                                                                
                                                            </div>
                                                        ))
                                                    }
                                                    <div >
                                                        <ButtonAdd className='button-default-add button-size-medium' type={ButtonType.button} title="Add more website link" onClick={() => {
                                                            push(defaultSkill)
                                                        }} />
                                                    </div>
                                                </div>


                                            )}


                                        </FieldArray>

                                    </div>


                                    <Button className='button-default button-size-big mt-50' title='Submit' type={ButtonType.submit} />
                                </Form>
                            )}
                           

                        </Formik>
                    </div>)
                    }
                </div>

            </div>
            <div className='create-resume__right'>
                <div>
                    <div className='create-resume__right__header'>
                        <div className="create-resume__right__header__left">
                            <Button type={ButtonType.button} onClick={()=>{
                                if(pageNumber==1){
                                    return
                                }
                                const num  = pageNumber-1;
                                setPageNumber(num)
                            }} title="-" className='button-default button-size-medium'/>
                            <div className="create-resume__pagenumber">{pageNumber}</div>
                            <Button type={ButtonType.button} onClick={()=>{
                                if(pageNumber==numPages){
                                    return
                                }
                                const num  = pageNumber+1;
                                setPageNumber(num)
                            }} title="+" className='button-default button-size-medium'/>
                        </div>
                        <Button className='button-default button-size-medium' title="Download PDF" onClick={()=>{
                            //if(savedInfo!==null){
                                window.open(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/invoice/${id}`, '_blank', 'noopener,noreferrer');
                            //}
                            }} type={ButtonType.button} />
                    </div>
                    <Document  className={"document"} file={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/invoice/${id}?time=${Math.random()}`} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page className={"page"} height={window.innerHeight-100} scale={1} renderTextLayer={false} renderAnnotationLayer={false} pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CreateResume
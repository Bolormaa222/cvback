import { Education, Experience, IntroName, PersonalDetails, Skill, WebsiteLink } from "./types";

export const defaultIntroName: IntroName={
    firstName:"",
    lastName:"",
    email:"",
}
export const defaultPersonalDetails: PersonalDetails={
    jobTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone:"",
    country: "",
    city: "",
    linkedIn: "",
    postalCode: "",
    nationality: "",
    placeOfBirth: "",
    dateOfBirth: "",
    description:"",
    experienceList:[],
    educationList:[],
    websiteLinks:[],
    skills:[]
}

export const defaultExperience: Experience={
    positionName: "",
    companyName:"",
    companyLocation:"",
    startDate: "",
    endDate:"",
    still:false,
    description: "",
    
}
export const defaultEducation:Education={
    degree:"",
    major:"",
    university: "",
    location: "",
    start:"",
    end: "",
    still: false,
}
export const defaultWebsiteLink:WebsiteLink={
    name:"",
    link:""
}
export const defaultSkill: Skill={
    name:""
}
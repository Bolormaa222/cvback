export interface IntroName{
    firstName: string;
    lastName: string;
    email: string;
}
export interface PersonalDetails{
    jobTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone:string;
    country: string;
    city: string;
    linkedIn?: string;
    postalCode?: string;
    nationality?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
    description:string;
    experienceList: Experience[];
    educationList: Education[];
    websiteLinks:WebsiteLink[];
    skills: Skill[];
}
export interface Experience{
    positionName:string;
    companyName:string;
    companyLocation:string;
    startDate: string;
    endDate?:string;
    still?:boolean;
    description: string;
    
}
export interface Education{
    degree:string;
    major:string;
    university: string;
    location: string;
    start:string;
    end?: string;
    still:boolean;
}
export interface WebsiteLink{
    name:string;
    link:string;
}
export interface Skill{
    name: string;
}
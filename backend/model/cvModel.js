
import "dotenv/config";

import mongoose from 'mongoose';

import validator from 'validator';

const {Schema} = mongoose;
const cvSchema = new Schema({
    websiteLinks:[
        {
            name:String,
            link:String
        }
    ],
    firstName: {
        type:String,
        required:true,
        validate:[/[a-zA-Z\s]+/, "First name can only have alpha numeric values. No special characters allowed."],
        trim:true
    },
    lastName:{
        type: String,
        required: true,
        validate: [
            /[a-zA-Z\s]+/, "Last name  can only have alpha numeric values. NO special cahracters allowed."
        ],
        trim: true
    },
    email:{
        type: String,
        required:true,
        validate: [
            validator.isEmail, "Please provide a valid email"
        ],
        lowercase:true
    },
    nationality:{
        type:String,
    },
    country:{
        type:String,
    },
    city:{
        type:String,
    },
    phone:{
        type: String,
    },
    linkedIn:{
        type: String,
    },
    jobTitle:{
        type: String
    },
    address: String,
    description: String,
    educationList:[
        {
            degree:String,
            major:String,
            university: String,
            location: String,
            start:String,
            end: String,
            still:Boolean
        }
    ],
    skills:[
        {
            name: String,
        }
    ],
    experienceList:[
        {
            positionName:String,
            companyName:String,
            companyLocation: String,
            startDate: String,
            endDate: String,
            present: Boolean,
            description: String,
            features: [
                {
                    name: String
                }
            ]
            
        }
    ]

})
const CV = mongoose.model("cv", cvSchema)
export default CV;
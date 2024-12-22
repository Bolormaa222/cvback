import chalk from 'chalk';
import mongoose from 'mongoose';
import { systemLogs } from '../utils/Logger.js';

const connectionToDB=async()=>{
    try{
        /*
        const connectionParams = {
            dbName: process.env.DB_NAME

        }
        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            connectionParams
        )
        */
        const connect = await mongoose.connect(
            "mongodb://cv_teamrefer:b116a99ae89499cc0f131bc6534ec4f827ac8627@65hn8.h.filess.io:27018/cv_teamrefer"
        )
       
        // log  for development
        console.log(`${chalk.blue.bold(`MOngodb connected: ${connect.connection.host}`)}`)
        //systemLogs.info(`${chalk.blue.bold(`MOngodb connected: ${connect.connection.host}`)}`)
    }catch(error){
        console.log(`${chalk.red.bold(`ERROR: ${error.message}`)}`)
        process.exit(1)
    }
}
export default connectionToDB;
import chalk from 'chalk';
import mongoose from 'mongoose';
import { systemLogs } from '../utils/Logger.js';

const connectionToDB=async()=>{
    try{
        const connectionParams = {
            dbName: process.env.DB_NAME

        }
        const connect = await mongoose.connect(
            process.env.MONGO_URI,
            connectionParams
        )
        // log  for development
        console.log(`${chalk.blue.bold(`MOngodb connected: ${connect.connection.host}`)}`)
        systemLogs.info(`${chalk.blue.bold(`MOngodb connected: ${connect.connection.host}`)}`)
    }catch(error){
        console.log(`${chalk.red.bold(`ERROR: ${error.message}`)}`)
        process.exit(1)
    }
}
export default connectionToDB;
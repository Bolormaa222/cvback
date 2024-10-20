import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import "dotenv/config"
import express from 'express';
 import morgan from 'morgan';
 import { morganMiddleware, systemLogs } from './utils/Logger.js';
 import mongoSanitize from 'express-mongo-sanitize';
 import connectionToDB from './config/connectDB.js';
 import route from './routes/index.js'
import { apiLimiter } from './middleware/apiLimiter.js';
import cron  from 'node-cron';
import path from 'path'
import {fileURLToPath} from 'url'

import cors from 'cors'
const __filename= fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)
console.log(__dirname)

 const app = express();
 await connectionToDB()
 if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
 };
 app.use(express.json())
 app.use(express.urlencoded({extended: false}));
 app.use(cookieParser())
 app.use(mongoSanitize())
 //app.use(morganMiddleware)
 app.use(cors());

app.use("/api/v1/",apiLimiter, route)

app.use(express.static(path.join(__dirname, '/client/build')))
app.get("*", (req, res)=>res.sendFile(path.join(__dirname,'/client/build/index.html')))
const PORT = process.env.PORT || 1997;
app.listen(PORT, ()=>{
    console.log(`${chalk.green.bold("check")} Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`);
    //systemLogs.info(`${chalk.green.bold("check")} Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`);

});
cron.schedule('* * * * *', async () => {
    console.log('running every minute 1, 2, 4 and 5');
    const result = await fetch("https://cron-8kds.onrender.com/cron",{
      method:"GET"
    });
    let res = await result.json()
    console.log("res ", res)
  });
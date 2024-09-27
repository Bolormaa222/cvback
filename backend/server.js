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
import cors from 'cors'
 const app = express();
 await connectionToDB()
 if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
 };
 app.use(express.json())
 app.use(express.urlencoded({extended: false}));
 app.use(cookieParser())
 app.use(mongoSanitize())
 app.use(morganMiddleware)
 app.use(cors());
app.get("/",(req, res)=>{
    res.send("hi")
})
app.use("/api/v1/",apiLimiter, route)

const PORT = process.env.PORT || 1997;
app.listen(PORT, ()=>{
    console.log(`${chalk.green.bold("check")} Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`);
    systemLogs.info(`${chalk.green.bold("check")} Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on port ${chalk.blue.bold(PORT)}`);

});

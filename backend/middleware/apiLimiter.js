import rateLimit from 'express-rate-limit';
import { systemLogs } from '../utils/Logger.js';

export const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max:1000,
    message:{
        message: "too many requests from this ip address please try after 15 minutes"
    },
    handler: (req, res, next, options)=>{
        systemLogs.error(
            `Too many requests: ${options.message.message}\t${req.method}\t${req.urls}\t${req.headers.origin}`
        );
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false
})

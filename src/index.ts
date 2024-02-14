import express from 'express';
import {json} from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './infra/database/dbConfig';
import userRoute from './interface/routes/user';
import adminRoute from './interface/routes/admin';

const app = express()
app.use(json())
dotenv.config()

const mongoString = process.env.DATABASE_URL as string;

connectDB(process.env.DATABASE_URL || '')

app.use('/api',userRoute)
app.use('/api/admin',adminRoute)

const port  = process.env.PORT
app.listen(port,()=>{
    console.log(`server running at ${port}`)
})
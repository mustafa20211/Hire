import http from 'http'
import express from "express";
import { config } from 'dotenv';
import loginApi from './apis/login_api.js';
import createDataApi from './apis/create_data.js';
import updateDataApi from './apis/update_data.js';
import getDataApi from './apis/get_data.js';
import createUser from './apis/createUser_api.js';
import mongoose from 'mongoose';
import errorHandeler from './middleware/errorHandeling.js';
import applyFormApi from './apis/apply_form.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import confirmMailApi from './apis/conf_mailApi.js';

config()
const config_data = process.env
const port = config_data.PORT
const DbUrl = config_data.DB_URI
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express();
const server = http.createServer(app);

////////////// main middlware 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


////////////////////////////
//////////// apis 

app.use('/login', loginApi)
app.use('/createUser', createUser)
app.use('/createData', createDataApi)
app.use('/updateData', updateDataApi)
app.use('/getData' , getDataApi)
app.use('/apply' , applyFormApi)
app.use('/sendmail' , confirmMailApi)
app.use(errorHandeler)
//////////////////////////


//////////////////////////////// connect to db and start server
mongoose.connect(DbUrl).then(
    res=>server.listen(port, (port) => {
        console.log(`running on port ${port}`)
    })
).catch(err=>console.log('failed to connect to db '))


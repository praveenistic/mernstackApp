import express from 'express';
import Conncetion from './database/db.js'
import dotenv from 'dotenv';
import DefaultData from './default.js';
import router from './routes/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import {v4 as uuid} from 'uuid'


const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

const PORT = process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URL || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.jpm8cvg.mongodb.net/?retryWrites=true&w=majority`;

Conncetion(URL);

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/'))
}

app.listen(PORT, ()=>console.log(`Server is running at PORT ${PORT}`));

DefaultData();

export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams={};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'callback',
paytmParams['EMAIL'] = 'parveensharmakanina@gmail.com',
paytmParams['MOBILE_NO'] = '9467181416'

import express from 'express';
import customerRoutes from "./routes/customer-routes";
import dotenv from 'dotenv';
import itemRoutes from "./routes/item-routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use('/',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');

    next();
})
app.use('/customers',customerRoutes);
app.use('/item',itemRoutes);

app.listen(3000, (err=>{
    console.log("Server running on port 3000");
}));

app.use('/',(req,res,next)=>{
    res.status(200).send('Not Found');
})

console.log('DATABASE_URL:', process.env.DATABASE_URL);
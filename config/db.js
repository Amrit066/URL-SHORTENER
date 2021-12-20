const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({path:'./config/config.env'});

const db = process.env.DATABASE;

mongoose.connect(db, {
    useNewUrlParser : true,
    // useCreateIndex : true,
    // useUnifiedTopology : true,
    // useFindAndodify : false
})
.then(()=>
{
    console.log('connection successful');
}
)
.catch((err)=>{
    console.log(err);
})
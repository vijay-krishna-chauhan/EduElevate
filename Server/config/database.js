const mongoose=require("mongoose");
require("dotenv").config();
const dbConnect=()=>mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("DB is connected successfully");
}).catch((e)=>{
    console.log("Issue in DB connection");
    console.error(e.message);
    process.exit(1);
    }
)
module.exports=dbConnect;
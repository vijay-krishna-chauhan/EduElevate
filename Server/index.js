const express=require("express");
const app=express();

const dbConnect=require("./config/database");
const PORT=process.env.PORT || 4000;
dbConnect();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");

const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload=require("express-fileupload");


const dotenv=require("dotenv").config();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000", //request of frontend from localhost comes from port 3000
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

//dfault route
app.get("/", (req,res)=> {
    return res.json({
        success:true,
        message:'Your server is up and running...'
    })
})

app.listen(PORT, ()=>{
    console.log(`Port is running at ${PORT}`);
})
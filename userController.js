const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

//REGISTRATION USER
exports.registrationUser = catchAsyncErrors(async(req,res,next) => {
    const {firstname,lastname,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({success : false , message : "email already exist"})
            console.log("email already exist.............." ,req.body.email)
        }else {
            const user = new User({firstname,lastname,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({success : true , message:"sucessfull" , user})
                    console.log("successfull.............." ,req.body)
                }
            })
            // sendToken(user, 201, res)
        }  
    })
})


//LOGIN USER

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email & Password", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)
})
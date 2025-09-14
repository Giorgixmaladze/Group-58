
const sendErrorProd = (err,req,res,next) =>{
    res.status(err.statusCode).json({
        message:err.message,
        status:err.status,
    })
}

const sendErrorDev = (err,req,res,next) =>{
    res.status(err.statusCode).json({
        message:err.message,
        statusCode: err.statusCode,
        status:err.status,
        errStack:err.stack,
        isOperational:err.isOperational
    })
}

const globalErrorHandler = (err,req,res,next) =>{
    if(process.env.NODE_ENV === "dev"){
        sendErrorDev(err,req,res,next)
    }else if(process.env.NODE_ENV=== "prod"){
        sendErrorProd(err,req,res,next)
    }    

}

module.exports = globalErrorHandler
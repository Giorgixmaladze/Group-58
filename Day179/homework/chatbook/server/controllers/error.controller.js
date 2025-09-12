const globalErrorHandler = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    res.status(err.statusCode).json(err)
}

module.exports(globalErrorHandler)

// შექმნილია ფუნქცია სახელად globalErrorHandler რომლის საშუალებითაც ვაკონტროლებთ ძირითადად ისეთ ერორებს რომელსაც mongoDB აწარმოებს ან სტატუსის კოდი როცა არაა ცნობილი,ამ შემთხვევაში თუ სტატუსის კოდი იქნება undefined ავტომატურად ჩაჯდება 500 ან სტატუსი თუ არ გვაქვს ავტომატურად ჩაჯდება "error" შემდეგ კი ვაბრუნებთ ერორის ობიექტს პასუხად. ეს იმ შემთხვევაში გაეშვება როცა ერორი მოხდება სერვერზე
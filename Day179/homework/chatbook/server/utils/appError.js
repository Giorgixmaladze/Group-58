
// შეიქმნა კლასი სახელად AppError რომლის საშუალებითაც შეგვიძლია შევქმნათ ერორი და დავაბრუნოთ უფრო კარგი სტრუქტურის სახით

class AppError {
    constructor(message,statusCode){
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")?"fail":"error";
        this.isOperational = true
    }
}

module.exports = AppError
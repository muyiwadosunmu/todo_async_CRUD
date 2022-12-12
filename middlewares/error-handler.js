const { CustomAPIError } = require('../errors/customErrors');


const errorHandlerMiddleware = (err,req,res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(500).json({msg:err.message})
    }
};

module.exports = errorHandlerMiddleware;
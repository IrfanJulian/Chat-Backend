const response = ( res, result, status, statusCode, message, pagination ) => {
    const resultPrint = {};
    resultPrint.status = status;
    resultPrint.statusCode = statusCode;
    resultPrint.data = result;
    resultPrint.message = message || null;
    if (pagination)resultPrint.pagination = pagination;
    res.status(statusCode).json(resultPrint);
}

module.exports = {response}
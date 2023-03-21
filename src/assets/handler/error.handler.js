const ErrorHandler = (err, req, res, next) => {
    const { status, message, error } = err;

    const objErr = {
        status: status || 500,
        message: message,
        error: error
    }

    return res.status(objErr.status)
            .json({
                rc: "01",
                rd: objErr?.message,
                caused: err,
                ...objErr
            })
}

export default ErrorHandler;
import withJoi from "next-joi";

export default withJoi({
    onValidationError: (_, res, error) => {
        return res.status(400).json({rc: "01", rd: `Validation error`, ...error});
    }
})
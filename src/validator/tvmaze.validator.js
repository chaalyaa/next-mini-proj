import Joi from "joi";
import validator from '@/src/validator/default.validator';

const search = validator({
    query: Joi.object({
        searchBy: Joi.string().required(),
        keySearch: Joi.string().required()
    })
})

const TVMazeValidator = {
    search,
}

export { TVMazeValidator }
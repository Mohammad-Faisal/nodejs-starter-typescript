import Joi from 'joi';


export default {

    createUser: {
        name: Joi.string().required(),
        age: Joi.number().required(),
    }
};
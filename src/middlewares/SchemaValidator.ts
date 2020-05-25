import Joi from'joi';
import _ from 'lodash';
import { ErrorResponse } from '../models/ErrorResponse';
import { ErrorCodes } from '../constants/ErrorCodes';
import CustomError from '../models/CustomError';

module.exports = (validationSchema) => {

    const _validationOptions = {
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };

    return (req, res, next) => {

        const route = req.route.path;
        const method = req.method.toLowerCase();

        //if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {

            // get schema for the current route
            //const _schema = _.get(Schemas, route);
            const _schema =validationSchema;

            if (_schema) {

                // Validate req.body using the schema and validation options
                return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {

                    if (err) {

                        // Joi Error
                        const JoiError = {
                            status: 'failed',
                            error: {
                                original: err._object,

                                // fetch only message and type from each error
                                details: _.map(err.details, ({message, type}) => ({
                                    message: message.replace(/['"]/g, ''),
                                    type
                                }))
                            }
                        };


                        next(new CustomError(ErrorCodes.REQUEST_VALIDATION_ERROR ,err.message.replace(/['"]/g, '')))

                    } else {
                        req.body = data;
                        next();
                    }

                });

            }

        next();
    }
}
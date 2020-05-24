import Joi from'joi';
import _ from 'lodash';

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

                        // Custom Error
                        const CustomError = {
                            status: 'failed',
                            error: 'Invalid request data. Please review request and try again.'
                        };

                       
                        res.status(422).json(JoiError);

                    } else {
                        // Replace req.body with the data after Joi validation
                        req.body = data;
                        next();
                    }

                });

            }
        //}

        next();
    }
}
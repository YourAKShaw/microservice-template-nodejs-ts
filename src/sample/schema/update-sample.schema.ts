import Joi from 'joi';

const UpdateSampleSchema = Joi.object({
  sampleBoolean: Joi.boolean(),
  sampleNumber: Joi.number(),
  sampleString: Joi.string(),
}).required() as Joi.ObjectSchema;

export default UpdateSampleSchema;

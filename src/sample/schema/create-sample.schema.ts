import Joi from 'joi';

const CreateSampleSchema = Joi.object({
  sampleBoolean: Joi.boolean(),
  sampleNumber: Joi.number(),
  sampleString: Joi.string(),
}).required() as Joi.ObjectSchema;

export default CreateSampleSchema;

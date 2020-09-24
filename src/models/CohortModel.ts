import Joi from 'joi';
import ModelFactory from './factory';

const cohortSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .required(),
  programDates: Joi.array()
    .items({
      id: Joi.string().alphanum(),
      start: Joi.date(),
      end: Joi.date(),
    })
    .required(),
  createdAt: Joi.date(),
});

/**
 * These are fields that should not be updated and hence,
 * are only made available at creation time.
 */
const protectedFields = ['id'];

export default ModelFactory('cohorts', cohortSchema, protectedFields);

import Joi from 'joi';
import ModelFactory from './factory';

const cohortSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[\w\s]/)
    .min(3)
    .required(),
  startDate: Joi.date().required(),
  traineeCount: Joi.number(),
  programDates: Joi.array()
    .items({
      id: Joi.string().alphanum(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
    .length(3)
    .required(),
  createdAt: Joi.date(),
});

/**
 * These are fields that should not be updated and hence,
 * are only made available at creation time.
 */
const protectedFields = ['id'];

export default ModelFactory('cohorts', cohortSchema, protectedFields);

import Joi from 'joi';
import ModelFactory from './factory';

const programSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .required(),
  prerequisiteProgramId: Joi.string()
    .alphanum()
    .allow(''),
  traineeCount: Joi.number()
    .min(0)
    .required(),
  durationInWeeks: Joi.number()
    .min(1)
    .required(),
  ratingCadenceInWeeks: Joi.number().min(1),
  ratingAttributes: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      graphic: Joi.string().uri(),
    })
  ),
  createdAt: Joi.date(),
});

/**
 * These are fields that should not be updated and hence,
 * are only made available at creation time.
 */
const protectedFields = ['id'];

export default ModelFactory('programs', programSchema, protectedFields);

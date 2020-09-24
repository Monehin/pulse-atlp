import Joi from 'joi';
import ModelFactory from './factory';

const inviteSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .pattern(/^\w$/)
    .required(),
  lastname: Joi.string()
    .min(3)
    .pattern(/^\w$/)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string(),
  role: Joi.array()
    .items(Joi.string())
    .required(),
  cohortId: Joi.string().alphanum(), // will only show up for trainees
  invitedBy: Joi.string()
    .alphanum()
    .required(),
  createdAt: Joi.date(),
});

/**
 * These are fields that should not be updated and hence,
 * are only made available at creation time.
 */
const protectedFields = ['id'];

export default ModelFactory('invites', inviteSchema, protectedFields);

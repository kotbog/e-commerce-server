import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    first_name: Joi.string().required().label("First name"),
    last_name: Joi.string().required().label("Last name"),
  });

  return schema.validate(body);
};

export const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(body);
};

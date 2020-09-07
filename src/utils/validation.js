import * as yup from 'yup';

export const yupCreatePassword = yup
  .string()
  .required()
  .min(8, 'validations.passwordMin')
  .matches(/(?=.*[A-Z])/, 'validations.passwordBigLetter')
  .matches(/(?=.*[0-9])/, 'validations.passwordNumber')
  .matches(/(?=.*[!@#$%^&*])/, 'validations.passwordSpecial');

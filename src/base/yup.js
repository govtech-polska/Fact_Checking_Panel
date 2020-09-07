/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';
import i18next from 'i18next';

const mixed = {
  required: 'validations.required'
};

const string = {
  min: ({ min }) => i18next.t('validations.min', { min }),
  max: ({ max }) => i18next.t('validations.max', { max }),
  email: 'validations.email',
  url: 'validations.url'
};

const number = {};

const date = {};

const boolean = {};

const object = {};

const array = {};

const messages = {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
};

setLocale(messages);

import { ALL_OPTIONS } from 'components/Filters';
import { specializationOptions } from 'consts';

export const USERS_FILTERS = [
  {
    name: 'specialization',
    label: 'Specjalizacja',
    i18nkey: 'filters.specialization',
    defaultValue: ALL_OPTIONS.value,
    options: [ALL_OPTIONS, ...specializationOptions]
  },
  {
    name: 'is_active',
    label: 'Zdezaktywowane?',
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        value: 'false',
        label: 'Zdezaktywowane'
      },
      {
        value: 'true',
        label: 'Aktywne'
      }
    ]
  }
];

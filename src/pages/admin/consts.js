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
    i18nkey: 'filters.isActive',
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        value: 'false',
        label: 'Zdezaktywowane',
        i18nkey: 'filters.accountNotActive'
      },
      {
        value: 'true',
        label: 'Aktywne',
        i18nkey: 'filters.accountActive'
      }
    ]
  }
];

import { rolesTypes } from 'consts';
import { ALL_OPTIONS } from 'components/Filters';
import { FILTERS as FILTERS_NAMES } from 'storages/filters/actions';

export const FILTERS = {
  ALL: [
    {
      name: 'current_verdict',
      i18nkey: 'filters.verificationStatus',
      label: 'Status weryfikacji',
      defaultValue: ALL_OPTIONS.value,
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'verdictTypes.true',
          label: 'Prawda',
          value: 'true'
        },
        {
          i18nkey: 'verdictTypes.false',
          label: 'Fałsz',
          value: 'false'
        },
        {
          i18nkey: 'verdictTypes.unidentified',
          label: 'Nieweryfikowalne',
          value: 'unidentified'
        }
      ]
    },
    {
      name: 'is_published',
      i18nkey: 'filters.isPublished',
      label: 'Opublikowane przez moderatora?',
      defaultValue: 'true',
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'filters.yes',
          label: 'Tak',
          value: 'true'
        },
        {
          i18nkey: 'filters.no',
          label: 'Nie',
          value: 'false'
        }
      ]
    }
  ],
  [rolesTypes.CHECKER]: [
    {
      name: 'is_assigned_to_me',
      i18nkey: 'filters.assignedToMe',
      label: 'Przypisane do mnie',
      defaultValue: ALL_OPTIONS.value,
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'filters.yes',
          label: 'Tak',
          value: true
        },
        {
          i18nkey: 'filters.no',
          label: 'Nie',
          value: false
        }
      ]
    }
  ]
};

export const DYNAMIC_FILTERS = {
  [rolesTypes.CHECKER]: [
    {
      actionName: FILTERS_NAMES.TAGS,
      filterName: 'tags',
      label: 'Tagi',
      i18nkey: 'filters.tags'
    },
    {
      actionName: FILTERS_NAMES.DOMAIN,
      filterName: 'domains',
      label: 'Kategorie',
      i18nkey: 'filters.categories'
    }
  ],
  [rolesTypes.EXPERT]: [
    {
      actionName: FILTERS_NAMES.TAGS,
      filterName: 'tags',
      label: 'Tagi',
      i18nkey: 'filters.tags'
    },
    {
      actionName: FILTERS_NAMES.DOMAIN,
      filterName: 'domains',
      label: 'Kategorie',
      i18nkey: 'filters.categories'
    }
  ],
  [rolesTypes.SPECIALIST]: [
    {
      actionName: FILTERS_NAMES.TAGS,
      filterName: 'tags',
      label: 'Tagi',
      i18nkey: 'filters.tags'
    },

    {
      actionName: FILTERS_NAMES.DOMAIN,
      filterName: 'domains',
      label: 'Kategorie',
      i18nkey: 'filters.categories'
    }
  ]
};

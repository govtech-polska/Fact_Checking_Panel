import { rolesTypes } from 'consts';
import { ALL_OPTIONS } from 'components/Filters';
import { FILTERS as FILTERS_NAMES } from 'storages/filters/actions';

const expertFilters = [
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'current_verdict',
    i18nkey: 'filters.verdict',
    label: 'Werdykt',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'verdictTypes.no_verdict',
        label: 'Brak werdyktu',
        value: 'no_verdict'
      },
      {
        i18nkey: 'verdictTypes.true',
        label: 'Prawda',
        value: 'true'
      },
      {
        i18nkey: 'verdictTypes.false',
        label: 'Fake News',
        value: 'false'
      },
      {
        i18nkey: 'verdictTypes.unidentified',
        label: 'Nieweryfikowalne',
        value: 'unidentified'
      },
      {
        i18nkey: 'verdictTypes.spam',
        label: 'Spam',
        value: 'spam'
      },
      {
        i18nkey: 'verdictTypes.dispute',
        label: 'Spór',
        value: 'dispute'
      }
    ]
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'assigned_to_me',
    i18nkey: 'filters.assignedToMe',
    label: 'Przypisane do mnie',
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
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_spam',
    label: 'Spam',
    i18nkey: 'filters.spam',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'filters.spamTrue',
        label: 'Jest spamem',
        value: 'true'
      },
      {
        i18nkey: 'filters.spamFalse',
        label: 'Nie jest spamem',
        value: 'false'
      }
    ]
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_duplicate',
    label: 'Duplikat',
    i18nkey: 'filters.isDuplicate',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'filters.duplicateTrue',
        label: 'Jest duplikatem',
        value: 'true'
      },
      {
        i18nkey: 'filters.duplicateFalse',
        label: 'Nie jest duplikatem',
        value: 'false'
      }
    ]
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_sensitive',
    label: 'Wrażliwe słowa',
    i18nkey: 'filters.isSensitive',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'filters.includeSensitiveWords',
        label: 'Zawiera wrażliwe słowa',
        value: 'true'
      },
      {
        i18nkey: 'filters.notIncludeSensitiveWords',
        label: 'Nie zawiera wrażliwych słów',
        value: 'false'
      }
    ]
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_verified',
    label: 'Werdykt eksperta',
    i18nkey: 'filters.expertVerdict',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'filters.waitingForVerification',
        label: 'Czeka na akceptację',
        value: 'true'
      },
      {
        i18nkey: 'filters.noExpertVerdict',
        label: 'Nie posiada werdyktu',
        value: 'false'
      }
    ]
  }
];

const adminFilters = [
  {
    name: 'current_verdict',
    label: 'Werdykt',
    i18nkey: 'filters.verdict',
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        label: 'Brak werdyktu',
        value: 'no_verdict',
        i18nkey: 'verdictTypes.no_verdict'
      },
      {
        label: 'Prawda',
        value: 'true',
        i18nkey: 'verdictTypes.true'
      },
      {
        label: 'Fake News',
        value: 'false',
        i18nkey: 'verdictTypes.false'
      },
      {
        label: 'Nieweryfikowalne',
        value: 'unidentified',
        i18nkey: 'verdictTypes.unidentified'
      },
      {
        label: 'Spam',
        value: 'spam',
        i18nkey: 'verdictTypes.spam'
      },
      {
        label: 'Czeka na werdykt eksperta',
        value: 'awaiting',
        i18nkey: 'verdictTypes.awaiting'
      }
    ]
  },
  {
    name: 'is_duplicate',
    i18nkey: 'filters.isDuplicate',
    label: 'Czy duplikat?',
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
  },
  {
    name: 'deleted',
    i18nkey: 'filters.deleted',
    label: 'Czy usunięte?',
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
  },
  {
    name: 'is_pinned',
    i18nkey: 'filters.isPinned',
    label: 'Czy przypięte na portalu?',
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
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_sensitive',
    i18nkey: 'filters.isSensitive',
    label: 'Wrażliwe słowa',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'filters.includeSensitiveWords',
        label: 'Zawiera wrażliwe słowa',
        value: 'true'
      },
      {
        i18nkey: 'filters.notIncludeSensitiveWords',
        label: 'Nie zawiera wrażliwych słów',
        value: 'false'
      }
    ]
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_published',
    i18nkey: 'filters.isPublished',
    label: 'Czy opublikowane?',
    options: [
      ALL_OPTIONS,
      {
        i18nkey: 'filters.published',
        label: 'Opublikowane',
        value: 'true'
      },
      {
        i18nkey: 'filters.unpublished',
        label: 'Nieopublikowane',
        value: 'false'
      }
    ]
  },
  {
    defaultValue: ALL_OPTIONS.value,
    name: 'is_verified_by_expert',
    label: 'Zweryfikowane przez eksperta?',
    i18nkey: 'filters.verifiedByExpert',
    options: [
      ALL_OPTIONS,
      {
        label: 'Tak',
        value: 'true',
        i18nkey: 'filters.yes'
      },
      {
        label: 'Nie',
        value: 'false',
        i18nkey: 'filters.no'
      }
    ]
  }
];
export const FILTERS = {
  [rolesTypes.ADMIN]: adminFilters,
  [rolesTypes.MODERATOR]: adminFilters,
  [rolesTypes.CHECKER]: [
    {
      defaultValue: 'false',
      name: 'is_opined',
      i18nkey: 'filters.verificationStatus',
      label: 'Status weryfikacji',
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'verdictTypes.true',
          label: 'Zweryfikowane',
          value: 'true'
        },
        {
          i18nkey: 'verdictTypes.false',
          label: 'Do weryfikacji',
          value: 'false'
        }
      ]
    }
  ],
  [rolesTypes.EXPERT]: expertFilters,
  [rolesTypes.SPECIALIST]: expertFilters
};

export const DYNAMIC_FILTERS = {
  [rolesTypes.ADMIN]: [
    {
      actionName: FILTERS_NAMES.ADMIN_TAGS,
      filterName: 'tags',
      i18nkey: 'filters.tags',
      label: 'Tagi'
    },
    {
      actionName: FILTERS_NAMES.DOMAIN,
      filterName: 'domains',
      i18nkey: 'filters.categories',
      label: 'Kategorie'
    }
  ],
  [rolesTypes.MODERATOR]: [
    {
      actionName: FILTERS_NAMES.ADMIN_TAGS,
      filterName: 'tags',
      i18nkey: 'filters.tags',
      label: 'Tagi'
    },
    {
      actionName: FILTERS_NAMES.DOMAIN,
      filterName: 'domains',
      i18nkey: 'filters.categories',
      label: 'Kategorie'
    }
  ],
  [rolesTypes.EXPERT]: [
    {
      actionName: FILTERS_NAMES.TAGS,
      filterName: 'tags',
      i18nkey: 'filters.tags',
      label: 'Tagi'
    },
    {
      actionName: FILTERS_NAMES.DOMAIN,
      filterName: 'domains',
      i18nkey: 'filters.categories',
      label: 'Kategorie'
    }
  ],
  [rolesTypes.SPECIALIST]: [
    {
      actionName: FILTERS_NAMES.TAGS,
      filterName: 'tags',
      i18nkey: 'filters.tags',
      label: 'Tagi'
    }
  ]
};

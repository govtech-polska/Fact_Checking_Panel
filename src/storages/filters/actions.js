import { apiUrls } from 'urls';
import { apiAction } from 'base/api/redux';
import { resolveUrl } from 'utils/url';

export const FILTERS = {
  TAGS: 'tags',
  ADMIN_TAGS: 'adminTags',
  DOMAIN: 'domain'
};

export const FILTERS_ACTION_TYPES = (() =>
  Object.entries(FILTERS).reduce((acc, [k, v]) => ({ ...acc, [v]: `filters.${k}` }), {}))();

export const filtersActions = {
  [FILTERS.TAGS]: search =>
    apiAction(FILTERS_ACTION_TYPES[FILTERS.TAGS], resolveUrl(apiUrls.SUBMISSIONS.HASHTAGS.LIST, {}, { search })),
  [FILTERS.ADMIN_TAGS]: search =>
    apiAction(FILTERS_ACTION_TYPES[FILTERS.ADMIN_TAGS], resolveUrl(apiUrls.ADMIN.HASHTAGS.LIST, {}, { search })),
  [FILTERS.DOMAIN]: search =>
    apiAction(FILTERS_ACTION_TYPES[FILTERS.DOMAIN], resolveUrl(apiUrls.ADMIN.DOMAINS.LIST, {}, { search }))
};

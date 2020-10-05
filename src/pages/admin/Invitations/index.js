import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';

import Suspense from 'components/Suspense';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import Filters, { ALL_OPTIONS } from 'components/Filters';
import InvitationsTable from './InvitationsTable';

const FILTERS = [
  {
    name: 'status',
    label: 'Status zaproszenia',
    i18nkey: 'invitations.status',
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        label: 'Oczekujące',
        value: 'waiting',
        i18nkey: 'invitations.states.waiting'
      },
      {
        label: 'Wykorzystane',
        value: 'used',
        i18nkey: 'invitations.states.used'
      },
      {
        label: 'Błąd wysyłki',
        value: 'failed',
        i18nkey: 'invitations.states.failed'
      },
      {
        label: 'W trakcie rejestracji',
        value: 'in_progress',
        i18nkey: 'invitations.states.in_progress'
      }
    ]
  },
  {
    name: 'is_expired',
    label: 'Czy przeterminowane?',
    i18nkey: 'filters.isExpired',
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        label: 'Przeterminowane',
        value: 'true',
        i18nkey: 'filters.yes'
      },
      {
        label: 'Nieprzeterminowane',
        value: 'false',
        i18nkey: 'filters.no'
      }
    ]
  }
];

const Invitations = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const { error, isFetching, data } = useSelector(({ admin }) => admin.invitations);

  useEffect(() => {
    dispatch(adminActions.invitations(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(query)]);

  return (
    <>
      <Title>{t('invitations.title')}</Title>
      <Filters filters={FILTERS} />
      <Suspense waitFor={{ data, isFetching, error }} polling>
        <InvitationsTable invitations={data?.results || []} />
        <Pagination total={data?.total} pageSize={data?.page_size} />
      </Suspense>
    </>
  );
};

export default Invitations;

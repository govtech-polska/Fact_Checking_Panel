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
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        label: 'Oczekujące',
        value: 'waiting'
      },
      {
        label: 'Wykorzystane',
        value: 'used'
      },
      {
        label: 'Błąd wysyłki',
        value: 'failed'
      },
      {
        label: 'W trakcie rejestracji',
        value: 'in_progress'
      }
    ]
  },
  {
    name: 'is_expired',
    label: 'Czy przeterminowane?',
    defaultValue: ALL_OPTIONS.value,
    options: [
      ALL_OPTIONS,
      {
        label: 'Przeterminowane',
        value: 'true'
      },
      {
        label: 'Nieprzeterminowane',
        value: 'false'
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

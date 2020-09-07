import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';
import { rolesTypes } from 'consts';

import Suspense from 'components/Suspense';
import UserTable from 'components/UsersTable';
import Filters, { ALL_OPTIONS } from 'components/Filters';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import Toast from 'components/Toast';
import AddUserModal from 'components/users/AddUserModal';
import { USERS_FILTERS } from 'pages/admin/consts';

import styles from './Specialists.module.scss';

const getFilters = (domainsOptions = []) => [
  {
    name: 'domain',
    label: 'Kategoria',
    defaultValue: ALL_OPTIONS.value,
    options: [ALL_OPTIONS, ...domainsOptions]
  },
  ...USERS_FILTERS
];

const Specialists = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { specialists, add, update, domains } = useSelector(({ admin }) => ({
    specialists: admin.users.specialists,
    add: admin.users.add,
    update: admin.users.update,
    domains: admin.domains.list
  }));

  useEffect(() => {
    dispatch(adminActions.users.specialists(query));
    dispatch(adminActions.domains.list());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(query), update.data]);

  useEffect(() => {
    return () => dispatch(adminActions.users.clearUpdate());
    // eslint-disable-next-line
  }, []);

  const openModal = () => {
    dispatch(adminActions.users.clearAdd());
    setOpen(true);
  };

  const handleStatusChange = (id, nextActive) => {
    dispatch(adminActions.users.update(id, { is_active: nextActive }));
  };

  const handleRoleChange = (id, role, domain, afterSuccess) => {
    dispatch(adminActions.users.update(id, { role, domain }, afterSuccess));
  };

  const handleSubmit = ({ email, domain }) => {
    dispatch(adminActions.users.add({ email, domain, user_role: 'specialist' }));
  };

  return (
    <>
      <Title>Eksperci</Title>
      <Filters
        filters={getFilters(domains.data?.results.map(domain => ({ label: domain.name, value: domain.name })))}
        withSearch
      >
        <Button onClick={openModal} className={styles.addButton} variant="contained" color="primary">
          Dodaj specialistę
        </Button>
      </Filters>
      <Suspense waitFor={specialists} polling>
        <UserTable
          data={specialists.data?.results || []}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          role={rolesTypes.SPECIALIST}
          isUpdatting={update.isFetching}
        />
        <Pagination total={specialists.data?.total} />
      </Suspense>
      <AddUserModal
        title="Dodaj specjalistę"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        data={add.data}
        error={add.error}
        isFetching={add.isFetching}
        domains={domains.data?.results.map(domain => ({ label: domain.name, value: domain.id }))}
      />
      <Toast showOn={update.data}>Zapisano</Toast>
    </>
  );
};

export default Specialists;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';
import { rolesTypes } from 'consts';

import Suspense from 'components/Suspense';
import UserTable from 'components/UsersTable';
import Filters from 'components/Filters';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import Toast from 'components/Toast';
import AddUserModal from 'components/users/AddUserModal';
import { USERS_FILTERS } from 'pages/admin/consts';

import styles from './Experts.module.scss';

const Experts = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { experts, add, update } = useSelector(({ admin }) => ({
    experts: admin.users.experts,
    add: admin.users.add,
    update: admin.users.update
  }));

  useEffect(() => {
    dispatch(adminActions.users.experts(query));
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

  const handleSubmit = ({ email }) => {
    dispatch(adminActions.users.add({ email, user_role: 'expert' }));
  };

  return (
    <>
      <Title>Eksperci</Title>
      <Filters filters={USERS_FILTERS} withSearch>
        <Button onClick={openModal} className={styles.addButton} variant="contained" color="primary">
          Dodaj eksperta
        </Button>
      </Filters>
      <Suspense waitFor={experts} polling>
        <UserTable
          data={experts.data?.results || []}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          role={rolesTypes.EXPERT}
          isUpdatting={update.isFetching}
        />
        <Pagination total={experts.data?.total} />
      </Suspense>
      <AddUserModal
        title="Dodaj eksperta"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        data={add.data}
        error={add.error}
        isFetching={add.isFetching}
      />
      <Toast showOn={update.data}>Zaktualizowano</Toast>
    </>
  );
};

export default Experts;

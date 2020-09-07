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

import styles from './Moderators.module.scss';

const Moderators = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { moderators, add, update } = useSelector(({ admin }) => ({
    moderators: admin.users.moderators,
    add: admin.users.add,
    update: admin.users.update
  }));

  useEffect(() => {
    dispatch(adminActions.users.moderators(query));
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
    dispatch(adminActions.users.add({ email, user_role: 'moderator' }));
  };

  return (
    <>
      <Title>Moderatorzy</Title>
      <Filters filters={USERS_FILTERS} withSearch>
        <Button onClick={openModal} className={styles.addButton} variant="contained" color="primary">
          Dodaj moderatora
        </Button>
      </Filters>
      <Suspense waitFor={moderators}>
        <UserTable
          data={moderators.data?.results || []}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          role={rolesTypes.MODERATOR}
          isUpdatting={update.isFetching}
        />
        <Pagination total={moderators.data?.total} />
      </Suspense>
      <AddUserModal
        title="Dodaj moderatora"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        data={add.data}
        error={add.error}
        isFetching={add.isFetching}
      />
      <Toast showOn={update.data}>Zapisano</Toast>
    </>
  );
};

export default Moderators;

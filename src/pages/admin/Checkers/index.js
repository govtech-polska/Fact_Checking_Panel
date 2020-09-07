import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '@material-ui/core';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';

import Suspense from 'components/Suspense';
import UserTable from 'components/UsersTable';
import Filters from 'components/Filters';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import Toast from 'components/Toast';
import AddUserModal from 'components/users/AddUserModal';
import { USERS_FILTERS } from 'pages/admin/consts';

import styles from './Checkers.module.scss';

const Checkers = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { checkers, add, update } = useSelector(({ admin }) => ({
    checkers: admin.users.checkers,
    add: admin.users.add,
    update: admin.users.update
  }));

  useEffect(() => {
    dispatch(adminActions.users.checkers(query));
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

  const handleSubmit = ({ email }) => {
    dispatch(adminActions.users.add({ email, user_role: 'fact_checker' }));
  };

  const handleStatusChange = (id, nextActive) => {
    dispatch(adminActions.users.update(id, { is_active: nextActive }));
  };

  return (
    <>
      <Title>{t('community.title')}</Title>
      <Filters filters={USERS_FILTERS} withSearch>
        <Button onClick={openModal} className={styles.addButton} variant="contained" color="primary">
          {t('community.addUser')}
        </Button>
      </Filters>
      <Suspense waitFor={checkers} polling>
        <UserTable data={checkers.data?.results || []} onStatusChange={handleStatusChange} />
        <Pagination total={checkers.data?.total} />
      </Suspense>
      <AddUserModal
        title={t('community.addUser')}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        data={add.data}
        error={add.error}
        isFetching={add.isFetching}
      />
      <Toast showOn={update.data}>{t('common.updated')}</Toast>
    </>
  );
};

export default Checkers;

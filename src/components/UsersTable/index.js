import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import TuneIcon from '@material-ui/icons/Tune';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  IconButton,
  TableSortLabel
} from '@material-ui/core';

import { useSort } from 'hooks/useSort';
import { rolesTypes } from 'consts';
import ChangeRoleModal from 'components/users/ChangeRoleModal';

import styles from './UsersTable.module.scss';

const EnchancedTableHead = ({ noStats, isSpecialist, isRoleChange }) => {
  const { t } = useTranslation();
  const { value, toggleValue } = useSort();

  return (
    <TableHead>
      <TableRow>
        <TableCell className={styles.sortableText}>
          <TableSortLabel active={!!value.name} direction={value.name} onClick={() => toggleValue('name')}>
            {t('users.nameAndSurname')}
          </TableSortLabel>
        </TableCell>
        <TableCell>{t('users.email')}</TableCell>
        {isSpecialist && <TableCell>{t('users.specialistDomain')}</TableCell>}
        <TableCell>{t('users.specialization')}</TableCell>
        {!noStats && (
          <TableCell className={styles.sortableText}>
            <TableSortLabel
              active={!!value.verified}
              direction={value.verified}
              onClick={() => toggleValue('verified')}
            >
              {t('users.verified')}
            </TableSortLabel>
          </TableCell>
        )}
        {!noStats && (
          <TableCell className={styles.sortableText}>
            <TableSortLabel
              active={!!value.assigned}
              direction={value.assigned}
              onClick={() => toggleValue('assigned')}
            >
              {t('users.assigned')}
            </TableSortLabel>
          </TableCell>
        )}
        <TableCell className={styles.sortableText}>
          <TableSortLabel
            active={!!value.created_at}
            direction={value.created_at}
            onClick={() => toggleValue('created_at')}
          >
            {t('users.registerDate')}
          </TableSortLabel>
        </TableCell>
        <TableCell align="center">{t('users.deactivate')}</TableCell>
        {isRoleChange && <TableCell align="center">{t('users.changeRole')}</TableCell>}
      </TableRow>
    </TableHead>
  );
};

EnchancedTableHead.propTypes = {
  isRoleChange: PropTypes.bool,
  isSpecialist: PropTypes.bool,
  noStats: PropTypes.bool
};

const UsersTable = ({ data, role, onStatusChange, onRoleChange, isUpdatting }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const isSpecialist = role === rolesTypes.SPECIALIST;
  const noStats = role === rolesTypes.MODERATOR;

  const handleChangeRoleModalOpen = user => {
    setUserToUpdate(user);
    setIsModalOpen(true);
  };

  const handleChangeRoleModalClose = () => {
    setIsModalOpen(false);
    setUserToUpdate(null);
  };

  if (data.length === 0) {
    return <Typography>{t('users.noDataInfo')}</Typography>;
  }

  return (
    <>
      <Paper className={styles.container}>
        <TableContainer>
          <Table aria-label="experts table">
            <EnchancedTableHead noStats={noStats} isSpecialist={isSpecialist} isRoleChange={!!onRoleChange} />
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  {isSpecialist && (
                    <TableCell>
                      <Chip label={item.domain?.name} />
                    </TableCell>
                  )}
                  <TableCell>
                    <Chip label={t(`specializationTypes.${item.specialization}`)} />
                  </TableCell>
                  {!noStats && <TableCell>{item.verified}</TableCell>}
                  {!noStats && <TableCell>{item.assigned}</TableCell>}
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      title={item.is_active ? t('community.deactivate') : t('community.activate')}
                      aria-label={item.is_active ? t('community.deactivate') : t('community.activate')}
                      className={cx(!item.is_active && styles.bannedBtn)}
                      onClick={() => onStatusChange(item.id, !item.is_active)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </TableCell>
                  {onRoleChange && (
                    <TableCell align="center">
                      <IconButton
                        title={t('users.changeRole')}
                        aria-label={t('users.changeRole')}
                        onClick={() => handleChangeRoleModalOpen(item)}
                      >
                        <TuneIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ChangeRoleModal
        activeRole={role}
        open={isModalOpen}
        user={userToUpdate}
        onClose={handleChangeRoleModalClose}
        onRoleChange={onRoleChange}
        isUpdatting={isUpdatting}
      />
    </>
  );
};

UsersTable.propTypes = {
  data: PropTypes.array,
  isUpdatting: PropTypes.bool,
  onRoleChange: PropTypes.func,
  onStatusChange: PropTypes.func,
  onSort: PropTypes.func,
  role: PropTypes.string
};

export default UsersTable;

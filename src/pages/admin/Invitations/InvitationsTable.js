import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

import { useSort } from 'hooks/useSort';
import styles from './InvitationsTable.module.scss';

const InvitationsTable = ({ invitations }) => {
  const { t } = useTranslation();
  const { value, toggleValue } = useSort();

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="Tabela ze statusami zaproszeń">
          <TableHead>
            <TableRow>
              <TableCell>{t('invitations.email')}</TableCell>
              <TableCell sortDirection={value.sent_at} className={styles.sortableLabel}>
                <TableSortLabel
                  active={!!value.sent_at}
                  direction={value.sent_at}
                  onClick={() => toggleValue('sent_at')}
                >
                  {t('invitations.sendDate')}
                </TableSortLabel>
              </TableCell>
              <TableCell>{t('invitations.status')}</TableCell>
              <TableCell align="center">{t('invitations.linkStatus')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitations.map(item => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.email}
                </TableCell>
                <TableCell>{item.sent_at}</TableCell>
                <TableCell>{t(`invitations.states.${item.status}`) || item.status}</TableCell>
                <TableCell align="center">
                  {item.expired ? (
                    <Tooltip title={t('invitations.linkIsExpired')}>
                      <CancelIcon className={styles.statusExpired} />
                    </Tooltip>
                  ) : (
                    <Tooltip title={t('invitations.linkIsActive')}>
                      <CheckCircleIcon className={styles.statusActive} />
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

InvitationsTable.propTypes = {
  invitations: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      expired: PropTypes.bool,
      id: PropTypes.string,
      sent_at: PropTypes.string,
      status: PropTypes.string
    })
  )
};

export default InvitationsTable;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem
} from '@material-ui/core';

import { adminActions } from 'storages/admin/actions';
import { rolesTypes } from 'consts';

import styles from './ChangeRoleModal.module.scss';

const ChangeRoleModal = ({ open, onClose, user, activeRole, onRoleChange, isUpdatting }) => {
  const { t } = useTranslation();
  const [role, setRole] = useState(activeRole);
  const [domain, setDomain] = useState(user?.domain?.id);

  const dispatch = useDispatch();
  const { domains } = useSelector(({ admin }) => ({
    domains: admin.domains.list
  }));

  useEffect(() => {
    dispatch(adminActions.domains.list());
  }, [dispatch]);

  const userDomainId = user?.domain?.id;
  useEffect(() => {
    setDomain(userDomainId);
  }, [userDomainId]);

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {t('users.changeRole')} {user.name}
      </DialogTitle>
      <DialogContent>
        <RadioGroup name="role" value={role} onChange={(_, newRole) => setRole(newRole)}>
          <FormControlLabel value={rolesTypes.MODERATOR} label={t('rolesNames.moderator')} control={<Radio />} />
          <FormControlLabel value={rolesTypes.EXPERT} label={t('rolesNames.expert')} control={<Radio />} />
          <FormControlLabel value={rolesTypes.SPECIALIST} label={t('rolesNames.specialist')} control={<Radio />} />
        </RadioGroup>
        {role === rolesTypes.SPECIALIST && (
          <TextField
            className={styles.domainField}
            label={t('users.specialistDomainModal')}
            name="domain"
            value={domain ?? ''}
            onChange={e => setDomain(e.target.value)}
            select
          >
            {domains.data?.results?.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} disabled={isUpdatting}>
          {t('common.cancel')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onRoleChange(user.id, role, domain, onClose)}
          disabled={isUpdatting}
        >
          {t('common.approve')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ChangeRoleModal.propTypes = {
  activeRole: PropTypes.string,
  isUpdatting: PropTypes.bool,
  onClose: PropTypes.func,
  onRoleChange: PropTypes.func,
  open: PropTypes.bool,
  user: PropTypes.shape({
    domain: PropTypes.shape({
      id: PropTypes.string
    }),
    id: PropTypes.string,
    name: PropTypes.string
  })
};

export default ChangeRoleModal;

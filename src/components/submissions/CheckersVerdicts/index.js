import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Tab, Tabs, Paper } from '@material-ui/core';
import Verdict from 'components/submissions/Verdict';

import styles from './CheckersVerdicts.module.scss';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`fact-checker-verdict-${index}`}
    aria-labelledby={`fact-checker-tab-${index}`}
    {...other}
  >
    {value === index && children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number
};

const a11yProps = index => ({
  id: `fact-checker-tab-${index}`,
  'aria-controls': `fact-checker-verdict-${index}`
});

const CheckersVerdicts = ({ checkersOpinions, onUpdate, updateState, isAdmin }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (_, nextValue) => {
    setValue(nextValue);
  };

  return (
    <div className={styles.wrapper}>
      <Typography component="h2" variant="h5" paragraph>
        {t('details.factCheckerVerdictTitle')}
      </Typography>

      {checkersOpinions?.length > 0 ? (
        <>
          <Paper className={styles.tabs} elevation={3}>
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
              {checkersOpinions.map(({ judge }, i) => (
                <Tab key={i} label={judge?.name || `Fake hunter ${i + 1}`} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Paper>

          {checkersOpinions.map((values, i) => (
            <TabPanel key={i} value={value} index={i}>
              <Verdict key={i} values={values} onUpdate={onUpdate} updateState={updateState} isAdmin={isAdmin} />
            </TabPanel>
          ))}
        </>
      ) : (
        <Typography paragraph>{t('details.noFactCheckerVerdict')}</Typography>
      )}
    </div>
  );
};

CheckersVerdicts.propTypes = {
  checkersOpinions: PropTypes.array,
  onUpdate: PropTypes.func,
  isAdmin: PropTypes.bool,
  updateState: PropTypes.shape({
    error: PropTypes.string,
    isFetching: PropTypes.bool
  })
};

export default CheckersVerdicts;

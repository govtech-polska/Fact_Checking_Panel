import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

import { submissionsActions } from 'storages/submissions/actions';
import { useQuery } from 'hooks/useQuery';
import { useInterval } from 'hooks/useInterval';
import { getSubmissionTitle } from 'utils/data';
import { rolesTypes } from 'consts';

import Title from 'components/Title';
import Suspense from 'components/Suspense';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import SubmissionCard from 'components/submissions/SubmissionCard';
import SubmissionsSkeleton from 'components/submissions/SubmissionsSkeleton';

import { FILTERS, DYNAMIC_FILTERS } from './consts';
import placeholderImg from 'assets/placeholder.png';
import styles from './Submissions.module.scss';

const Submissions = ({ role }) => {
  const { t } = useTranslation();
  const query = useQuery();
  const dispatch = useDispatch();
  const { submissionsList, myEmail } = useSelector(({ submissions, user }) => ({
    submissionsList: submissions.list,
    myEmail: user.details.data?.email
  }));

  useInterval(() => {
    dispatch(submissionsActions.list(role)(query, false));
  }, 60000);

  useEffect(() => {
    dispatch(submissionsActions.list(role)(query));
    // eslint-disable-next-line
  }, [dispatch, role, JSON.stringify(query)]);

  const isEmpty = submissionsList.data?.results?.length === 0;

  return (
    <div className={styles.submissions}>
      <Title>{t('submissions.title')}</Title>
      <Filters filters={FILTERS[role]} dynamicFilters={DYNAMIC_FILTERS[role]} withSearch />
      <Suspense waitFor={submissionsList} fallback={<SubmissionsSkeleton />} polling>
        {isEmpty && <Typography>{t('common.noResults')}</Typography>}
        {submissionsList.data?.results.map(
          ({
            id,
            url,
            screenshot_url,
            text,
            comment,
            is_opined,
            reported_at,
            current_verdict,
            is_duplicate,
            is_sensitive,
            is_pinned,
            expert_opinion,
            fact_checker_opinions,
            assigned_crew_member
          }) => (
            <SubmissionCard
              key={id}
              id={id}
              url={url}
              image={screenshot_url || placeholderImg}
              text={text || (comment ? `${t('submissions.comment')}: ${comment}` : '')}
              reportDate={reported_at}
              hasOpinion={is_opined}
              verdict={current_verdict}
              isDuplicate={is_duplicate}
              isSensitive={is_sensitive}
              isPinned={is_pinned}
              isAssigned={!!assigned_crew_member}
              isAssignedToMe={myEmail === assigned_crew_member}
              title={getSubmissionTitle(expert_opinion, fact_checker_opinions)}
            />
          )
        )}
        <Pagination total={submissionsList.data?.total} />
      </Suspense>
    </div>
  );
};

Submissions.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default Submissions;

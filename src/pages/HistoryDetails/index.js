import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { submissionsActions } from 'storages/submissions/actions';
import Title from 'components/Title';
import Suspense from 'components/Suspense';
import NewsDetails from 'components/submissions/NewsDetails';
import Skeleton from 'components/submissions/NewsDetails/Skeleton';
import CheckersVerdicts from 'components/submissions/CheckersVerdicts';
import ExpertVerdict from 'components/submissions/ExpertVerdict';

import styles from './HistoryDetails.module.scss';

const HistoryDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    params: { id }
  } = useRouteMatch();
  const { submission } = useSelector(({ submissions }) => ({
    submission: submissions.details
  }));

  useEffect(() => {
    dispatch(submissionsActions.history.details(id));
  }, [dispatch, id]);

  const checkersOpinions = submission.data?.fact_checker_opinions;
  const expertOpinion = submission.data?.expert_opinion;

  return (
    <div className={styles.container}>
      <Title>{t('details.title')}</Title>
      <Suspense waitFor={submission} fallback={<Skeleton />}>
        <NewsDetails submission={submission.data} />
      </Suspense>

      {checkersOpinions && <CheckersVerdicts checkersOpinions={checkersOpinions} />}
      {expertOpinion && <ExpertVerdict values={expertOpinion} />}
    </div>
  );
};

export default HistoryDetails;

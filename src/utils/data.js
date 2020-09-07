export const getSubmissionTitle = (expertOpinion, checkerOpinions) =>
  expertOpinion?.title || checkerOpinions?.[0]?.title;

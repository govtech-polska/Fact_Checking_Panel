import { useTranslation } from 'react-i18next';

export const useFieldError = ({ meta, disabled }) => {
  const { t, i18n } = useTranslation();

  const hasError = !!(meta.touched && meta.error && !disabled);
  const error = hasError && i18n.exists(meta.error) ? t(meta.error) : meta.error;

  return {
    hasError,
    error
  };
};

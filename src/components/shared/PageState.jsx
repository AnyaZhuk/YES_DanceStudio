import { useTranslation } from 'react-i18next';

export default function PageState({ loading, error, empty, children }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex min-h-[8rem] items-center justify-center text-sm text-studio-gray">
        {t('common.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-lg border border-dashed border-studio-border p-8 text-center text-sm text-studio-gray dark:border-slate-600">
        {empty}
      </div>
    );
  }

  return children;
}

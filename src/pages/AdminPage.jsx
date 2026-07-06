import { useTranslation } from 'react-i18next';

export default function AdminPage() {
  const { t } = useTranslation();

  return (
    <div className="studio-page">
      <h1 className="text-2xl font-bold">{t('admin.title')}</h1>
      <p className="mt-2 text-sm text-studio-gray">{t('admin.subtitle')}</p>
      <div className="mt-6 studio-card">
        <p className="text-sm text-gray-700 dark:text-slate-300">
          Здесь появятся: управление расписанием, учениками, абонементами и отчёты (recharts).
        </p>
      </div>
    </div>
  );
}

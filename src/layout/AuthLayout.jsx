import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/shared/AppLogo.jsx';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-studio-gray-light px-4 py-10 dark:bg-slate-950">
      <div className="mb-8">
        <AppLogo />
      </div>
      <div className="studio-card w-full max-w-md">
        <Outlet />
      </div>
      <p className="mt-6 text-center text-xs text-studio-gray">{t('app.tagline')}</p>
    </div>
  );
}

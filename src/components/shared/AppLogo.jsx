import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AppLogo({ compact = false }) {
  const { t } = useTranslation();

  return (
    <Link to="/" className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-studio-primary text-lg text-white"
        aria-hidden
      >
        ♪
      </span>
      {!compact && <span>{t('app.name')}</span>}
    </Link>
  );
}

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppLogo from '../components/shared/AppLogo.jsx';
import { useAuthStore } from '../stores/authStore.js';
import { useThemeStore } from '../stores/themeStore.js';

const navItems = [
  { to: '/', key: 'home', end: true },
  { to: '/schedule', key: 'schedule' },
  { to: '/classes', key: 'classes' },
  { to: '/instructors', key: 'instructors' },
  { to: '/pricing', key: 'pricing' },
];

export default function MainLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const theme = useThemeStore((s) => s.theme);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLocale = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-studio-border bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <AppLogo />
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {navItems.map(({ to, key, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 transition-colors ${
                    isActive
                      ? 'bg-studio-primary-light font-medium text-studio-primary-dark dark:bg-violet-950 dark:text-violet-200'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="studio-btn-ghost px-3 py-1.5 text-xs"
              title={t('common.language')}
            >
              {i18n.language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="studio-btn-ghost px-3 py-1.5 text-xs"
              title={theme === 'light' ? t('common.themeDark') : t('common.themeLight')}
            >
              {theme === 'light' ? '☀' : '☾'}
            </button>
            {user ? (
              <>
                <NavLink to="/profile" className="studio-btn-ghost px-3 py-1.5 text-xs">
                  {user.name || t('nav.profile')}
                </NavLink>
                <button type="button" onClick={handleLogout} className="studio-btn-ghost px-3 py-1.5 text-xs">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <NavLink to="/login" className="studio-btn-primary px-3 py-1.5 text-xs">
                {t('nav.login')}
              </NavLink>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 bg-studio-gray-light dark:bg-slate-950">
        <Outlet />
      </main>
      <footer className="border-t border-studio-border bg-white py-4 text-center text-xs text-studio-gray dark:border-slate-700 dark:bg-slate-900">
        © {new Date().getFullYear()} {t('app.name')}
      </footer>
    </div>
  );
}

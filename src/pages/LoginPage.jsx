import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore.js';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, name: email.split('@')[0] || 'User' });
    const redirectTo = location.state?.from || '/profile';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">{t('auth.loginTitle')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          <span className="mb-1 block text-studio-gray">{t('auth.email')}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-studio-border px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-studio-gray">{t('auth.password')}</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-studio-border px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
          />
        </label>
        <button type="submit" className="studio-btn-primary w-full">
          {t('auth.submitLogin')}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-studio-gray">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="font-medium text-studio-primary">
          {t('nav.register')}
        </Link>
      </p>
    </div>
  );
}

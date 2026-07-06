import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore.js';

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ email, name });
    navigate('/profile', { replace: true });
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">{t('auth.registerTitle')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          <span className="mb-1 block text-studio-gray">{t('auth.name')}</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-studio-border px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
          />
        </label>
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
          {t('auth.submitRegister')}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-studio-gray">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="font-medium text-studio-primary">
          {t('nav.login')}
        </Link>
      </p>
    </div>
  );
}

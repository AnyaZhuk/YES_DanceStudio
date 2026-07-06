import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchPricing } from '../api/studio.js';
import PageState from '../components/shared/PageState.jsx';

export default function PricingPage() {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPricing()
      .then(setPlans)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="studio-page">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{t('pricing.title')}</h1>
        <p className="mt-1 text-sm text-studio-gray">{t('pricing.subtitle')}</p>
      </header>

      <PageState loading={loading} error={error}>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`studio-card ${plan.popular ? 'ring-2 ring-studio-primary' : ''}`}
            >
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-2 text-3xl font-bold text-studio-primary">
                {plan.price.toLocaleString('ru-RU')} ₽
                <span className="text-sm font-normal text-studio-gray"> / {t('pricing.perMonth')}</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <button type="button" className="studio-btn-primary mt-6 w-full">
                {t('pricing.choose')}
              </button>
            </article>
          ))}
        </div>
      </PageState>
    </div>
  );
}

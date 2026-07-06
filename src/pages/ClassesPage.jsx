import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchClasses } from '../api/studio.js';
import PageState from '../components/shared/PageState.jsx';

export default function ClassesPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="studio-page">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{t('classes.title')}</h1>
        <p className="mt-1 text-sm text-studio-gray">{t('classes.subtitle')}</p>
      </header>

      <PageState loading={loading} error={error}>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="studio-card border-l-4" style={{ borderLeftColor: item.color }}>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="mt-2 text-sm text-studio-gray">{item.description}</p>
            </article>
          ))}
        </div>
      </PageState>
    </div>
  );
}

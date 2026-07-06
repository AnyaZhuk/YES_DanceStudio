import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchInstructors } from '../api/studio.js';
import PageState from '../components/shared/PageState.jsx';

export default function InstructorsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInstructors()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="studio-page">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{t('instructors.title')}</h1>
        <p className="mt-1 text-sm text-studio-gray">{t('instructors.subtitle')}</p>
      </header>

      <PageState loading={loading} error={error}>
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((person) => (
            <article key={person.id} className="studio-card">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-studio-primary-light text-lg font-bold text-studio-primary-dark dark:bg-violet-950 dark:text-violet-200">
                {person.name.charAt(0)}
              </div>
              <h2 className="font-semibold">{person.name}</h2>
              <p className="mt-1 text-xs text-studio-gray">{person.styles.join(' · ')}</p>
              <p className="mt-3 text-sm text-gray-700 dark:text-slate-300">{person.bio}</p>
            </article>
          ))}
        </div>
      </PageState>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchSchedule } from '../api/studio.js';
import PageState from '../components/shared/PageState.jsx';

const DAY_LABELS = {
  mon: 'Пн',
  tue: 'Вт',
  wed: 'Ср',
  thu: 'Чт',
  fri: 'Пт',
  sat: 'Сб',
  sun: 'Вс',
};

export default function SchedulePage() {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedule()
      .then(setSessions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="studio-page">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{t('schedule.title')}</h1>
        <p className="mt-1 text-sm text-studio-gray">{t('schedule.subtitle')}</p>
      </header>

      <PageState loading={loading} error={error} empty={!loading && !sessions.length ? t('schedule.empty') : null}>
        <div className="grid gap-4 sm:grid-cols-2">
          {sessions.map((session) => (
            <article key={session.id} className="studio-card">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{session.style}</h2>
                  <p className="text-sm text-studio-gray">{session.instructor}</p>
                </div>
                <span className="rounded-full bg-studio-primary-light px-2.5 py-0.5 text-xs font-medium text-studio-primary-dark dark:bg-violet-950 dark:text-violet-200">
                  {DAY_LABELS[session.day]} {session.time}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-studio-gray">{t('schedule.level')}</dt>
                  <dd className="font-medium capitalize">{session.level}</dd>
                </div>
                <div>
                  <dt className="text-studio-gray">{t('schedule.spots')}</dt>
                  <dd className="font-medium">{session.spotsLeft}</dd>
                </div>
              </dl>
              <button type="button" className="studio-btn-primary mt-4 w-full">
                {t('schedule.book')}
              </button>
            </article>
          ))}
        </div>
      </PageState>
    </div>
  );
}

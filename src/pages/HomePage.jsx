import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchClasses, fetchInstructors, fetchSchedule } from '../api/studio.js';

export default function HomePage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ students: 320, classes: 0, years: 7 });

  useEffect(() => {
    Promise.all([fetchClasses(), fetchInstructors(), fetchSchedule()])
      .then(([classes, instructors]) => {
        setStats((s) => ({ ...s, classes: classes.length, instructors: instructors.length }));
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-studio-primary to-studio-primary-dark px-4 py-16 text-white sm:px-6">
        <div className="studio-page !py-0 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('home.heroTitle')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-100">{t('home.heroSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/schedule" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-studio-primary-dark">
              {t('home.ctaSchedule')}
            </Link>
            <Link
              to="/pricing"
              className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t('home.ctaTrial')}
            </Link>
          </div>
        </div>
      </section>

      <section className="studio-page">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: stats.students, label: t('home.statsStudents') },
            { value: stats.classes || '—', label: t('home.statsClasses') },
            { value: stats.years, label: t('home.statsYears') },
          ].map((item) => (
            <div key={item.label} className="studio-card text-center">
              <div className="text-3xl font-bold text-studio-primary">{item.value}</div>
              <div className="mt-1 text-sm text-studio-gray">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

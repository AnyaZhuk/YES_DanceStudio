import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBookings } from '../api/studio.js';
import { useAuthStore } from '../stores/authStore.js';
import PageState from '../components/shared/PageState.jsx';

export default function ProfilePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings()
      .then(setBookings)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="studio-page">
      <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="studio-card">
          <h2 className="font-semibold">{user?.name}</h2>
          <p className="mt-1 text-sm text-studio-gray">{user?.email}</p>
          <p className="mt-4 text-sm">
            <span className="text-studio-gray">{t('profile.membership')}: </span>
            <span className="font-medium">Стандарт</span>
          </p>
        </section>
        <section className="studio-card">
          <h2 className="mb-3 font-semibold">{t('profile.bookings')}</h2>
          <PageState loading={loading} empty={!bookings.length ? t('profile.noBookings') : null}>
            <ul className="space-y-2 text-sm">
              {bookings.map((b) => (
                <li key={b.id}>{b.title}</li>
              ))}
            </ul>
          </PageState>
        </section>
      </div>
    </div>
  );
}

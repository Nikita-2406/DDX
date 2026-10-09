import { Route, Routes } from 'react-router-dom';
import { Shell } from './components/PhoneFrame';
import { useApp } from './state/AppState';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import TrainersPage from './pages/TrainersPage';
import ActionPage from './pages/ActionPage';
import ProfilePage from './pages/ProfilePage';
import VisitsPage from './pages/VisitsPage';
import PaymentsPage from './pages/PaymentsPage';
import BodyAnalysisPage from './pages/BodyAnalysisPage';
import DiaryPage from './pages/DiaryPage';
import FavoritesPage from './pages/FavoritesPage';
import EquipmentPage from './pages/EquipmentPage';
import GiftCardsPage from './pages/GiftCardsPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SettingsPage from './pages/SettingsPage';
import ExtraPage from './pages/ExtraPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { userName } = useApp();

  // Первый вход: пока не представится — показываем только онбординг.
  if (!userName) {
    return (
      <Shell>
        <OnboardingPage />
      </Shell>
    );
  }

  return (
    <Routes>
      {/* Табы — с нижней навигацией */}
      <Route element={<Shell nav />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/action" element={<ActionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Внутренние экраны — без нижней навигации, как в оригинале */}
      <Route element={<Shell />}>
        <Route path="/visits" element={<VisitsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/body-analysis" element={<BodyAnalysisPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/gift-cards" element={<GiftCardsPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/extra" element={<ExtraPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

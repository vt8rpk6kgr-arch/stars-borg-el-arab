import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Mascot } from './components/ui/Mascot';

// Route-level lazy loading
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const BookPage = lazy(() => import('./pages/BookPage').then(m => ({ default: m.BookPage })));
const TeamsPage = lazy(() => import('./pages/TeamsPage').then(m => ({ default: m.TeamsPage })));
const TeamDetailPage = lazy(() => import('./pages/TeamDetailPage').then(m => ({ default: m.TeamDetailPage })));
const MatchesPage = lazy(() => import('./pages/MatchesPage').then(m => ({ default: m.MatchesPage })));
const MatchDetailPage = lazy(() => import('./pages/MatchDetailPage').then(m => ({ default: m.MatchDetailPage })));
const TournamentsPage = lazy(() => import('./pages/TournamentsPage').then(m => ({ default: m.TournamentsPage })));
const TournamentDetailPage = lazy(() => import('./pages/TournamentDetailPage').then(m => ({ default: m.TournamentDetailPage })));
const StatsPage = lazy(() => import('./pages/StatsPage').then(m => ({ default: m.StatsPage })));
const PlayerCardPage = lazy(() => import('./pages/PlayerCardPage').then(m => ({ default: m.PlayerCardPage })));
const FunPage = lazy(() => import('./pages/FunPage').then(m => ({ default: m.FunPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Admin routes
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminBookingsPage = lazy(() => import('./pages/admin/AdminBookingsPage').then(m => ({ default: m.AdminBookingsPage })));
const AdminPlayersPage = lazy(() => import('./pages/admin/AdminPlayersPage').then(m => ({ default: m.AdminPlayersPage })));
const AdminTeamsPage = lazy(() => import('./pages/admin/AdminTeamsPage').then(m => ({ default: m.AdminTeamsPage })));
const AdminTournamentsPage = lazy(() => import('./pages/admin/AdminTournamentsPage').then(m => ({ default: m.AdminTournamentsPage })));
const AdminMatchesPage = lazy(() => import('./pages/admin/AdminMatchesPage').then(m => ({ default: m.AdminMatchesPage })));
const AdminContentPage = lazy(() => import('./pages/admin/AdminContentPage').then(m => ({ default: m.AdminContentPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

// Retro 8-bit Loading Fallback
const RetroLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
    <Mascot size={64} mood="happy" />
    <div className="font-pixel text-xs text-sun-yellow blink-retro tracking-widest">
      LOADING STADIUM DATA...
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<RetroLoadingFallback />}>
            <Routes>
              {/* Public & Player Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/teams/:id" element={<TeamDetailPage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/matches/:id" element={<MatchDetailPage />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/players/:id" element={<PlayerCardPage />} />
              <Route path="/fun" element={<FunPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/me" element={<ProfilePage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/bookings" element={<AdminBookingsPage />} />
              <Route path="/admin/players" element={<AdminPlayersPage />} />
              <Route path="/admin/teams" element={<AdminTeamsPage />} />
              <Route path="/admin/tournaments" element={<AdminTournamentsPage />} />
              <Route path="/admin/matches" element={<AdminMatchesPage />} />
              <Route path="/admin/content" element={<AdminContentPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AssemblyPage } from './pages/AssemblyPage';
import { DisassemblyPage } from './pages/DisassemblyPage';
import { WindingPage } from './pages/WindingPage';
import { TurningPage } from './pages/TurningPage';
import { OtherPage } from './pages/OtherPage';
import AuthPage from './pages/AuthPage';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [session, setSession] = React.useState<Session | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            session ? (
              <Layout />
            ) : (
              <Navigate to="/auth" state={{ session }} replace />
            )
          }
        >
          <Route index element={<HomePage />} />
          <Route path="assembly" element={<AssemblyPage />} />
          <Route path="disassembly" element={<DisassemblyPage />} />
          <Route path="winding" element={<WindingPage />} />
          <Route path="turning" element={<TurningPage />} />
          <Route path="other" element={<OtherPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;

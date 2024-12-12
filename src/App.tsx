import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AssemblyPage } from './pages/AssemblyPage';
import { DisassemblyPage } from './pages/DisassemblyPage';
import { WindingPage } from './pages/WindingPage';
import { TurningPage } from './pages/TurningPage';
import { OtherPage } from './pages/OtherPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="assembly" element={<AssemblyPage />} />
          <Route path="disassembly" element={<DisassemblyPage />} />
          <Route path="winding" element={<WindingPage />} />
          <Route path="turning" element={<TurningPage />} />
          <Route path="other" element={<OtherPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
